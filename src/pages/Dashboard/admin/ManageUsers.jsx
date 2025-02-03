import React from "react";
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

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <div className="p-6 xl:m-6 rounded-2xl shadow-2xl border border-gray-200 lg:w-fit">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table  ">
          <thead>
            <tr className="bg-gray-200 text-center">
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
              <tr key={user._id} className="text-center">
                <td>{index + 1}</td>
                <td>
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
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
