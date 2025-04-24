import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useCoin from "../../../hook/useCoin";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const ManageTasks = () => {
  const { user: currentUser } = useAuth();
  const email = currentUser?.email;

  const [tasks, setTasks] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios
      .get(`https://micro-tasker-server.vercel.app/tasks/available`)
      .then((res) => {
        const sortedTasks = [...res.data].sort(
          (b, a) =>
            new Date(b.completion_date).getTime() -
            new Date(a.completion_date).getTime()
        );
        setTasks(sortedTasks);
      });
  }, []);

  // console.log(tasks);

  const date = (completion_date) => {
    const newDate = new Date(completion_date);
    return newDate.toLocaleString("en-gb", {
      day: "2-digit",
      year: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDelete = async (task) => {
    // console.log(task);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/tasks/${task._id}`);

        const userRes = await axiosSecure.get(`/user/${task.email}`);
        const selectedCoin = userRes.data.coin;

        const totalAmount =
          parseFloat(task.required_workers) * parseFloat(task.payable_amount);
        const updatedCoins = selectedCoin + totalAmount;

        await axiosSecure.patch(`/user/${task.email}`, { coin: updatedCoins });

        const remainingTasks = tasks.filter((t) => t._id !== task._id);
        setTasks(remainingTasks);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="p-4 rounded-2xl shadow-2xl border border-gray-200 ">
      <h2 className="text-2xl font-bold mb-4">Manage Tasks</h2>

      <div className="overflow-x-auto">
        <table className="table border border-gray-200">
          {/* head */}
          <thead className="text-center">
            <tr className="bg-gray-200">
              <th>SL No.</th>
              <th>Task Image</th>
              <th>Task Title</th>
              <th>Task Details</th>
              <th>Required Workers</th>
              <th>Payable Amount</th>
              <th>Completion Date</th>
              <th>Submission Info</th>
              <th>Buyer Email</th>
              <th>Buyer Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr className="hover text-sm " key={task._id}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={task.task_image} alt={task.task_title} />
                    </div>
                  </div>
                </td>
                <td>{task.task_title}</td>
                <td>{task.task_detail}</td>
                <td className="text-center">{task.required_workers}</td>
                <td className="text-center">{task.payable_amount}</td>
                <td>{date(task.completion_date)}</td>
                <td>{task.submission_info}</td>
                <td>{task.email}</td>
                <td>{task.name}</td>
                <td className="flex justify-center items-center">
                  <button
                    onClick={() => handleDelete(task)}
                    className="btn btn-error text-white btn-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default ManageTasks;
