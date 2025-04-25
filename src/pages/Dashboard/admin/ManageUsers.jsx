import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/user/${id}`);
    },
    onSuccess: () => {
      refetch();
      Swal.fire("Deleted!", "The user has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete the user.", "error");
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/${id}`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Updated!", "User role has been updated.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update role.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
      }
    });
  };

  const handleRoleChange = (id, newRole) => {
    updateRoleMutation.mutate({ id, role: newRole });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-2xl mx-auto mt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error loading users. Please try again later.</span>
      </div>
    );
  }

  return (
    <div className="m-4 p-4 rounded-lg shadow-2xl border border-gray-200 ">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table  ">
          <thead>
            <tr className="bg-green-100 text-green-800 text-center">
              <th>Sl no</th>
              <th>Photo</th>
              <th>Display Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Available Coin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="text-center hover:bg-green-50">
                <td>{index + 1}</td>
                <td>
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover mx-auto ring-2 ring-green-300"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="select select-bordered select-sm w-25 bg-green-100 text-green-800 border-green-300 focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Worker">Worker</option>
                  </select>
                </td>
                <td>{user.coin}</td>
                <td>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleDelete(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
