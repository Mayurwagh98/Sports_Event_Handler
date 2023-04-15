import React, { useState } from "react";
import Cookies from "js-cookie";
import "./StatusPage.css";

const StatusPage = () => {
  let localReq = JSON.parse(localStorage.getItem("requests"));
  //   console.log(localReq);
  let [acceptedReq, setAcceptedReq] = useState(localReq);
  // console.log(acceptedReq);
  let user = Cookies.get("user");
  let username = Cookies.get("username");

  return (
    <div>
      <h3>Hi {username}, Status of your requests....</h3>
      <table className="status_table">
        <thead className="status_thead">
          <tr style={{ backgroundColor: "#454545" }}>
            <th>Event Title</th>
            <th>Description</th>
            <th>Timing</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="status_tbody">
          {localReq
            ?.filter((el) => {
              return user !== el.userID;
            })
            .map((item, index) => {
              return (
                <tr
                  key={index}
                  style={{
                    backgroundColor:
                      item.status == "accepted" ? "lightgreen" : "yellow",
                  }}
                >
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.timing}</td>
                  <td>{item.status}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export { StatusPage };
