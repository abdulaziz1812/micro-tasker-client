import React, { useState } from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import useCoin from "../../../hook/useCoin";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const Withdraw = () => {
  const { user: currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { user, isLoading, error, refetch } = useCoin(currentUser.email);
  const coin = user?.coin || 0;
  const { register, handleSubmit, reset } = useForm();

  const [withdrawCoin, setWithdrawCoin] = useState(200);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const withdrawAmount = (withdrawCoin / 20).toFixed(2);

  const onSubmit = async (data) => {
    if (withdrawCoin > coin) {
      Swal.fire({
        title: "Error",
        text: "You do not have enough coins!",
        icon: "error",
      });
      return;
    }

    const withdrawalData = {
      worker_email: currentUser?.email,
      worker_name: currentUser?.displayName || "Anonymous",
      withdrawal_coin: withdrawCoin,
      withdrawal_amount: withdrawAmount,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date(),
      status: "pending",
    };

    const res = await axiosSecure.post("/withdrawals", withdrawalData);
    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Withdrawal request submitted!",
        showConfirmButton: false,
        timer: 1500,
      });

      refetch();
      reset();
      setWithdrawCoin(200);
      setPaymentSystem("");
      setAccountNumber("");
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full">
      <Helmet>
        <title>Withdraw | Micro Tasker</title>
      </Helmet>
      <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center">
        Withdraw Coins
      </h2>
      <p className="text-center mb-2">
        Current Coins:{" "}
        <strong>
          {isLoading ? "Loading..." : error ? "Error" : user?.coin || 0}
        </strong>
      </p>
      <p className="text-center mb-4">
        Withdrawable Amount: <strong>${(coin / 20).toFixed(2)}</strong>
      </p>

      <div className="flex flex-col items-center w-full">
        <div className="card bg-base-100 w-full max-w-xl shadow-lg p-4 sm:p-6">
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Coin to Withdraw */}
            <div className="form-control">
              <label className="label mb-2">Coin to Withdraw*</label>
              <input
                type="number"
                min="200"
                max={coin}
                value={withdrawCoin}
                onChange={(e) => setWithdrawCoin(Number(e.target.value))}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Withdraw Amount */}
            <div className="form-control">
              <label className="label mb-2">Withdraw Amount ($)</label>
              <input
                type="number"
                value={withdrawAmount}
                className="input input-bordered w-full bg-gray-100"
                readOnly
                required
              />
            </div>

            {/* Payment System */}
            <div className="form-control">
              <label className="label mb-2">Select Payment System*</label>
              <select
                className="select select-bordered w-full"
                value={paymentSystem}
                onChange={(e) => setPaymentSystem(e.target.value)}
                required
              >
                <option value="">Select Payment System</option>
                <option value="Bkash">Bkash</option>
                <option value="Rocket">Rocket</option>
                <option value="Nagad">Nagad</option>
              </select>
            </div>

            {/* Account Number */}
            <div className="form-control">
              <label className="label mb-2">Account Number:</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter your account number"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Withdraw Button */}
            <button
              type="submit"
              className="btn btn-success w-full"
              disabled={coin < 200}
            >
              Withdraw
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
