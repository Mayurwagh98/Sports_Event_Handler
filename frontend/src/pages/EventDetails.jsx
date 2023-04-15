import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEventData, userJoiningRequest } from "../redux/action";
import { Button, Modal, Result, Progress, Space } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./EventDetails.css";
// import { userJoiningRequest } from "../redux/action";
import { Timer } from "./Timer";

const EventDetails = () => {
  let { _id } = useParams();
  let { singleEvent } = useSelector((store) => store);
  let count = Math.round(Math.random() * singleEvent.number_of_players_limit);
  let [countReq, setCountReq] = useState(0);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let user = Cookies.get("user");
  let username = Cookies.get("username");
  let localReq = JSON.parse(localStorage.getItem("requests")) || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getSingleEventData(_id));
  }, []);

  // -------- join modal ----------
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let handleJoin = () => {
    if (count < singleEvent.number_of_players_limit) {
      setCountReq((prev) => prev + 1);

      showModal();
      let status = "Requested";
      singleEvent = { ...singleEvent, user, status, username };
      localReq.push(singleEvent);
      localStorage.setItem("requests", JSON.stringify(localReq));
    } else {
      alert("limit exceded");
    }
  };

  return (
    <div>
      <h1>Event details</h1>
      <div className="main_event_details_div">
        <img src={singleEvent.image} alt="event poster" />
        <div>
          <h2>Title:- {singleEvent.title}</h2>
          <p>Description:- {singleEvent.description}</p>
          <p>Timing:- {singleEvent.timing}</p>
          <p>Players Limit:- {singleEvent.number_of_players_limit}</p>
          <p>Players Joined:- {count}</p>

          {user !== singleEvent.userID ? (
            <Button
              type="primary"
              onClick={handleJoin}
              disabled={countReq == 1}
            >
              Join Event
            </Button>
          ) : (
            <p>
              Event Time:- <Timer />
            </p>
          )}
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Result
              status="success"
              title="Request Sent!"
              extra={[
                <Button
                  type="primary"
                  key="console"
                  onClick={() => navigate("/")}
                >
                  Go to Home
                </Button>,
              ]}
            />
          </Modal>
        </div>

        {/* <button onClick={() => dispatch(userJoiningRequest(user))}>join</button> */}
      </div>
    </div>
  );
};

export { EventDetails };
