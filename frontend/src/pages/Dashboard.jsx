import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import Cookies from "cookies-js";
import { getEventsData } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { CreateEvent } from "../components/CreateEvent";

const Dashboard = () => {
  let { events } = useSelector((store) => store);

  let [searchTerm, setSearchTerm] = useState("");

  let [filterData, setFilterData] = useState(events);
  let navigate = useNavigate();

  let dispatch = useDispatch();
  let user = Cookies.get("user");
  let username = Cookies.get("username");

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
    dispatch(getEventsData(setFilterData, filterData));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //  ----------- filter ------------
  let handleFilter = (event) => {
    let option = event.target.value;
    let newData;
    if (option == "Football") {
      newData = events.filter((item) => {
        return item.title == "Football";
      });
      setFilterData(newData);
      console.log(newData);
    } else if (option == "Baseball") {
      newData = events.filter((item) => {
        return item.title == "Baseball";
      });
      setFilterData(newData);
      console.log(newData);
    } else if (option == "") {
      setFilterData(events);
    } else if (option == "Golf") {
      newData = events.filter((item) => {
        return item.title == "Golf";
      });
      setFilterData(newData);
    } else if (option == "Cricket") {
      newData = events.filter((item) => {
        return item.title == "Cricket";
      });
      setFilterData(newData);
    }
  };

  return (
    <div>
      <div className="heading_create_div">
        <h3>Welcome back {username}, this are the events</h3>

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
      </div>

      {/* ---------- search div ----------- */}
      <div className="search_div">
        <div>
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
              <option value="Football">Football</option>
              <option value="Baseball">Baseball</option>
              <option value="Cricket">Cricket</option>
              <option value="Golf">Golf</option>
              {/* {events.map((item, index) => {
                return (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                );
              })} */}
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
                <img src={item.image} />
                <h3>Title:- {item.title}</h3>
                {/* <p>UserID:- {item.userID}</p> */}
                <p>Timing:- {item.timing}</p>
                <p>{item.description}</p>

                <Button
                  type="primary"
                  onClick={() => navigate(`/eventdetails/${item._id}`)}
                >
                  Details
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export { Dashboard };
