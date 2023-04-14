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
  let [filterData, setFilterData] = useState(events);

  let dispatch = useDispatch();

  // useEffect(() => {
  //   if (location || events.length === 0) {
  //     let Title = searchParams.getAll("Title");
  //     let queryParams = {
  //       params: {
  //         title: Title,
  //       },
  //     };

  //     dispatch(getEventsData(queryParams));
  //   }
  // }, [location.search]);
  useEffect(() => {
    dispatch(getEventsData(setFilterData, filterData));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(getEventsData);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //  ----------- filter ------------
  let handleFilter = (event) => {
    let option = event.target.value;
    let newData;
    if (option == "football") {
      newData = events.filter((item) => {
        return item.title == "Football";
      });
      setFilterData(newData);
      console.log(newData);
    } else if (option == "baseball") {
      newData = events.filter((item) => {
        return item.title == "Baseball";
      });
      setFilterData(newData);
      console.log(newData);
    } else if (option == "") {
      setFilterData(events);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* ------ create event modal -------------- */}
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
      {/* ---------- search div ----------- */}
      <div className="search_div">
        <div >
          <h4 style={{ marginTop: "10px" }}>Search an event by title</h4>
          <input
            type="text"
            placeholder="Search for an event"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search"
          />
        </div>
        {/* -------- filter ------------- */}
        <div>
          <h4>Filter by title</h4>
          <div className="filter_shop_div">
            <select onChange={handleFilter} className="filter_options">
              <option value="">Default</option>
              <option value="football">Football</option>
              <option value="baseball">Baseball</option>
            </select>
          </div>
        </div>
      </div>
      <div className="main_events_div">
        {filterData
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
                <button>Join Event</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export { Dashboard };
