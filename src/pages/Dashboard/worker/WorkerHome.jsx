import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";
import { FaTasks } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { Helmet } from "react-helmet-async";

const WorkerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();
  const email = currentUser?.email;

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["worker-stats", email],
    queryFn: async () => {
      if (!email) return {};
      const res = await axiosSecure.get(`/worker-stats/${email}`);
      return res.data;
    },
    enabled: !!email,
  });
  console.log(stats);

  
  const { data: approvedSubmissions = [], refetch } = useQuery({
    queryKey: ["approved-submissions", email],
    queryFn: async () => {
      if (!email) return [];
      const res = await axiosSecure.get(`/submissions/approved/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

 

  return (
    <div className="w-full">
    <Helmet>
                <title>Worker-Home| Micro Tasker</title>
              </Helmet>
      <div className="p-8 m-8 rounded-2xl shadow-2xl border border-gray-200 flex flex-col ">
        <h2 className="text-2xl font-bold mb-4">Worker Dashboard</h2>

        <div className="stats shadow-2xl border-gray-200 border">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaTasks className="text-3xl" />
            </div>
            <div className="stat-title">
              Total Submission</div>
              <div className="stat-value">{stats?.totalSubmission || 0}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <MdOutlinePendingActions className="text-3xl" />
              </div>
              <div className="stat-title">Total pending submission</div>
              <div className="stat-value">{stats?.pendingSubmission || 0}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <BsCashCoin className="text-3xl" />
              </div>
              <div className="stat-title">Total Earning</div>
              <div className="stat-value">{stats?.totalEarning || 0}</div>
            </div>
          </div>

          {/* Task to Review Section */}
          <h2 className="text-xl font-bold m-4">Approved Submission</h2>
          <div className="overflow-x-auto">
            <table className="table w-full border border-gray-200">
              <thead className="text-center bg-gray-200">
                <tr>
                  <th>Sl no</th>
                  <th>Task Title</th>
                  <th>Payable Amount</th>
                  <th>Buyer Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedSubmissions.map((submission,index) => (
                  <tr key={submission._id} className="hover text-sm text-center">
                    <td>{index+1}</td>
                    <td>{submission.task_title}</td>
                    <td className="text-center">{submission.payable_amount}</td>
                    <td>{submission.buyer_name}</td>
                    <td>
                      {submission.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
  );
};

export default WorkerHome;
