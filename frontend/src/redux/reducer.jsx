import * as types from "./actionTypes";

let initialState = {
  events: [],
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
    default:
      return oldState;
  }
};

export { reducer };
