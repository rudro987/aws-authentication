import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import MainLayout from "../Layout/MainLayout";
import UserProfile from "../Pages/UserProfile";
import Login from "../Pages/Login";
import Register from "../Pages/Register"
import Validations from "../Pages/Validations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:  <div>Error</div>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/profile",
        element: <UserProfile />
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/validations",
        element: <Validations></Validations>
      }
    ]
  },
]);

export default router;
