import React from "react";
import { render, screen } from "@testing-library/react";
import Results from "./Results";
import { Result } from "../../types";

describe("Results component", () => {
  const data: Result[] = [
    {
      wrapperType: 'track',
      trackId: "track-1",
      artistName: "artist-1",
      trackName: "track-name-1",
      artworkUrl60: "imageUrl"
    },
    {
      wrapperType: 'track',
      trackId: "track-2",
      artistName: "artist-2",
      trackName: "track-name-2",
      artworkUrl60: "imageUrl"
    },
    {
      wrapperType: 'track',
      trackId: "track-3",
      artistName: "artist-3",
      trackName: "track-name-3",
      artworkUrl60: "imageUrl"
    }
  ];

  test("renders correctly", () => {
    render(<Results data={data} />);
    const pageTitle = screen.getByText("Results List");
    expect(pageTitle).toBeInTheDocument();
  });

  test("renders a message for no results", () => {
    render(<Results data={[]} />);
    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  test("renders list of results", () => {
    render(<Results data={data} />);
    expect(screen.getByText("Title 1")).toBeInTheDocument();
    expect(screen.getByText("Title 3")).toBeInTheDocument();
  });
});
