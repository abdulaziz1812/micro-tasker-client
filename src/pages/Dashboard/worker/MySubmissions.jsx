import { useEffect, useState } from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MySubmissions = () => {
  const { user: currentUser } = useAuth();
  const email = currentUser.email;
  const axiosSecure = useAxiosSecure();

  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    if (email) {
      axiosSecure.get(`/submissions/${email}`).then((res) => {
        setSubmissions(res.data);
      });
    }
  }, [email, axiosSecure]);

  const totalPages = Math.ceil(submissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubmissions = submissions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const formatDate = (addedDate) => {
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
    <div className="p-6 w-full">
      <Helmet>
        <title>My Submissions | Micro Tasker</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-4">My Submissions</h2>

      <div className="overflow-x-auto p-6 shadow-2xl rounded-2xl">
        <table className="table table-zebra">
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
            {paginatedSubmissions.length > 0 ? (
              paginatedSubmissions.map((submission, index) => (
                <tr key={submission._id} className="text-center">
                  <td>{startIndex + index + 1}</td>
                  <td>{submission.task_title}</td>
                  <td>{submission.submission_details}</td>
                  <td className={statusClass(submission.status)}>
                    {submission.status}
                  </td>
                  <td>{formatDate(submission.current_date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4 join">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={"join-item btn"}
        >
          Previous
        </button>

        <span className="join-item btn">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={"join-item btn"}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MySubmissions;
