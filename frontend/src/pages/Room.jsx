import React, { useState } from "react";
import Cookies from "cookies-js";

const Room = () => {
  let localReq = JSON.parse(localStorage.getItem("requests"));
  console.log(localReq);

  let [room, setRoom] = useState(localReq);
  let username = Cookies.get("username");
  let user = Cookies.get("user");

  return (
    <div>
      <h1> {username}, Room</h1>

      {room
        ?.filter((el) => {
          return el.status == "accepted";
        })
        .map((item, index) => {
          return (
            <div>
              <h2>{item.title}</h2>
              <h2>{item.status}</h2>
            </div>
          );
        })}
    </div>
  );
};

export { Room };
