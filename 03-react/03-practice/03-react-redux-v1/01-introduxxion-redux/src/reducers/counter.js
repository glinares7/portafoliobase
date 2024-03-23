//* reducer

import * as types from "../types/types";

const initialState = {
  count: 0,
};

export const counter = (state = initialState, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case types.RESET:
      return action.payload;
    default:
      return state;
  }
};
