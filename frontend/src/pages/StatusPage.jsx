import React, { useState } from "react";
import Cookies from "cookies-js";

const StatusPage = () => {
  let localReq = JSON.parse(localStorage.getItem("requests"));
  //   console.log(localReq);
  let [acceptedReq, setAcceptedReq] = useState(localReq);
  console.log(acceptedReq);
  let user = Cookies.get("user");
  let username = Cookies.get("username");

  return (
    <div>
      <h3>Hi {username}, Status of your requests....</h3>
      <table>
        <thead>
          <tr>
            <td>Event Title</td>
            <td>Description</td>
            <td>Timing</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {acceptedReq
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