import React, { useState } from "react";
import axios from "axios";
import "./CreateEvent.css";
import { Input } from "antd";

const CreateEvent = () => {
  let [text, setText] = useState({
    title: "",
    description: "",
    timing: "12:00 - 13:00 PM",
    number_of_players_limit: "",
  });

  let handleCreate = async () => {
    await axios
      .post("http://localhost:8000/api/events/create", text)
      .then((res) => console.log(res.data))
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
        <Input
          type="text"
          placeholder="Enter title of the event"
          name="title"
          value={text.title}
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
          {/* <option value=""></option> */}
        </select>

        <Input
          type="text"
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
