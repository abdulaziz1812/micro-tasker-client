import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutFrom from './CheckoutFrom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Checkout = () => {
    return (
        <div>
            <Elements stripe={stripePromise}> 
                <CheckoutFrom></CheckoutFrom>
            </Elements>
        </div>
    );
};

export default Checkout;