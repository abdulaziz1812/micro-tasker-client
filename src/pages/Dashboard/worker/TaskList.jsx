import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const TaskList = () => {
    const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchAvailableTasks();
  }, []);

  const fetchAvailableTasks = async () => {
    try {
      const res = await axiosSecure.get("/tasks/available"); 
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const date = (addedDate) => {
    const newDate = new Date(addedDate);
    return newDate.toLocaleString("en-gb", {
      day: "2-digit",
      year: "numeric",
      month: "short",
      
    });
  };

  return (
    <div className="p-8">
      <Helmet>
                      <title>Task-List | Micro Tasker</title>
                    </Helmet>
      <h2 className="text-2xl font-bold mb-6">Available Tasks</h2>

      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            
            <div key={task._id} className="card bg-base-100  shadow-sm">
            <div className="card-body">
              <h2 className="card-title">{task.task_title}</h2>
              <p className="text-gray-600">Buyer: {task.name}</p>
              <p className="text-gray-600">Completion: {date(task.completion_date)}</p>
              <p className="text-green-700 font-bold">Pay: ${task.payable_amount}</p>
              <p className="text-gray-600">Completion: {date(task.completion_date)}</p>
              <div className="card-actions justify-end">
                <button 
                onClick={() => navigate(`/dashboard/worker/task-details/${task._id}`)}
                className="btn btn-success">View Details</button>
              </div>
            </div>
          </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No available tasks at the moment.</p>
      )}
    </div>
  );
};


export default TaskList;