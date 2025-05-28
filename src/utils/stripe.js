// src/utils/stripe.js
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
export const stripePromise = loadStripe('pk_test_51RQZZw01EjlsXqzp8Hv7rT8O4Qp1sXkZD9ft5groAL5sFiRG4BYipnQI6FeFoi60fTf3jjh0v50WyMsUcOkw1IUz00OdlKBYyG');

// Function to create payment intent via direct API call
// Note: This is an alternative to using the Firebase SDK's httpsCallable
// which is configured in firebase.js
export const createPaymentIntent = async (amount, userId, metadata = {}) => {
    try {
        // Call your Firebase function to create a payment intent
        const response = await fetch('https://us-central1-mindi-6650c.cloudfunctions.net/createPayment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount,
                userId,
                metadata: {
                    ...metadata,
                    userId // Always include userId in metadata for webhook processing
                }
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('Payment intent error response:', errorData);
            throw new Error(errorData?.error || 'Failed to create payment intent');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
};

// Helper function to format payment amount for display