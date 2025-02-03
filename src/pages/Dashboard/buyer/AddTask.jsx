import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useCoin from "../../../hook/useCoin";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTask = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const email = currentUser?.email;
  const name= currentUser?.displayName
  const { user, isLoading, error, refetch } = useCoin(email);
  const coin = user?.coin;
  
 
  console.log(currentUser);
  const { register, handleSubmit,reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    const totalPayableAmount =
      parseFloat(data.required_workers) * parseFloat(data.payable_amount);
    console.log("Total Payable:", totalPayableAmount);

    
    if (coin < totalPayableAmount) {
      Swal.fire({
        title: "Not Enough Coins!",
        text: "You need to purchase more coins to add this task.",
        icon: "error",
        confirmButtonText: "Go to Purchase",
      }).then(() => {
        navigate("dashboard/buyer/purchase-coin");
      });
      return;
    }

    
    const existingTaskRes = await axiosPublic.get(
      `/tasks?task_title=${data.task_title}`
    );
    if (existingTaskRes.data) {
      Swal.fire({
        title: "Duplicate Task!",
        text: "A task with this title already exists.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    
    const imageFile = new FormData();
    imageFile.append("image", data.task_image[0]);

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.success) {
      const newTask = {
        task_title: data.task_title,
        task_detail: data.task_detail,
        required_workers: parseFloat(data.required_workers),
        payable_amount: parseFloat(data.payable_amount),
        completion_date: data.completion_date,
        submission_info: data.submission_info,
        task_image: res.data.data.display_url,
        email,
        name
      };

      const taskRes = await axiosPublic.post("/tasks", newTask);
      if (taskRes.data.insertedId) {
        const updatedCoins = coin - totalPayableAmount;

        await axiosPublic.patch(`/user/${email}`, { coin: updatedCoins });

        Swal.fire({
          title: "Task Added Successfully",
          icon: "success",
        });
        refetch();
        reset()
        navigate('/dashboard/buyer/my-tasks')
      }
    }
  };

  return (
    <div className="p-6 w-full">
      <Helmet>
                      <title>Add TAsk | Micro Tasker</title>
                    </Helmet>
      <h2 className="text-2xl font-bold mb-4 w-full">Add New Task</h2>
      <div>
        <div className="flex-col lg:flex-row w-full">
          <div className="card bg-base-100 w-full shadow-2xl border border-gray-200">
            <form
              className="card-body pb-0 w-full grid gap-8 grid-cols-2 mb-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text">Task Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Task Title"
                  className="input input-bordered w-full"
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
                  {...register("task_detail", { required: true })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text">Required Workers</span>
                </label>
                <input
                  type="number"
                  placeholder="Required Workers"
                  className="input input-bordered w-full"
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
                  placeholder="Completion Date"
                  className="input input-bordered w-full"
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
                  className="input input-bordered w-full"
                  {...register("submission_info", { required: true })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text">Task Image</span>
                </label>
                <input
                  type="file"
                  className="file-input"
                  {...register("task_image", { required: true })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-success my-6">
                Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
