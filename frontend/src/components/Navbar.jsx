import "./Navbar.css";
import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from "cookies-js";

const Navbar = () => {
  let user = Cookies.get("user");
  let username = Cookies.get("username");

  return (
    <>
      <nav>
        <ul>
          <li style={{ color: "white" }}>{username}</li>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>

          <li>
            <NavLink to="/requests">Requests</NavLink>
          </li>

          <li>
            <NavLink to="/status">Status</NavLink>
          </li>
          <li>
            <NavLink to="/room">Event Room</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export { Navbar };