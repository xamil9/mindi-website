// src/services/paymentService.js
import { createPayment } from '../firebase-config';
import { db } from '../firebase-config';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

class PaymentService {
  // Process a film purchase/rental using your existing Stripe/Firebase setup
  async processPayment(userId, filmId, tier, film) {
    try {
      // Create payment intent using your existing Firebase function
      const { data } = await createPayment({
        amount: Math.round(tier.price * 100), // Convert to cents
        userId: userId,
        metadata: {
          filmId: filmId,
          filmTitle: film.title,
          tierType: tier.type,
          tierId: tier.id,
          tierName: tier.name,
          duration: tier.duration || null,
          userEmail: null // Will be filled by PaymentForm
        }
      });

      return {
        clientSecret: data.clientSecret,
        paymentIntentId: data.paymentIntentId || data.id
      };
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  }

  // Record purchase after successful payment
  async recordPurchase(userId, filmId, tier, paymentIntentId) {
    try {
      const purchaseData = {
        userId,
        filmId,
        tierId: tier.id,
        tierType: tier.type,
        tierName: tier.name,
        amount: tier.price,
        paymentIntentId,
        purchasedAt: serverTimestamp(),
        status: 'active'
      };

      // Add expiration for rentals
      if (tier.type === 'rental' && tier.duration) {
        purchaseData.expiresAt = new Date(Date.now() + tier.duration * 60 * 60 * 1000);
      }

      // Save to Firestore
      const purchaseRef = doc(db, 'purchases', `${userId}_${filmId}`);
      await setDoc(purchaseRef, purchaseData);

      // Update user's purchases collection
      const userPurchaseRef = doc(db, 'users', userId, 'purchases', filmId);
      await setDoc(userPurchaseRef, purchaseData);

      // Update film stats
      await this.updateFilmRevenue(filmId, tier.price);

      return purchaseData;
    } catch (error) {
      console.error('Error recording purchase:', error);
      throw error;
    }
  }

  // Record free tier selection
  async recordFreeTier(userId, filmId, tier) {
    try {
      const purchaseData = {
        userId,
        filmId,
        tierId: tier.id,
        tierType: tier.type,
        tierName: tier.name,
        amount: 0,
        paymentIntentId: 'free_tier',
        purchasedAt: serverTimestamp(),
        status: 'active'
      };

      // Save to Firestore
      const purchaseRef = doc(db, 'purchases', `${userId}_${filmId}`);
      await setDoc(purchaseRef, purchaseData);

      // Update user's purchases collection
      const userPurchaseRef = doc(db, 'users', userId, 'purchases', filmId);
      await setDoc(userPurchaseRef, purchaseData);

      return purchaseData;
    } catch (error) {
      console.error('Error recording free tier:', error);
      throw error;
    }
  }

  // Update film revenue stats
  async updateFilmRevenue(filmId, amount) {
    try {
      const filmRef = doc(db, 'films', filmId);
      const filmDoc = await getDoc(filmRef);
      
      if (filmDoc.exists()) {
        const currentRevenue = filmDoc.data().totalRevenue || 0;
        const currentPurchases = filmDoc.data().totalPurchases || 0;
        
        await updateDoc(filmRef, {
          totalRevenue: currentRevenue + amount,
          totalPurchases: currentPurchases + 1,
          lastPurchaseAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error updating film revenue:', error);
      // Don't throw - this is not critical to the purchase flow
    }
  }

  // Get user's purchase status for a film
  async getUserPurchaseStatus(userId, filmId) {
    try {
      const purchaseRef = doc(db, 'purchases', `${userId}_${filmId}`);
      const purchaseDoc = await getDoc(purchaseRef);
      
      if (!purchaseDoc.exists()) {
        return { hasPurchased: false, tier: null };
      }
      
      const purchaseData = purchaseDoc.data();
      
      // Check if rental has expired
      if (purchaseData.tierType === 'rental' && purchaseData.expiresAt) {
        const expirationDate = purchaseData.expiresAt.toDate 
          ? purchaseData.expiresAt.toDate() 
          : new Date(purchaseData.expiresAt);
          
        if (new Date() > expirationDate) {
          // Update status to expired
          await updateDoc(purchaseRef, { status: 'expired' });
          return { hasPurchased: false, tier: null, expired: true };
        }
      }
      
      // Get the full tier data
      const tier = {
        id: purchaseData.tierId,
        name: purchaseData.tierName,
        type: purchaseData.tierType,
        price: purchaseData.amount,
        duration: purchaseData.duration,
        enhanced: this.isEnhancedTier(purchaseData.tierName),
        hasAds: purchaseData.tierType === 'free'
      };
      
      return { 
        hasPurchased: true, 
        tier: tier,
        purchaseData: purchaseData
      };
    } catch (error) {
      console.error('Error getting purchase status:', error);
      return { hasPurchased: false, tier: null };
    }
  }

  // Helper to determine if a tier has enhanced features
  isEnhancedTier(tierName) {
    const enhancedTiers = ['Premium Rental', 'Own Forever', 'Premium', 'Ultimate'];
    return enhancedTiers.some(name => tierName.toLowerCase().includes(name.toLowerCase()));
  }

  // Calculate prorated price for upgrades
  async calculateProratedPrice(userId, filmId, targetTier, currentTier) {
    try {
      // If no current tier or free tier, return full price
      if (!currentTier || currentTier.price === 0) {
        return targetTier.price;
      }

      // Can't downgrade
      if (targetTier.price <= currentTier.price) {
        return targetTier.price;
      }

      // For rentals upgrading to purchase, give partial credit
      if (currentTier.type === 'rental' && targetTier.type === 'purchase') {
        // Give 50% credit for rental towards purchase
        const credit = currentTier.price * 0.5;
        return Math.max(0, targetTier.price - credit);
      }

      // For same type upgrades, calculate difference
      if (currentTier.type === targetTier.type) {
        return Math.max(0, targetTier.price - currentTier.price);
      }

      // Default to full price for other cases
      return targetTier.price;
    } catch (error) {
      console.error('Error calculating prorated price:', error);
      return targetTier.price;
    }
  }

  // Check rental expiration
  async checkRentalStatus(userId, filmId) {
    try {
      const purchaseRef = doc(db, 'purchases', `${userId}_${filmId}`);
      const purchaseDoc = await getDoc(purchaseRef);
      
      if (!purchaseDoc.exists()) {
        return { active: false, expiresAt: null };
      }
      
      const data = purchaseDoc.data();
      
      if (data.tierType !== 'rental') {
        return { active: true, expiresAt: null };
      }
      
      if (data.expiresAt) {
        const expirationDate = data.expiresAt.toDate 
          ? data.expiresAt.toDate() 
          : new Date(data.expiresAt);
        const now = new Date();
        
        return {
          active: now < expirationDate,
          expiresAt: expirationDate,
          hoursRemaining: Math.max(0, Math.floor((expirationDate - now) / (1000 * 60 * 60)))
        };
      }
      
      return { active: true, expiresAt: null };
    } catch (error) {
      console.error('Error checking rental status:', error);
      return { active: false, expiresAt: null };
    }
  }
}

export default new PaymentService();