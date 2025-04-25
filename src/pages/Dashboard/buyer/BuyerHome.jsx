import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";
import { FaTasks } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { Helmet } from "react-helmet-async";

const BuyerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();
  const email = currentUser?.email;

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["buyer-stats", email],
    queryFn: async () => {
      if (!email) return {};
      const res = await axiosSecure.get(`/buyer-stats/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  const { data: pendingSubmissions = [], refetch } = useQuery({
    queryKey: ["pending-submissions", email],
    queryFn: async () => {
      if (!email) return [];
      const res = await axiosSecure.get(`/submissions/pending/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApprove = async (submission) => {
    const updatedStatus = { status: "approved" };
    await axiosSecure.patch(
      `/submissions/approve/${submission._id}`,
      updatedStatus
    );
    Swal.fire("Approved!", "Submission has been approved.", "success");

    const userRes = await axiosSecure.get(`/user/${submission.worker_email}`);
    const selectedCoin = userRes.data.coin;
    const totalAmount = submission.payable_amount;

    const updatedCoins = selectedCoin + totalAmount;

    await axiosSecure.patch(`/user/${submission.worker_email}`, {
      coin: updatedCoins,
    });

    refetch();
  };

  const handleReject = async (submission) => {
    const updatedStatus = { status: "rejected" };
    await axiosSecure.patch(
      `/submissions/rejected/${submission._id}`,
      updatedStatus
    );
    Swal.fire("Rejected!", "Submission has been rejected.", "error");

    const userRes = await axiosSecure.get(
      `/task-details/${submission.task_id}`
    );
    const updatedRequiredWorkers = userRes.data.required_workers + 1;
    await axiosSecure.patch(`/tasks/${submission.task_id}`, {
      required_workers: updatedRequiredWorkers,
    });

    refetch();
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>Buyer-Home | Micro Tasker</title>
      </Helmet>

      <div className="p-8 m-8 rounded-2xl shadow-2xl border border-gray-200 flex flex-col ">
        

        {/* Buyer Stats Section */}
        <div className="stats shadow-2xl m-8 border border-gray-200">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaTasks className="text-3xl" />
            </div>
            <div className="stat-title">Total Tasks</div>
            <div className="stat-value">{stats?.totalTask || 0}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <MdOutlinePendingActions className="text-3xl" />
            </div>
            <div className="stat-title">Pending Tasks</div>
            <div className="stat-value">{stats?.pendingTask || 0}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <BsCashCoin className="text-3xl" />
            </div>
            <div className="stat-title">Total Payment</div>
            <div className="stat-value">{stats?.totalPayments || 0}</div>
          </div>
        </div>

        {/* Task to Review Section */}
        <div className="m-6 p-6 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-green-800 my-6 text-center">Tasks to Review</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra  border-gray-200">
            <thead className="bg-green-100 text-green-800 text-center">
              <tr>
                <th>Worker Name</th>
                <th>Task Title</th>
                <th>Payable Amount</th>
                <th>Submission Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingSubmissions.map((submission) => (
                <tr key={submission._id} className="border-t text-center hover:bg-green-50">
                  <td>{submission.worker_name}</td>
                  <td>{submission.task_title}</td>
                  <td className="text-center">{submission.payable_amount}</td>
                  <td className="">
                    <button
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setIsModalOpen(true);
                      }}
                      className="btn btn-success btn-xs"
                    >
                      View Submission
                    </button>
                  </td>

                  <td className="flex gap-2 justify-center items-center">
                    <button
                      onClick={() => handleApprove(submission)}
                      className="btn btn-success btn-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(submission)}
                      className="btn btn-error text-white btn-xs"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>

      {/* Modal for View Submission */}
      {isModalOpen && selectedSubmission && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-3xl font-bold text-center text-green-800 mb-4">Submission Details</h3>
            <div className=" p-4 rounded-lg bg-green-50 shadow-lg border border-gray-200">
            <p>
              <strong>Worker Name:</strong> {selectedSubmission.worker_name}
            </p>
            <p>
              <strong>Task Title:</strong> {selectedSubmission.task_title}
            </p>
            <p>
              <strong>Payable Amount:</strong>{" "}
              {selectedSubmission.payable_amount}
            </p>
            <p>
              <strong>Submission Details:</strong>{" "}
              {selectedSubmission.submission_details}
            </p>
            </div>
            <div className="modal-action">
              <button onClick={() => setIsModalOpen(false)} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerHome;
