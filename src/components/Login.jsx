import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Link to="/">
        <button className="btn btn-success mb-20">Home</button>
      </Link>
      <div>Login</div>
    </>
  );
};

export default Login;
