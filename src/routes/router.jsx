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
import DashboardHome from "../pages/Dashboard/buyer/DashboardHome";
import PurchaseCoin from "../pages/Dashboard/buyer/PurchaseCoin";
import Checkout from "../pages/Dashboard/buyer/Checkout";
import PaymentHistory from "../pages/Dashboard/buyer/PaymentHistory";
import TaskList from "../pages/Dashboard/worker/TaskList";
import TaskDetails from "../pages/Dashboard/worker/TaskDetails";
import MySubmissions from "../pages/Dashboard/worker/MySubmissions";
import Withdraw from "../pages/Dashboard/worker/Withdraw";

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
        path: "/dashboard",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "buyer/buyer-home",
        
      },

      {
        path: "buyer/add-task",
        element: <AddTask></AddTask>
      },
      {
        path: "buyer/my-tasks",
        element:<MyTask></MyTask>
      },
      {
        path: "buyer/purchase-coin",
        element: <PurchaseCoin></PurchaseCoin>
      }, 
      {
        path: "buyer/checkout",
        element: <Checkout></Checkout>
      },
      {
        path: "buyer/payment-history",
        element:<PaymentHistory></PaymentHistory>
      },
     
      // Worker 
      {
        path: "worker/worker-home",
        
      },
      {
        path: "worker/task-list",
        element: <TaskList></TaskList>
      },
      {
        path: "worker/task-details/:id",
        element:<TaskDetails></TaskDetails>,
        loader: ({ params }) => fetch(    `http://localhost:5000/task-details/${params.id}`),
      },
      {
        path: "worker/my-submissions",
        element: <MySubmissions></MySubmissions>
      },
      {
        path: "worker/withdrawals",
        element:<Withdraw></Withdraw>
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

