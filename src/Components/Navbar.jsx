import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOutUser();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully",
      })
      .then(() => {
        navigate("/");
      })
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex gap-5">
        {user ? (
          <a className="btn btn-info" onClick={handleLogOut}>
            Logout
          </a>
        ) : (
          <>
            <Link to="/login">
              <a className="btn btn-warning">Login</a>
            </Link>
            <Link to="/register">
              <a className="btn btn-accent">Register</a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
