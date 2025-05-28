// src/components/PaymentForm.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPayment } from '../firebase-config'; // Updated to use new function name
import { trackEvent } from '../utils/trackEvent';
import { useAuth } from '../context/AuthContext';

const PaymentForm = ({ amount, onSuccess, onError }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const { currentUser } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            setError('Stripe has not loaded yet. Please try again.');
            setLoading(false);
            return;
        }

        try {
            // Updated to use the new createPayment function
            const { data } = await createPayment({
                amount: amount,
                userId: currentUser.uid,
                metadata: {
                    productName: 'Premium Subscription',
                    userEmail: currentUser.email
                }
            });

            // Confirm the payment with Stripe.js
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email: currentUser.email,
                    }
                }
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            if (result.paymentIntent.status === 'succeeded') {
                // Track successful payment
                trackEvent('payment_succeeded', {
                    amount: amount,
                    userId: currentUser.uid
                });

                // Call success callback
                onSuccess(result.paymentIntent);
            }
        } catch (err) {
            setError(err.message || 'An error occurred with your payment. Please try again.');
            trackEvent('payment_failed', {
                error: err.message,
                userId: currentUser?.uid
            });
            onError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 border border-gray-300 rounded">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>

            {error && (
                <div className="p-2 bg-red-100 text-red-700 text-sm rounded">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || loading}
                className={`w-full py-3 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition ${loading || !stripe ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
            </button>
        </form>
    );
};

export default PaymentForm;