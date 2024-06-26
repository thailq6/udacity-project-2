import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store";
import {BrowserRouter} from "react-router-dom";
import {loginAuthenticatedUser} from "./actions/authedEmployee";

describe("App", () => {
    it("Should render the components", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("Should show Login page when not logged in", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        const heading = component.getByTestId("login-heading");
        expect(heading).toBeInTheDocument();
    });

    it("Should show Dashboard page after logged in", () => {
        store.dispatch(loginAuthenticatedUser({id: "", password: ""}));

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );

        const heading = component.getByTestId("dashboard");
        expect(heading).toBeInTheDocument();
    });
});
