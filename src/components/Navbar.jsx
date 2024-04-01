import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, loading, handleSignOut } = useAuth();

  const handleLogOut = async () => {
    const response = await handleSignOut();
    console.log("success: ", response);
  };

  return (
    <div className="navbar bg-base-100 pb-20">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">DocHouse</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/profile">UserProfile</NavLink>
          </li>
          <li>
            <NavLink to="/test">Test</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-5">
        {user ? (
          <button className="btn btn-secondary" onClick={handleLogOut}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-warning">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-accent">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
