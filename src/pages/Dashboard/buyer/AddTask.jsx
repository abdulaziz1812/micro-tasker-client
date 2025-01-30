import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hook/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTask = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.task_image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // if(res.data.success){

    // }
    console.log(res.data);
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4 w-full">Add New Task</h2>
      <div>
        <div className="flex-col lg:flex-row w-full">
          <div className="card bg-base-100 w-full  shadow-2xl ">
            <form
              className="card-body pb-0 w-full grid gap-8 grid-cols-2 mb-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-control ">
                <label className="label mb-2">
                  <span className="label-text">Task Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Task Title"
                  className="input input-bordered w-full"
                  name="task_title"
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
                  placeholder="task_detail"
                  className="input input-bordered w-full"
                  name="task_detail"
                  {...register("task_detail", { required: true })}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text">Required workers</span>
                </label>
                <input
                  type="number"
                  placeholder="Required workers"
                  className="input input-bordered w-full"
                  name="required_workers"
                  {...register("required_workers", { required: true })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text">Payable Amount</span>
                </label>
                <input
                  type="number"
                  placeholder="Payable Amount"
                  className="input input-bordered w-full"
                  name="payable_amount"
                  {...register("payable_amount", { required: true })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text">Completion Date</span>
                </label>
                <input
                  type="date"
                  placeholder="completion_date"
                  className="input input-bordered w-full"
                  name="completion_date"
                  {...register("completion_date", { required: true })}
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
                  className="input input-bordered w-full  "
                  name="submission_info"
                  {...register("submission_info", { required: true })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text mr-2">Task image</span>
                </label>
                <input
                  type="file"
                  className="file-input"
                  {...register("task_image", { required: true })}
                  required
                />
              </div>

              {/* {error.password && (
                <label className="label text-xs text-red-500">
                  {error.password}
                </label>
              )}
              {error.reg && (
                <label className="label text-sm text-red-500">
                  {error.reg}
                </label>
              )} */}
              <button type="submit" className="btn btn-success my-6">
                Add Task
              </button>
            </form>
          </div>
        </div>

        {/* {task.taskImageUrl && (
          <img
            src={task.taskImageUrl}
            alt="Task Preview"
            className="w-32 h-32"
          />
        )} */}
      </div>
    </div>
  );
};

export default AddTask;
