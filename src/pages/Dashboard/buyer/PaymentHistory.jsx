import React from "react";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments =[]} = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  const date = (addedDate) => {
    const newDate = new Date(addedDate);
    return newDate.toLocaleString("en-gb", {
      day: "2-digit",
      year: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  return (
    <div className="m-10 w-full" >
      <div className="overflow-x-auto p-6 rounded shadow-2xl border border-gray-200">
        <table className="table table-zebra ">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>Sl No</th>
              <th>Price</th>
              <th>Transaction Id</th>
              <th>Date of Transaction</th> 
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) =><tr
            key={payment._id}
            className="text-center"
            >
              <td>{index+1}</td>
              <td>$ {payment.price}</td>
              <td>{payment.transactionId}</td>
              <td>{date(payment.date)}</td>
            </tr>
            )}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
