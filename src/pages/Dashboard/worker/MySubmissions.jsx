import React, { useEffect, useState } from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const MySubmissions = () => {
  const { user: currentUser } = useAuth();
  const email = currentUser.email
  console.log(email);
  const axiosSecure = useAxiosSecure();
  const [submissions, setSubmissions] = useState([]);

  const date = (addedDate) => {
    const newDate = new Date(addedDate);
    return newDate.toLocaleString("en-gb", {
      day: "2-digit",
      year: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    if (email) {
      axiosSecure
        .get(`/submissions/${email}`)
        .then((res) => {
          setSubmissions(res.data);
        })
        
    }
  }, [email, axiosSecure]);

  // Function to determine CSS classes for the status cell
  const statusClass = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "text-green-600 font-bold";
      case "rejected":
        return "text-red-600 font-bold";
      case "pending":
      default:
        return "text-yellow-600 font-bold";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Submissions</h2>
      <div className="overflow-x-auto p-6 shadow-2xl rounded-2xl">
        <table className="table table-zebra ">
          <thead>
            <tr className="text-center">
                <th>SL No.</th>
              <th>Task Title</th>
              <th>Submission Details</th>
              <th>Status</th>
              <th>Submitted On</th>
            </tr>
          </thead>
          <tbody>
            {submissions && submissions.length > 0 ? (
              submissions.map((submission ,index) => (
                <tr key={submission._id} >
                  <td>{index+1}</td>
                  <td>{submission.task_title}</td>
                  <td>{submission.submission_details}</td>
                  <td className={`${statusClass(submission.status)}`}>
                    {submission.status}
                  </td>
                  <td>
                    {date(submission.current_date)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubmissions;
