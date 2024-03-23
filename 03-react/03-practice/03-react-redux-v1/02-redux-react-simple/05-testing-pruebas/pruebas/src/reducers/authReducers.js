export const initialState = {
  count: 10,
};
//* reducer
export function contador(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return action.payload;
    default:
      return state;
  }
}

export const usuario = (state = [], action) => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.payload];

    default:
      return state;
  }
};

export const old = (state = [], action) => {
  switch (action.type) {
    case "OLD_RESET":
      return [...state, action.payload];
    default:
      return state;
  }
};
