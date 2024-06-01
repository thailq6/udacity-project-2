import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import NewPoll from "./NewPoll";

describe("NewPoll", () => {
    it("should render the component", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll />
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("should handle input changes correctly", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll />
                </BrowserRouter>
            </Provider>
        );

        const firstOptionInputElement = component.getByTestId("firstOption");
        const secondOptionInputElement = component.getByTestId("secondOption");
        fireEvent.change(firstOptionInputElement, { target: { value: 'test first' } });
        fireEvent.change(secondOptionInputElement, { target: { value: 'test second' } });
        
        expect(firstOptionInputElement.value).toBe("test first");
        expect(secondOptionInputElement.value).toBe("test second");
    });

    it("should submit the form correctly", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll />
                </BrowserRouter>
            </Provider>
        );

        const submitButtonElement = component.getByTestId("submit-poll");
        fireEvent.click(submitButtonElement);
        // Additional assertions can be added here to verify the navigation or the action dispatch
    });
});
