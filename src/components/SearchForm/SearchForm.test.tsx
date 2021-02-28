import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchForm from "./SearchForm";

describe("SearchForm component", () => {
  const initialFilters = {
    artist: true,
    track: true,
    collection: true
  };

  const onSubmit = jest.fn();

  const props = {
    onSubmit,
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

    fireEvent.change(input, { target: { value: "Beyonce" } });
    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalledWith({
      searchTerm: "Beyonce",
      filters: initialFilters
    });
  });

  test("it calls onSubmit on button click with the correct filters", () => {
    render(<SearchForm {...props} />);
    const input = screen.getByPlaceholderText("Search");
    const artistCheckbox = screen.getByText("Artists");
    const albumCheckbox = screen.getByText("Albums");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Beyonce" } });
    fireEvent.click(artistCheckbox);
    fireEvent.click(albumCheckbox);
    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalledWith({
      searchTerm: "Beyonce",
      filters: {
        artist: false,
        collection: false,
        track: true
      }
    });
  });

  test("it calls onSubmit on checkbox change", () => {
    const newProps = {
      ...props,
      hasResults: true
    };
    render(<SearchForm {...newProps} />);
    const input = screen.getByPlaceholderText("Search");
    const albumCheckbox = screen.getByText("Albums");

    fireEvent.change(input, { target: { value: "Beyonce" } });
    fireEvent.click(albumCheckbox);

    expect(onSubmit).toHaveBeenCalledWith({
      searchTerm: "Beyonce",
      filters: {
        artist: true,
        collection: false,
        track: true
      }
    });
  });
});
