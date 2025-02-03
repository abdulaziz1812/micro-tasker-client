import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";
import useCoin from "../../../hook/useCoin";

const CheckoutFrom = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const { user: currentUser } = useAuth();
  const email = currentUser.email;
  const pkgPrice = location.state?.price;
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  const { user, refetch } = useCoin(email);
  const coin = user?.coin;

  useEffect(() => {
    if (pkgPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: pkgPrice })
        .then((res) => {
          // console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, pkgPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("payment", error);
      setError(error.message);
    } else {
      // console.log("payment method", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: email || "anonymous",
            name: currentUser?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log("confirm error");
    } else {
      // console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // console.log("transaction ID", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const payment = {
          transactionId: paymentIntent.id,
          email: email,
          price: pkgPrice,
          date: new Date(),
        };
        const res = await axiosSecure.post("/payments", payment);
        // console.log("payment res", res.data);
        if (res.data?.insertedId) {
          // console.log(pkgPrice);
          let newCoins = 0;
          if (pkgPrice === 1) newCoins = 10;
          if (pkgPrice === 10) newCoins = 150;
          if (pkgPrice === 20) newCoins = 500;
          if (pkgPrice === 35) newCoins = 1000;

          const updatedCoins = coin + newCoins; // Calculate before state update

          await axiosSecure.patch(`/user/${email}`, { coin: updatedCoins });

          Swal.fire({
            icon: "success",
            title: `Your payment has done successfully & added ${newCoins} Coins`,
            showConfirmButton: false,
            timer: 1500,
          });

          refetch();
          navigate("/dashboard/buyer/payment-history");
        }
      }
    }
  };
  return (
    <div className="overflow-x-auto">
      <form
        className="p-10 min-w-2xl m-8 rounded-2xl shadow-2xl "
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-success mt-5"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-500">{error}</p>
        {transactionId && (
          <p className="text-green-600">
            Your transaction id: {transactionId}{" "}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutFrom;
