import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";
import { EventDetails } from "../pages/EventDetails";
import { RequestsPage } from "../pages/RequestsPage";
import { StatusPage } from "../pages/StatusPage";
import { Room } from "../pages/Room";
import Cookies from "cookies-js";

let AllRoutes = () => {
  let user = Cookies.get("user");

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/eventdetails/:_id"
        element={user ? <EventDetails /> : <Navigate to="/login" />}
      />
      <Route
        path="/requests"
        element={user ? <RequestsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/status"
        element={user ? <StatusPage /> : <Navigate to="/login" />}
      />
      <Route path="/room" element={<Room />} />
    </Routes>
  );
};

export { AllRoutes };
