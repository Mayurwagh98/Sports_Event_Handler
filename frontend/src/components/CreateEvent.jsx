import React, { useState } from "react";
import axios from "axios";
import "./CreateEvent.css";
import { Input } from "antd";
import Cookies from "cookies-js";

const CreateEvent = () => {
  let [text, setText] = useState({
    title: "Football",
    image: "",
    description: "",
    timing: "12:00 - 13:00 PM",
    number_of_players_limit: "",
  });

  let cookieToken = Cookies.get("token");

  let handleCreate = async () => {
    let config = {
      headers: {
        authorization: `Bearer ${cookieToken}`,
      },
    };
    await axios
      .post("http://localhost:8000/api/events/create", text, config)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
      })
      .catch((e) => console.log(e.response?.data.message || e.message));
  };
  const { TextArea } = Input;
  let handleChange = (event) => {
    let { name, value } = event.target;
    setText({
      ...text,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="create_form">
        <h1>Post Your Event</h1>

        <select name="title" onChange={handleChange}>
          <option value="Football">Football</option>
          <option value="Baseball">Baseball</option>
          <option value="Cricket">Cricket</option>
          <option value="Golf">Golf</option>
          {/* <option value=""></option> */}
        </select>
        <Input
          type="text"
          placeholder="Enter event poster"
          name="image"
          value={text.image}
          onChange={handleChange}
        />
        <TextArea
          type="text"
          cols="30"
          rows="10"
          placeholder="Enter description of event"
          name="description"
          value={text.description}
          onChange={handleChange}
        />
        <select name="timing" onChange={handleChange}>
          <option value="12:00 - 13:00 PM">12:00 - 13:00 PM</option>
          <option value="10:00 - 11:00 AM">10:00 - 11:00 AM</option>
          <option value="15:00 - 16:00 AM">15:00 - 16:00 PM</option>
          <option value="18:00 - 19:00 AM">18:00 - 19:00 PM</option>
          {/* <option value=""></option> */}
        </select>

        <Input
          type="number"
          placeholder="Enter timing of number of players limit"
          name="number_of_players_limit"
          value={text.number_of_players_limit}
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Post Event"
          onClick={handleCreate}
          className="create_input"
          style={{
            border: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            color: "white",
            backgroundColor: "#2B3467",
          }}
        />
      </form>
    </div>
  );
};

export { CreateEvent };
