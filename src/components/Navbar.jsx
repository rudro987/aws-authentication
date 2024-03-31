import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
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
        </ul>
      </div>
      <div className="navbar-end gap-5">
        <Link to="/login"><button className="btn btn-warning">Login</button></Link>
        <Link to="/register"><button className="btn btn-accent">Register</button></Link>
        <button className="btn btn-secondary">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
