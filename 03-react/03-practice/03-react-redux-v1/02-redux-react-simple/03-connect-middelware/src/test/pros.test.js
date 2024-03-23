import { addUser } from "../App";
import { render, screen } from "@testing-library/react";
import AppRouter from "../routers/AppRouter";
test("ADD_TODO action creator", () => {
  render(<AppRouter />);
});
