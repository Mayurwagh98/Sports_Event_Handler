import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  let [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  let handleForm = (event) => {
    let { name, value } = event.target;

    setSignupData({
      ...signupData,
      [name]: value,
    });
  };
  let funCB = (data) => {
    // this functions works only if it gets response from the api
    if (data.token) {
      navigate("/login");
    }
  };
  let signupUser = async () => {
    await axios
      // .post("http://localhost:8000/api/signup", signupData)
      .post("https://take4.onrender.com/api/signup", signupData)
      .then((res) => {
        alert(res.data.message);
        funCB && funCB(res.data);
        // setTimeout(() => {
        //   navigate("/login");
        // }, 1200);
      })
      .catch((e) => {
        console.log(e.message);
        funCB && funCB(e.message);
      });
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="signup_form">
        <h1>Signup</h1>
        <input
          type="text"
          placeholder="Enter your name"
          name="username"
          value={signupData.username}
          onChange={handleForm}
        />
        <input
          type="text"
          placeholder="Enter your email"
          name="email"
          value={signupData.email}
          onChange={handleForm}
        />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={signupData.password}
          onChange={handleForm}
        />
        <input
          type="submit"
          value="Register"
          onClick={signupUser}
          className="submit_input"
          style={{
            backgroundColor: "#5D9C59",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        />
        <div>
          Already have an account?{" "}
          <Link to="/login" className="login_link">
            <span>Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export { Signup };
