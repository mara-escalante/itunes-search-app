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
    const input = screen.getByPlaceholderText("Search");
    const button = screen.getByRole("button");
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("it does not call onSubmit with an empty search term", () => {
    render(<SearchForm {...props} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("it calls onSubmit on button click with the correct search term", () => {
    render(<SearchForm {...props} />);
    const input = screen.getByPlaceholderText("Search");
    const button = screen.getByRole("button");
    act(() => {
      fireEvent.change(input, { target: { value: "Beyonce" } });
    });
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalledWith("Beyonce");
  });
});
