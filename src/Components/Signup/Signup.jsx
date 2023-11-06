import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Axios";
const Signup = ({setuser}) => {
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("runninf");
    const res = await axios.post("/signup", {
      fullname: e.target.fullname.value,
      fathername: e.target.fathername.value,
      email: e.target.email.value,
      number: e.target.number.value,
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
      <form onSubmit={handleSignup} className="Signup-box">
        <h2>Signup</h2>
        <div className="inp-cnt">
          <label htmlFor="">Full Name</label>
          <input type="text" name="fullname" placeholder="John" id="" />
        </div>
        <div className="inp-cnt">
          <label htmlFor="">Father Name</label>
          <input type="text" name="fathername" placeholder="doe" id="" />
        </div>
        <div className="inp-cnt">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            placeholder="johndoe@gmail.com"
            id=""
          />
        </div>
        <div className="inp-cnt">
          <label htmlFor="">Phone Number: </label>
          <div className="phone-cnt">
            <select name="country" id="">
              <option value="+91">+91</option>
            </select>
            <input type="text" name="number" placeholder="123456789" id="" />
          </div>
        </div>
        <div className="inp-cnt">
          <label htmlFor="">Password</label>
          <input type="text" name="password" placeholder="123456789" id="" />
        </div>
        <button type="submit">Signup</button>
        <Link to="/">Already a member? Login</Link>
      </form>
    </div>
  );
};

export default Signup;
