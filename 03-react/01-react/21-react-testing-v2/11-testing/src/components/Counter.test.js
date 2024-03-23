import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";
import userEvent from "@testing-library/user-event";

//* agrupador de pruebas
describe("<Counter />", () => {
  test("Prueba de que el titulo y el estado se renderiza corectamente", () => {
    render(<Counter />);
    //*   macher esperas que ocurra
    //* valor actual
    // expect(wrapper.getByText("Counter: 0").tagName).toBe("H2");
    expect(screen.getByText("Counter: 0").tagName).toBe("H2");
  });

  it("Verificar que el click + 1 aumente corectamente", () => {
    render(<Counter />);

    fireEvent.click(screen.getByLabelText("aumentar"));

    expect(screen.getByRole("counter").textContent).toContain("Counter: 1");
    // console.log(screen.getByText("+1").tagName);
  });

  it("Verificar que el click -1 disminuya corectamente", () => {
    render(<Counter />);

    // textField."adivinando"

    // userEvent

    userEvent.click(screen.getByLabelText("disminuir"));

    expect(screen.getByRole("counter").textContent).toContain("Counter: -1");
    // expect(screen.getByTestId("counter").textContent).toContain("Counter: 1");
    // console.log(screen.getByText("+1").tagName);
  });
  //   it("Prueba que 1 + 1 es 2 y no es 3", () => {
  //     expect(1 + 1).toBe(2);
  //     expect(1 + 1).not.toBe(3);
  //   });

  it("Simular que alguien este usando la app", () => {
    render(<Counter />);

    const btnAdd = screen.getByLabelText("aumentar");
    const btnDis = screen.getByLabelText("disminuir");

    userEvent.click(btnAdd);
    userEvent.click(btnAdd);
    userEvent.click(btnAdd);
    userEvent.click(btnAdd);
    userEvent.click(btnAdd);
    userEvent.click(btnAdd);
    userEvent.click(btnAdd);

    expect(screen.getByRole("counter").textContent).toContain("Counter: 7");

    userEvent.click(btnDis);
    userEvent.click(btnDis);
    userEvent.click(btnDis);
    userEvent.click(btnDis);
    userEvent.click(btnDis);
    userEvent.click(btnDis);
    userEvent.click(btnDis); //0
    userEvent.click(btnDis);
    userEvent.click(btnDis);
    userEvent.click(btnDis);
    userEvent.click(btnDis);

    expect(screen.getByRole("counter").textContent).toContain("Counter: -4");
  });
});
