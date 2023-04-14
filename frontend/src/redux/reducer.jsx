import * as types from "./actionTypes";

let initialState = {
  events: [],
  singleEvent: {},
  requests: {},
};

let reducer = (oldState = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case types.Get_Events_Request:
      return {
        ...oldState,
      };
    case types.Get_Events_Success:
      return {
        ...oldState,
        events: payload,
      };
    case types.Get_Events_Failure:
      return {
        ...oldState,
      };
    case types.Get_Single_Event_Request:
      return {
        ...oldState,
      };
    case types.Get_Single_Event_Success:
      return {
        ...oldState,
        singleEvent: payload,
      };
    case types.Get_Single_Event_Failure:
      return {
        ...oldState,
      };
    case types.User_requests:
      return {
        ...oldState,
        requests: payload,
      };
    default:
      return oldState;
  }
};

export { reducer };
