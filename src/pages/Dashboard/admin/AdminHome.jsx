import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { TiSpanner } from "react-icons/ti";
import { BsCashCoin } from "react-icons/bs";
import { ImCoinDollar } from "react-icons/im";
import { FaCashRegister } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAdmin from "../../../hook/useAdmin";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const {
    data: withdrawRequests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["withdrawRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/withdrawals/pending");
      return res.data;
    },
  });

  const handleApproveWithdraw = async (id, workerEmail, withdrawalCoin) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to approve this withdrawal request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedStatus = { status: "approved" };
        const res = await axiosSecure.put(`/withdrawals/${id}`, updatedStatus);

        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "Withdrawal request approved.", "success");

          const userRes = await axiosSecure.get(`/user/${workerEmail}`);
          const currentCoin = userRes.data.coin || 0;
          const updatedCoin = currentCoin - withdrawalCoin;

          await axiosSecure.patch(`/user/${workerEmail}`, {
            coin: updatedCoin,
          });
          refetch();
        }
      }
    });
  };

  return (
    <div className="flex flex-col  w-full ">
      <Helmet>
        <title>Admin Home | Micro Tasker</title>
      </Helmet>
      {/* Stats */}
      <div className="stats shadow-2xl m-8 border border-gray-200">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <TiSpanner className="text-3xl" />
          </div>
          <div className="stat-title">Total worker</div>
          <div className="stat-value">{stats?.totalWorkers}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <BsCashCoin className="text-3xl" />
          </div>
          <div className="stat-title">Total buyer</div>
          <div className="stat-value">{stats?.totalBuyers}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <ImCoinDollar className="text-3xl" />
          </div>
          <div className="stat-title">Total available coin</div>
          <div className="stat-value">{stats?.totalCoin}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaCashRegister className="text-3xl" />
          </div>
          <div className="stat-title">Total payments</div>
          <div className="stat-value">{stats?.totalPayments}</div>
        </div>
      </div>

      {/* Withdrawal*/}
      <div className="m-6 p-6  rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Pending Withdraw Requests</h2>
        <div className="overflow-x-auto ">
          <table className="table table-zebra  border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2">Sl No</th>
                <th className="p-2">Worker</th>
                <th className="p-2">Email</th>
                <th className="p-2">Coins</th>
                <th className="p-2">Amount ($)</th>
                <th className="p-2">Payment Method</th>
                <th className="p-2">Account No.</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : withdrawRequests.length > 0 ? (
                withdrawRequests.map((request, index) => (
                  <tr key={request._id} className="border-t">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{request.worker_name}</td>
                    <td className="p-2">{request.worker_email}</td>
                    <td className="p-2">{request.withdrawal_coin}</td>
                    <td className="p-2">${request.withdrawal_amount}</td>
                    <td className="p-2">{request.payment_system}</td>
                    <td className="p-2">{request.account_number}</td>
                    <td className="p-2">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleApproveWithdraw(
                            request._id,
                            request.worker_email,
                            request.withdrawal_coin
                          )
                        }
                      >
                        Payment Success
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    No pending withdrawal requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
