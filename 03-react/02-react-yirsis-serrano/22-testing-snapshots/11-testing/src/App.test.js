import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// const linkElement = screen.getByText(/learn react/i);
test("renders learn react link", () => {
  render(<App />);
  expect(screen.getByRole("app")).toMatchSnapshot();
  // const linkElement = screen.getByText("Counter: 0");
  // expect(linkElement).toBeInTheDocument();
});
