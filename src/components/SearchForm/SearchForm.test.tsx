import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchForm from "./SearchForm";
import { act } from "react-dom/test-utils";

describe("SearchForm component", () => {
  const onSubmit = jest.fn();

  const props = {
    onSubmit
  };

  test("renders correctly", () => {
    render(<SearchForm {...props} />);
    const pageTitle = screen.getByText("Search Form");
    expect(pageTitle).toBeInTheDocument();
  });

  test("it does not call onSubmit with an empty search term", () => {
    const { getByText } = render(
      <SearchForm {...props} />
    );
    const button = getByText("Search");
    fireEvent.click(button);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("it calls onSubmit on button click with the correct search term", () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchForm {...props} />
    );
    const input = getByPlaceholderText("Search");
    const button = getByText("Search");
    act(() => {
      fireEvent.change(input, { target: { value: "Beyonce" } });
    });
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledWith("Beyonce");
  });
});
