import React, { useState } from "react";
import Cookies from "js-cookie";

const Room = () => {
  let localAccepted = JSON.parse(localStorage.getItem("accepted"));
  let [room, setRoom] = useState(localAccepted);
  console.log(room);
  let username = Cookies.get("username");
  let user = Cookies.get("user");

  return (
    <div>
      <h2> Hey! {username}, these are the players in the room.....</h2>

      <table>
        <thead>
          <tr style={{ backgroundColor: "#454545" }}>
            <th>Event</th>
            <th>Players</th>
          </tr>
        </thead>
        <tbody>
          {room
            ?.filter((el) => {
              return el.status == "accepted";
            })
            .map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.username}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export { Room };
