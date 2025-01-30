import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivetRoute";
import Dashboard from "../Layouts/Dashboard";
import NotFound from "../pages/NotFound";
import AddTask from "../pages/Dashboard/buyer/AddTask";
import MainLayout from "../Layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // Buyer 
      {
        path: "buyer/buyer-home",
        
      },

      {
        path: "buyer/add-task",
        element: <AddTask></AddTask>
      },
      {
        path: "buyer/my-tasks",
        
      },
      {
        path: "buyer/purchase-coin",
        
      },
      {
        path: "buyer/payment-history",
        
      },
      // Worker 
      {
        path: "worker/worker-home",
        
      },
      {
        path: "worker/task-list",
        
      },
      {
        path: "worker/my-submissions",
        
      },
      {
        path: "worker/withdrawals",
       
      },
      // Admin Routes
      {
        path: "admin/admin-home",
        
      },
      {
        path: "admin/manage-users",
        
      },
      {
        path: "admin/manage-tasks",
       
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

