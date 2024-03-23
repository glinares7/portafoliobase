import * as types from "../types/types";

export const increasValue = () => {
  return {
    type: types.INCREMENT,
  };
};

export const decreasValue = () => {
  return {
    type: types.DECREMENT,
  };
};
export const resetasValue = () => {
  return {
    type: types.RESET,
    payload: { count: 0 },
  };
};
