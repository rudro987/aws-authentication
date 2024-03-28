import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Contact from "../Pages/Contact";
import Validations from "../Pages/Validations";



const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <div>Error</div>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/register",
            element: <Register></Register>
        },
        {
            path: "/contact",
            element: <Contact></Contact>
        },
        {
            path: "/validations",
            element: <Validations></Validations>
        },

      ]
    },
  ]);

export default router