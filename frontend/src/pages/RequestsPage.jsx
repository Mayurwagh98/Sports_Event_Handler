import React from "react";
import "./RequestsPage.css";

const RequestsPage = () => {
  let localReq = JSON.parse(localStorage.getItem("requests"));
  console.log(localReq);
  return (
    <div>
      <h1>Requests</h1>
      <table>
        <thead>
          <tr>
            <td>User</td>
            <td>Event Title</td>
          </tr>
        </thead>
        <tbody>
          {localReq.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.user}</td>
                <td>{item.title}</td>
                <button>Accept</button>
                <button>Reject</button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { RequestsPage };
