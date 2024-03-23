// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import { render, screen } from "@testing-library/react";

import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import configureMockStore from "redux-mock-store";
import App, { addUser, oldReset, increment, reset } from "./App";
import { contador, initialState, old, usuario } from "./reducers/authReducers";
import { logger, rootCounter } from "./store/authStore";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Testpage Component", () => {
  test("la vida es una sola", () => {
    expect(
      <Provider store={store}>
        <App searchText="foo" />
      </Provider>
    );
  });

  // * ACTIONS

  test("INCREMENT()", () => {
    const action = increment();

    expect(action.type).toEqual("INCREMENT");
  });

  test("RESET()", () => {
    const payload = { count: 0 };
    const action = reset();

    const esperado = { type: "RESET", payload: { count: 0 } };

    expect(action).toEqual(esperado);
    expect(action.type).toEqual("RESET");
    expect(action.payload).toEqual(payload);
  });

  test("ADD_USER()", () => {
    const actionName = "ADD_USER";
    const action = addUser(actionName);

    expect(action.type).toEqual("ADD_USER");
    expect(action.payload).toEqual(actionName);
  });
});

describe("Testing Trror", () => {
  test("allError", () => {
    const err = new Error("some error");
    const action = oldReset(err);

    expect(action.type).toEqual("OLD_RESET");
    expect(action.error).toBe(true);
    expect(action.payload).toEqual(err);
  });
});

// * REDUCERS
describe("Integration test", () => {
  describe("contadorReduxer", () => {
    test("increment ", () => {
      const action = increment();
      const result = contador(initialState, action);

      expect(result.count).toBe(initialState.count + 1);
    });

    test("reset", () => {
      const action = reset();
      const result = contador(initialState, action);

      expect(action.payload.count).toBe(0);
      expect(result).toEqual({ count: 0 });
    });
  });

  describe("usuario reducer", () => {
    test("addUser", () => {
      const state = [1, 2, 5];
      const action = addUser("todo");
      const result = usuario(state, action);

      expect(action.payload).toBe("todo");
      expect(result).toEqual([...state, "todo"]);
    });
  });

  describe("old Reducers", () => {
    test("old_Reset", () => {
      const username = "todo";
      const state = [1, 2, 5];
      const action = oldReset(username);
      const result = old(state, action);

      expect(action.payload).toBe(username);
      expect(result).toEqual([...state, "todo"]);
    });
  });
});

//* MIDDLEWARE

describe("integration middleware", () => {
  test("middleware logger", () => {
    // const func = logger(action);

    const result = createStore(
      rootCounter,
      composeWithDevTools(applyMiddleware(logger))
    );
    // const state = 1, 2, 5;
    const username = "jose";
    const oldRes = 13;
    const action = addUser(username);

    result.dispatch(action);
    result.dispatch(increment());
    result.dispatch(oldReset(oldRes));

    // console.log("es aqui", result.dispatch(increment()));

    //* middleware esta entre el action y el reducer

    const stat = result.getState();
    const sperado = {
      contador: { count: 11 },
      usuario: [username],
      old: [oldRes],
    };
    expect(stat).toEqual(sperado);
  });
});

// test("renders learn react link", () => {
//   render(
//     <Provider store={store}>
//       <App searchText="foo" />
//     </Provider>
//   );
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });

// https://stackoverflow.com/questions/36211739/invariant-violation-could-not-find-store-in-either-the-context-or-props-of-c
