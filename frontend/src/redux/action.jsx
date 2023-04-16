import * as types from "./actionTypes";
import axios from "axios";

let get_events_request = () => {
  return {
    type: types.Get_Events_Request,
  };
};

let get_events_success = (payload) => {
  return {
    type: types.Get_Events_Success,
    payload,
  };
};

let get_events_failure = () => {
  return {
    type: types.Get_Events_Failure,
  };
};

let get_single_event_request = () => {
  return {
    type: types.Get_Single_Event_Request,
  };
};

let get_single_event_success = (payload) => {
  return {
    type: types.Get_Single_Event_Success,
    payload,
  };
};

let get_single_event_failure = () => {
  return {
    type: types.Get_Single_Event_Failure,
  };
};

let userJoiningRequest = (payload) => {
  return {
    type: types.User_requests,
    payload,
  };
};

let getEventsData = (setFilterData, filterData) => async (dispatch) => {
  dispatch(get_events_request());
  await axios
    // .get("http://localhost:8000/api/events")
    .get("https://take4.onrender.com/api/events")
    .then((res) => {
      // console.log(res.data);
      filterData = res.data;
      setFilterData(filterData);

      dispatch(get_events_success(filterData));
    })
    .catch((e) => {
      console.log(e);
      dispatch(get_events_failure(e));
    });
};

let getSingleEventData = (_id) => async (dispatch) => {
  dispatch(get_single_event_request());
  await axios
    // .get(`http://localhost:8000/api/events/${_id}`)
    .get(`https://take4.onrender.com/api/events/${_id}`)
    .then((res) => {
      // console.log(res.data);
      dispatch(get_single_event_success(res.data));
    })
    .catch((e) => {
      // console.log(e);
      dispatch(get_single_event_failure(e));
    });
};

export {
  get_events_failure,
  get_events_success,
  get_events_request,
  getEventsData,
  getSingleEventData,
  userJoiningRequest,
};
