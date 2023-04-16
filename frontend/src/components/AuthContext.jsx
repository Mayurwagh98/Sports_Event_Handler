import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext("");

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();

  let cookiesToken = Cookies.get("token");

  const [user, setUser] = useState({
    isAuth: false,
    loading: false,
    error: null,
    token: cookiesToken || "",
  });



  const login = async (loginUserData) => {
    let { username, password, funCB } = loginUserData;
    let payload = { username, password };

    let newData = { ...user, loading: true };
    setUser({ ...newData });

    await axios
      //.post("http://localhost:8000/api/login", loginUserData)
      .post("https://take4.onrender.com/api/login", payload)
      .then((res) => {
        console.log(res.data);
        Cookies.set("token", res.data.token);
        Cookies.set("user", res.data.userId);
        Cookies.set("username", res.data.name);
        alert(res.data.message);

        funCB && funCB(res.data); // standard solution works even if network is slow

        newData = {
          ...user,
          loading: false,
          isAuth: true,
          token: res.data.token,
        };
        setUser(newData);
      })
      .catch((e) => {
        // console.log(e);
        newData = { ...user, loading: false, error: e };
        setUser({ ...newData });
        alert(e.response.data.message);
        funCB && funCB(e.message);
      });
  };

  const logout = () => {
    setUser({
      isAuth: false,
      loading: false,
      error: null,
      token: "",
    });

    Cookies.remove("token");

    alert("Logged out!");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
