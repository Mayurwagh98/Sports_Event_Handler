import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../components/AuthContext";

const Login = () => {
  let [loginUserData, setLoginUserData] = useState({
    username: "",
    password: "",
  });

  const { login } = useAuth();
  let navigate = useNavigate();

  let handleLogin = (event) => {
    let { name, value } = event.target;

    setLoginUserData({
      ...loginUserData,
      [name]: value,
    });
  };

  let funCB = (data) => {
    // this functions works only if it gets response from the api

    if (data.token) {
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="login_form">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Enter your username"
          name="username"
          value={loginUserData.username}
          onChange={handleLogin}
        />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={loginUserData.password}
          onChange={handleLogin}
        />
        <input
          type="submit"
          value="Login"
          onClick={() => login({ ...loginUserData, funCB })}
          className="submit_input"
          style={{
            backgroundColor: "#5D9C59",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        />
        <div>
          Don't have an account?{" "}
          <Link to="/signup" className="login_link">
            <span>Register</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export { Login };
