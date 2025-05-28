// src/components/PaymentModal.jsx
import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../utils/stripe';
import PaymentForm from './PaymentForm';
import paymentService from '../services/paymentService';
import { X, CheckCircle, Loader2, CreditCard } from 'lucide-react';

const PaymentModal = ({ 
    showModal, 
    onClose, 
    selectedTier, 
    currentUser, 
    filmId,
    film,
    onPaymentSuccess,
    isUpgrade = false,
    proratedPrice = null
}) => {
    const [paymentStep, setPaymentStep] = useState('details'); // 'details' | 'payment' | 'success'
    const [processingPayment, setProcessingPayment] = useState(false);
    const [paymentIntent, setPaymentIntent] = useState(null);
    const [error, setError] = useState(null);

    // Create payment intent when user confirms tier
    const handleProceedToPayment = async () => {
        setProcessingPayment(true);
        setError(null);
        
        try {
            const tierToProcess = {
                ...selectedTier,
                price: proratedPrice || selectedTier.price // Use prorated price if available
            };
            
            const paymentData = await paymentService.processPayment(
                currentUser.uid,
                filmId,
                tierToProcess,
                film
            );
            
            setPaymentIntent(paymentData);
            setPaymentStep('payment');
        } catch (error) {
            console.error('Error creating payment intent:', error);
            setError('Failed to initialize payment. Please try again.');
        } finally {
            setProcessingPayment(false);
        }
    };

    // Handle successful payment from PaymentForm
    const handlePaymentSuccess = async (stripePaymentIntent) => {
        try {
            // Record the purchase in Firestore
            await paymentService.recordPurchase(
                currentUser.uid,
                filmId,
                selectedTier,
                stripePaymentIntent.id
            );
            
            setPaymentStep('success');
            
            // Notify parent component
            if (onPaymentSuccess) {
                onPaymentSuccess(selectedTier);
            }
            
            // Close modal after showing success
            setTimeout(() => {
                onClose();
                setPaymentStep('details'); // Reset for next time
            }, 2000);
        } catch (error) {
            console.error('Error recording purchase:', error);
            setError('Payment succeeded but failed to activate access. Please contact support.');
        }
    };

    const handlePaymentError = (errorMessage) => {
        setError(errorMessage);
        // Optionally go back to details step
        setTimeout(() => {
            setPaymentStep('details');
        }, 3000);
    };

    if (!showModal) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold">
                            {paymentStep === 'success' ? 'Payment Successful!' : 
                             paymentStep === 'payment' ? 'Complete Payment' :
                             `Complete Your ${selectedTier?.type === 'rental' ? 'Rental' : 'Purchase'}`}
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            disabled={processingPayment}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content based on step */}
                    {paymentStep === 'details' && (
                        <>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                                <h4 className="font-semibold mb-2">{selectedTier?.name}</h4>
                                {isUpgrade && proratedPrice && (
                                    <div className="mb-3 text-sm">
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Original price: ${selectedTier?.price}
                                        </p>
                                        <p className="text-green-600 dark:text-green-400 font-medium">
                                            Credit applied: -${(selectedTier?.price - proratedPrice).toFixed(2)}
                                        </p>
                                    </div>
                                )}
                                <p className="text-2xl font-bold mb-2">
                                    ${proratedPrice || selectedTier?.price}
                                    {selectedTier?.type === 'rental' && (
                                        <span className="text-sm font-normal text-gray-500 ml-2">
                                            for {selectedTier?.duration} hours
                                        </span>
                                    )}
                                </p>
                                <ul className="space-y-1 text-sm">
                                    {selectedTier?.features?.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleProceedToPayment}
                                disabled={processingPayment}
                                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {processingPayment ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="h-5 w-5" />
                                        Proceed to Payment
                                    </>
                                )}
                            </button>
                        </>
                    )}

                    {paymentStep === 'payment' && paymentIntent && (
                        <Elements stripe={stripePromise}>
                            <PaymentForm
                                amount={Math.round((proratedPrice || selectedTier?.price) * 100)} // Convert to cents
                                onSuccess={handlePaymentSuccess}
                                onError={handlePaymentError}
                            />
                        </Elements>
                    )}

                    {paymentStep === 'success' && (
                        <div className="text-center py-8">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {selectedTier?.type === 'rental' ?
                                    `You can now watch "${film?.title}" for the next ${selectedTier?.duration} hours.` :
                                    `You now own "${film?.title}" forever!`
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;