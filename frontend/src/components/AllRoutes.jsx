import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";
import { EventDetails } from "../pages/EventDetails";
import { RequestsPage } from "../pages/RequestsPage";
import { StatusPage } from "../pages/StatusPage";
import { Room } from "../pages/Room";
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext";

let AllRoutes = () => {
  // let user = Cookies.get("user");

  let { user } = useAuth();
  let { token } = user || "";

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/eventdetails/:_id"
        element={token ? <EventDetails /> : <Navigate to="/login" />}
      />
      <Route
        path="/requests"
        element={token ? <RequestsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/status"
        element={token ? <StatusPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/room"
        element={token ? <Room /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export { AllRoutes };
