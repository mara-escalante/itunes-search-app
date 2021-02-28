import React from "react";
import { render, screen } from "@testing-library/react";
import Results from "./Results";
import { Result } from "../../types";

describe("Results component", () => {
  const data: Result[] = [
    {
      wrapperType: "track",
      trackId: "track-1",
      artistName: "artist-1",
      trackName: "track-name-1",
      artworkUrl100: "imageUrl"
    },
    {
      wrapperType: "track",
      trackId: "track-2",
      artistName: "artist-2",
      trackName: "track-name-2",
      artworkUrl100: "imageUrl"
    },
    {
      wrapperType: "track",
      trackId: "track-3",
      artistName: "artist-3",
      trackName: "track-name-3",
      artworkUrl100: "imageUrl"
    }
  ];

  const loadResults = jest.fn();

  const props = {
    data,
    searchTerm: "search term",
    status: "idle",
    loadResults
  };

  test("renders correctly", () => {
    render(<Results {...props} />);
    const pageTitle = screen.getByRole("list");
    expect(pageTitle).toBeInTheDocument();
  });

  test("renders a message for no results and no search term", () => {
    const newProps = {
      ...props,
      searchTerm: "",
      data: []
    };
    render(<Results {...newProps} />);
    expect(
      screen.getByText("Type a search term to see some results")
    ).toBeInTheDocument();
  });

  test("renders a message for no results and a search term", () => {
    const newProps = {
      ...props,
      searchTerm: "test",
      data: []
    };
    render(<Results {...newProps} />);
    expect(
      screen.getByText('No results for the term "test"')
    ).toBeInTheDocument();
  });

  test("renders list of results", () => {
    render(<Results {...props} />);
    expect(screen.getByText("track-name-1")).toBeInTheDocument();
    expect(screen.getByText("track-name-3")).toBeInTheDocument();
  });
});
