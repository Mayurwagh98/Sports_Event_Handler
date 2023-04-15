import React from "react";
import "./RequestsPage.css";
import { useSelector } from "react-redux";
import Cookies from "cookies-js";

const RequestsPage = () => {
  let localReq = JSON.parse(localStorage.getItem("requests"));
  console.log(localReq);

  let user = Cookies.get("user");

  let handleAccept = (item) => {
    item.status = "accepted";
    localStorage.setItem("requests", JSON.stringify(localReq));
  };

  return (
    <div>
      <h1>Requests</h1>
      <table>
        <thead>
          <tr>
            <td>Username</td>
            <td>User</td>
            <td>Event Title</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {localReq
            ?.filter((el) => {
              return user == el.userID;
            })
            .map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.user}</td>
                  <td>{item.title}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleAccept(item), alert("Request accepted");
                      }}
                    >
                      Accept
                    </button>
                  </td>
                  <td>
                    <button>Reject</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export { RequestsPage };
