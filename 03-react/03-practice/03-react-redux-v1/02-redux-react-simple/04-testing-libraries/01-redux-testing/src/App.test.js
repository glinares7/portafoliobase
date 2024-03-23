import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { store } from "./index";
import { App } from "./App";

test("renders learn react link", () => {
    render(
        <Provider store={store}>
            <App ownProps="foo" />
        </Provider>
    );

    //   const linkElement = screen.getByText(/learn react/i);
    //   expect(linkElement).toBeInTheDocument();
});
