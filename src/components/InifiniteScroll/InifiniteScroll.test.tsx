import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InifiniteScroll from "./InifiniteScroll";

describe("InifiniteScroll component", () => {
  const loadMore = jest.fn();
  const children = (
    <>
      <div>item 1</div>
      <div>item 2</div>
      <div>item 3</div>
    </>
  );

  const props = {
    loadMore,
    children
  };

  test("it displays items", () => {
    render(<InifiniteScroll {...props} />);
    expect(screen.getByText("item 1")).toBeInTheDocument();
  });

  test("it does not call loadMore function before the scroll reaches the bottom", () => {
    render(<InifiniteScroll {...props} />);
    expect(loadMore).not.toHaveBeenCalled();
  });

  test("it calls loadMore function when the scroll reaches the bottom", () => {
    render(<InifiniteScroll {...props} />);
    fireEvent.scroll(screen.getByTestId("scroll-container"), {
      target: { scrollY: 100 }
    });
    expect(loadMore).toHaveBeenCalled();
  });

  test("it renders loading text when isLoading is true", () => {
    render(<InifiniteScroll {...props} isLoading={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
