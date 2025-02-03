import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutFrom from "./CheckoutFrom";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Checkout = () => {
  return (
    <div>
      <Helmet>
        <title>CheckOut| Micro Tasker</title>
      </Helmet>
      <Elements stripe={stripePromise}>
        <CheckoutFrom></CheckoutFrom>
      </Elements>
    </div>
  );
};

export default Checkout;
