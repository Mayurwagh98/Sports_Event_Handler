import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEventData } from "../redux/action";
import { Button } from "antd";
import Cookies from "cookies-js";
// import { userJoiningRequest } from "../redux/action";

const EventDetails = () => {
  let { _id } = useParams();

  let { singleEvent } = useSelector((store) => store);

  let count = Math.round(Math.random() * singleEvent.number_of_players_limit);
  let [countReq, setCountReq] = useState(0);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleEventData(_id));
  }, []);

  let user = Cookies.get("user");
  let localReq = JSON.parse(localStorage.getItem("requests")) || [];

  let handleJoin = () => {
    if (count < singleEvent.number_of_players_limit) {
      setCountReq((prev) => prev + 1);

      for (let x of localReq) {
        if (x._id == singleEvent._id) {
          return alert("Request already sent");
        }
      }
      //   alert("request sent");
      singleEvent = {...singleEvent, user}
      localReq.push(singleEvent);
      localStorage.setItem("requests", JSON.stringify(localReq));
    } else {
      alert("limit exceded");
    }
  };

  return (
    <div>
      <h1>Event details</h1>
      <div>
        <h2>Title:- {singleEvent.title}</h2>
        <p>Description:- {singleEvent.description}</p>
        <p>Timing:- {singleEvent.timing}</p>
        <p>Players Limit:- {singleEvent.number_of_players_limit}</p>
        <p>Players Joined:- {count}</p>
        <Button type="primary" onClick={handleJoin} disabled={countReq == 1}>
          Request to Join
        </Button>
      </div>
    </div>
  );
};

export { EventDetails };
