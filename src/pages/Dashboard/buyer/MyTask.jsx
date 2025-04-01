import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useCoin from "../../../hook/useCoin";
import { Helmet } from "react-helmet-async";

const MyTask = () => {
  const { user: currentUser } = useAuth();
  const email = currentUser?.email;
  // console.log(email);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const { user, isLoading, error, refetch } = useCoin(email);
  const coin = user?.coin;

  useEffect(() => {
    axios
      .get(`https://micro-tasker-server.vercel.app/tasks/${email}`)
      .then((res) => {
        const sortedTasks = [...res.data].sort(
          (b, a) =>
            new Date(b.completion_date).getTime() -
            new Date(a.completion_date).getTime()
        );
        setTasks(sortedTasks);
      });
  }, [email]);

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

  const openUpdateModal = (task) => {
    setSelectedTask(task);
    document.getElementById("my_modal_1").showModal();
  };

  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);

    const updatedTask = {
      task_title: data.task_title,
      task_detail: data.task_detail,
      submission_info: data.submission_info,
    };
    const taskRes = await axiosPublic.put(
      `/tasks/${selectedTask._id}`,
      updatedTask
    );
    if (taskRes.data.modifiedCount > 0) {
      Swal.fire({
        title: "Task Updated Successfully",
        icon: "success",
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === selectedTask._id ? { ...task, ...updatedTask } : task
        )
      );
      document.getElementById("my_modal_1").close();
    }
    reset();
  };

  const handleDelete = async (task) => {
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
        await axiosPublic.delete(`/tasks/${task._id}`);

        const totalAmount =
          parseFloat(task.required_workers) * parseFloat(task.payable_amount);
        const updatedCoins = coin + totalAmount;

        await axiosPublic.patch(`/user/${email}`, { coin: updatedCoins });

        const remainingTasks = tasks.filter((t) => t._id !== task._id);
        setTasks(remainingTasks);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        refetch();
      }
    });
  };

  return (
    <div className="p-6 m-8 rounded-2xl shadow-2xl border lg:w-9/12 xl:w-10/12  border-gray-200">
      <Helmet>
        <title>My Task | Micro Tasker</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          {/* head */}
          <thead className="text-center">
            <tr>
              <th className="border border-gray-200">SL No.</th>
              <th className="border border-gray-200">Task Image</th>
              <th className="border border-gray-200">Task Title</th>
              <th className="border border-gray-200">Task Details</th>
              <th className="border border-gray-200">Required Workers</th>
              <th className="border border-gray-200">Payable Amount</th>
              <th className="border border-gray-200">Completion Date</th>
              <th className="border border-gray-200">Submission Info</th>
              <th className="border border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr className="hover text-sm " key={task._id}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={task.task_image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{task.task_title}</td>
                <td>{task.task_detail}</td>
                <th className="text-center">{task.required_workers}</th>
                <th className="text-center">{task.payable_amount}</th>
                <td>{date(task.completion_date)}</td>
                <td>{task.submission_info}</td>
                <td className="flex gap-2 justify-center items-center">
                  <button
                    onClick={() => openUpdateModal(task)}
                    className="btn btn-neutral text-white btn-xs "
                  >
                    Update
                  </button>
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

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        open modal
      </button> */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label mb-2">
                <span className="label-text">Task Title</span>
              </label>
              <input
                type="text"
                placeholder="Task Title"
                className="input input-bordered w-full"
                defaultValue={selectedTask.task_title}
                {...register("task_title", { required: true })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label mb-2">
                <span className="label-text">Task Detail</span>
              </label>
              <input
                type="text"
                placeholder="Task Detail"
                className="input input-bordered w-full"
                defaultValue={selectedTask.task_detail}
                {...register("task_detail", { required: true })}
                required
              />
            </div>

            <div className="form-control">
              <label className="label mb-2">
                <span className="label-text">Submission Info</span>
              </label>
              <input
                type="text"
                placeholder="Submission Info"
                className="input input-bordered w-full"
                defaultValue={selectedTask.submission_info}
                {...register("submission_info", { required: true })}
                required
              />
            </div>

            <button className="btn btn-success mt-6 w-full" type="submit">
              Update
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyTask;
