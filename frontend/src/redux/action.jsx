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

let getEventsData = (setFilterData, filterData) => async (dispatch) => {
  dispatch(get_events_request());
  await axios
    .get("http://localhost:8000/api/events")
    .then((res) => {
      console.log(res.data);
      filterData = res.data;
      setFilterData(filterData);

      dispatch(get_events_success(filterData));
    })
    .catch((e) => {
      console.log(e);
      dispatch(get_events_failure(e));
    });
};

export {
  get_events_failure,
  get_events_success,
  get_events_request,
  getEventsData,
};
