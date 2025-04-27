import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const TaskList = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "" (default), "asc", or "desc"

  useEffect(() => {
    fetchAvailableTasks();
  }, []);

  const fetchAvailableTasks = async () => {
    try {
      const res = await axiosSecure.get("/tasks/available");
      setTasks(res.data);
      setFilteredTasks(res.data); // Initialize filtered tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Format date
  const date = (addedDate) => {
    const newDate = new Date(addedDate);
    return newDate.toLocaleString("en-gb", {
      day: "2-digit",
      year: "numeric",
      month: "short",
    });
  };

  // Handle search
  useEffect(() => {
    let updatedTasks = [...tasks];

    // Filter by search query
    if (searchQuery) {
      updatedTasks = updatedTasks.filter((task) =>
        task.task_title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by payable_amount
    if (sortOrder === "asc") {
      updatedTasks.sort((a, b) => a.payable_amount - b.payable_amount);
    } else if (sortOrder === "desc") {
      updatedTasks.sort((a, b) => b.payable_amount - a.payable_amount);
    }

    setFilteredTasks(updatedTasks);
  }, [searchQuery, sortOrder, tasks]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="p-8">
      <Helmet>
        <title>Task-List | Micro Tasker</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-green-800 my-6 text-center">
        Available Tasks
      </h2>

      {/* Search and Sort Controls */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered w-full md:w-1/2"
        />

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value)}
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="">Sort by Pay</option>
          <option value="asc">Pay: Low to High</option>
          <option value="desc">Pay: High to Low</option>
        </select>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {filteredTasks.map((task) => (
            <div key={task._id} className="card border border-gray-100 shadow-lg">
              <div className="card-body flex flex-col items-center">
                <img src={task.task_image} className="w-46" alt={task.task_title} />
                <div>
                  <h2 className="card-title">{task.task_title}</h2>
                  <p className="text-gray-600">Buyer: {task.name}</p>
                  <p className="text-gray-600">
                    Completion: {date(task.completion_date)}
                  </p>
                  <p className="text-green-700 font-bold">
                    Pay: ${task.payable_amount}
                  </p>
                </div>
                <div className="card-actions justify-end">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/worker/task-details/${task._id}`)
                    }
                    className="btn btn-success"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No tasks match your search or filter.</p>
      )}
    </div>
  );
};

export default TaskList;