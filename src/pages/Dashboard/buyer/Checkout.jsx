// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";
// import useAuth from "../../../hook/useAuth";
// import Swal from "sweetalert2";

// const stripePromise = loadStripe("your-publishable-key-here");

// const CheckoutForm = ({ price, coins }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { user } = useAuth();
//   const navigate = useNavigate();
  
//   const [clientSecret, setClientSecret] = useState("");
  
//   useEffect(() => {
//     axios.post("/create-payment-intent", { price }).then((res) => {
//       setClientSecret(res.data.clientSecret);
//     });
//   }, [price]);
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
    
//     const card = elements.getElement(CardElement);
//     const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: { card, billing_details: { email: user.email } }
//     });
    
//     if (error) {
//       Swal.fire("Payment Error", error.message, "error");
//     } else {
//       await axios.patch(`/user/${user.email}`, { coins: coins });
//       Swal.fire("Success", "Coins added successfully!", "success");
//       navigate("/dashboard");
//     }
//   };
  
//   return (
//     <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded">
//       <CardElement className="border p-4 rounded" />
//       <button type="submit" className="btn btn-success mt-4" disabled={!stripe}>
//         Pay ${price}
//       </button>
//     </form>
//   );
// };

// const Checkout = () => {
//   const { price, coins } = useParams();
//   return (
//     <Elements stripe={stripePromise}>
//       <div className="container mx-auto p-6">
//         <h2 className="text-xl font-bold mb-4">Complete Your Payment</h2>
//         <CheckoutForm price={price} coins={coins} />
//       </div>
//     </Elements>
//   );
// };

// export default Checkout;
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