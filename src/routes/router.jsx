import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivetRoute";
import Dashboard from "../Layouts/Dashboard";
import NotFound from "../pages/NotFound";
import AddTask from "../pages/Dashboard/buyer/AddTask";
import MainLayout from "../Layouts/MainLayout";
import MyTask from "../pages/Dashboard/buyer/MyTask";

import PurchaseCoin from "../pages/Dashboard/buyer/PurchaseCoin";
import Checkout from "../pages/Dashboard/buyer/Checkout";
import PaymentHistory from "../pages/Dashboard/buyer/PaymentHistory";
import TaskList from "../pages/Dashboard/worker/TaskList";
import TaskDetails from "../pages/Dashboard/worker/TaskDetails";
import MySubmissions from "../pages/Dashboard/worker/MySubmissions";
import Withdraw from "../pages/Dashboard/worker/Withdraw";
import AdminHome from "../pages/Dashboard/admin/AdminHome";
import ManageUsers from "../pages/Dashboard/admin/ManageUsers";
import ManageTasks from "../pages/Dashboard/admin/ManageTasks";
import BuyerHome from "../pages/Dashboard/buyer/BuyerHome";
import WorkerHome from "../pages/Dashboard/worker/WorkerHome";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import Profile from "../pages/Dashboard/sharded/Profile";
import DashboardHome from "../pages/Dashboard/sharded/DashboardHome";
import UpdateProfile from "../pages/Dashboard/sharded/UpdateProfile";

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
      {
        path: "/dashboard",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },
      // Buyer
      {
        path: "buyer/my-profile",
        element: (
          <BuyerRoute>
            <Profile></Profile>
          </BuyerRoute>
        ),
      },
      {
        path: "buyer/buyer-home",
        element: (
          <BuyerRoute>
            <BuyerHome></BuyerHome>
          </BuyerRoute>
        ),
      },

      {
        path: "buyer/add-task",
        element: (
          <BuyerRoute>
            <AddTask></AddTask>
          </BuyerRoute>
        ),
      },
      {
        path: "buyer/my-tasks",
        element: (
          <BuyerRoute>
            <MyTask></MyTask>
          </BuyerRoute>
        ),
      },
      {
        path: "buyer/purchase-coin",
        element: (
          <BuyerRoute>
            <PurchaseCoin></PurchaseCoin>
          </BuyerRoute>
        ),
      },
      {
        path: "buyer/checkout",
        element: (
          <BuyerRoute>
            <Checkout></Checkout>
          </BuyerRoute>
        ),
      },
      {
        path: "buyer/payment-history",
        element: (
          <BuyerRoute>
            <PaymentHistory></PaymentHistory>
          </BuyerRoute>
        ),
      },

      // Worker
      {
        path: "worker/my-profile",
        element: (
          <Profile></Profile>
        ),
      },
      {
        path: "worker/worker-home",
        element: <WorkerHome></WorkerHome>,
      },
      {
        path: "worker/task-list",
        element: <TaskList></TaskList>,
      },
      {
        path: "worker/task-details/:id",
        element: <TaskDetails></TaskDetails>,
        loader: ({ params }) =>
          fetch(
            `https://micro-tasker-server.vercel.app/task-details/${params.id}`
          ),
      },
      {
        path: "worker/my-submissions",
        element: <MySubmissions></MySubmissions>,
      },
      {
        path: "worker/withdrawals",
        element: <Withdraw></Withdraw>,
      },
      // Admin
      {
        path: "admin/my-profile",
        element: (
          <AdminRoute>
            <Profile></Profile>
          </AdminRoute>
        ),
      },
      {
        path: "admin/admin-home",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-tasks",
        element: (
          <AdminRoute>
            <ManageTasks></ManageTasks>
          </AdminRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
