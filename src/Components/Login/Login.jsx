import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Axios";

const Login = ({ setuser }) => {
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await axios.post("/signup", {
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (res.data.user) {
      console.log(res.data);
      setuser(res.data.user);
      navigate("/");
    }
  };
  return (
    <div className="main">
      <form onSubmit={handleSignup} className="login-box">
        <h2>Login</h2>
        <div className="inp-cnt">
          <label htmlFor="">Email/Mobile</label>
          <input type="text" name="email" placeholder="John@gmail.com" id="" />
        </div>
        <div className="inp-cnt">
          <label htmlFor="">Password</label>
          <input type="text" name="password" placeholder="123123" id="" />
        </div>
        <button type="submit">Login</button>
        <Link to="/signup">Not a member? Signup</Link>
      </form>
    </div>
  );
};

export default Login;
