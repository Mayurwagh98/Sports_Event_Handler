import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
// import { Filter } from "../components/Filter";
import { Button, Modal } from "antd";

import { getEventsData } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { CreateEvent } from "../components/CreateEvent";

const Dashboard = () => {
  // let [events, setEvents] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");

  let { events } = useSelector((store) => store);

  let dispatch = useDispatch();

  // let getEvents = () => {};

  useEffect(() => {
    dispatch(getEventsData());
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(getEventsData());
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button type="primary" onClick={showModal}>
        Creat Event
      </Button>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CreateEvent />
      </Modal>
      {/* <Filter /> */}
      <div className="search_div">
        <h4 style={{ marginTop: "10px" }}>Search an event by title</h4>
        <input
          type="text"
          placeholder="Search for an event"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search"
        />
      </div>
      <div className="main_events_div">
        {events
          ?.filter((el) => {
            return el.title.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((item, index) => {
            return (
              <div key={index}>
                <h3>Title:- {item.title}</h3>
                <p>Description:- {item.description}</p>
                <p>Timing:- {item.timing}</p>
                <p>Number of Players:- {item.number_of_players_limit}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export { Dashboard };
