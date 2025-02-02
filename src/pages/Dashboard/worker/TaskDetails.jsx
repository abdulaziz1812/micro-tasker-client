import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const TaskDetails = () => {
   const task = useLoaderData();
   console.log(task);
  const { user: currentUser } = useAuth();
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  
  const { register, handleSubmit, reset } = useForm();

  const date = (addedDate) => {
    const newDate = new Date(addedDate);
    return newDate.toLocaleString("en-gb", {
      day: "2-digit",
      year: "numeric",
      month: "short",
      
    });
  };

 
  

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    
    const existingSubmission = await axiosSecure.get(
        `/submissions?task_id=${task._id}&worker_email=${currentUser.email}`
      );


      console.log(existingSubmission.data);
      if (existingSubmission.data.length>0) {
        Swal.fire({
          title: "Duplicate Task!",
          text: "A task with this title already Submitted.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

    const submission = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: currentUser?.email,
      submission_details: data.submission_details,
      worker_name: currentUser?.displayName || "anonymous",
      buyer_name: task.name || "Buyer Name", 
      buyer_email: task.email,                
      current_date: new Date(),
      status: "pending",
    };
console.log(submission);
    
      const res = await axiosSecure.post("/submissions", submission);
      console.log("Submission response:", res.data);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Submission Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset(); 
        navigate('/dashboard/worker/my-submissions')
        }
  };

  return (
    <div className="p-6">
      
      <div className="hero bg-base-100 rounded-2xl shadow-2xl ">
        <div className="hero-content flex-col lg:flex-row gap-8">
          <img
            src={task.task_image}
            alt={task.task_title}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{task.task_title}</h1>
            <p className="">{task.task_detail}</p>
            <p >
              <strong>Completion Date:</strong>{" "}{date(task.completion_date)}
            </p>
            <p >
              <strong>Payable Amount:</strong> ${task.payable_amount}
            </p>
            <p >
              <strong>Required Workers:</strong> {task.required_workers}
            </p>
            <p >
              <strong>Submission Info:</strong> {task.submission_info}
            </p>
          </div>
        </div>
      </div>

      
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Submit Your Work</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <textarea
            className="textarea textarea-bordered w-full "
            placeholder="Enter your submission details..."
            {...register("submission_details", { required: true })}
          ></textarea>
          <button type="submit" className="btn btn-success w-fit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
