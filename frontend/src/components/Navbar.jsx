import "./Navbar.css";
import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  let { user, logout } = useAuth();
  let { token } = user || "";

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
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
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            {token ? (
              <NavLink onClick={logout}>Logout</NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export { Navbar };
