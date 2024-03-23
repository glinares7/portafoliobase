import { render, screen } from "@testing-library/react";
import ButtonCounter from "./ButtonCounter";
describe("<ButtonCounter/>", () => {
  const action = jest.fn();

  beforeEach(() => {
    render(<ButtonCounter value={3} name="aumentar" action={action} />);
  });

  it("crea un botton correctamente", () => {
    // render(<ButtonCounter value={3} name="aumentar" action={action} />);
    expect(screen.getByLabelText("aumentar")).toBeInTheDocument();
  });
  // it("crea un botton correctamente sin mandar value", () => {
  //   render(<ButtonCounter name="aumentar" action={action} />);
  //   expect(screen.getByLabelText("aumentar")).toBeInTheDocument();
  // });

  it("crea un botton correctamente", () => {
    // render(<ButtonCounter value={3} name="aumentar" action={action} />);
    expect(screen.getByLabelText("aumentar")).toMatchSnapshot();
  });
});
