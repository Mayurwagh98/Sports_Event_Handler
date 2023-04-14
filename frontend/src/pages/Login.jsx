import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "cookies-js";

const Login = () => {
  let [loginUserData, setLoginUserData] = useState({
    username: "",
    password: "",
  });

  let navigate = useNavigate();

  let loginUser = async () => {
    await axios
      .post("http://localhost:8000/api/login", loginUserData)
      .then((res) => {
        console.log(res.data);
        Cookies.set("token", res.data.token);
        Cookies.set("user", res.data.userId);
        alert(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1200);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  let handleLogin = (event) => {
    let { name, value } = event.target;

    setLoginUserData({
      ...loginUserData,
      [name]: value,
    });
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
          onClick={loginUser}
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
