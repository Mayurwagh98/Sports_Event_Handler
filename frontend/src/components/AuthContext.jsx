import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext("");

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  
  let cookiesToken = Cookies.get("token")
  

  const [user, setUser] = useState({
    isAuth: false,
    loading: false,
    error: null,
    token: cookiesToken || "" ,
  });
  // console.log("user:", user);

  const login = async (loginUserData) => {
    // setUser(user);

    let newData = { ...user, loading: true };
    setUser({ ...newData });

    //   const res = await axios.post(`https://reqres.in/api/login`, userData);
    await axios
    //   .post("http://localhost:8000/api/login", loginUserData)
      .post("https://take4.onrender.com/api/login", loginUserData)
      .then((res) => {
        console.log(res.data);
        Cookies.set("token", res.data.token);
        Cookies.set("user", res.data.userId);
        Cookies.set("username", res.data.name);
        // alert(res.data.message);

        newData = {
          ...user,
          loading: false,
          isAuth: true,
          token: res.data.token,
        };
        setUser(newData);

        setTimeout(() => {
          // console.log(user, newData)
          navigate("/");
        }, 1500);
        
      })
      .catch((e) => {
        // console.log(e);
        newData = { ...user, loading: false, error: e };
        setUser({ ...newData });
        alert(e.response.data.message);
      });
    // console.log("res:", res.data);

    //   localStorage.setItem("userToken", JSON.stringify(res.data.token));
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
