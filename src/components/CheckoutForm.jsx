import { functions } from '../firebase-config'; // adjust path as needed
import { httpsCallable } from 'firebase/functions';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_...'); // Your public key here

function CheckoutForm({ userId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createPayment = httpsCallable(functions, 'createPayment');
    createPayment({
      amount: 500, // $5.00
      userId: userId, // must be a real Firebase Auth UID
      metadata: { test: 'true' },
    })
      .then((result) => {
        setClientSecret(result.data.clientSecret);
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error.message);
      });
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: 'Test User' },
      },
    });

    if (error) {
      console.error('Payment failed:', error.message);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe || !clientSecret} type="submit">
        Pay
      </button>
    </form>
  );
}

export default function WrappedCheckout({ userId }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm userId={userId} />
    </Elements>
  );
}
