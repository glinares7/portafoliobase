import { authTypes } from "../type/authTypes";

export const authReducer = (state, action) => {
  switch (action.type) {
    case authTypes.login:
      return { log: true };

    case authTypes.logout:
      return {
        log: false,
      };
    default:
      return state;
  }
};
