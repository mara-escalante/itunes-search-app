import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InfiniteScroll from "./InfiniteScroll";

describe("InfiniteScroll component", () => {
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
    children,
    isLoading: false,
  };

  test("it displays items", () => {
    render(<InfiniteScroll {...props} />);
    expect(screen.getByText("item 1")).toBeInTheDocument();
  });

  test("it does not call loadMore function before the scroll reaches the bottom", () => {
    render(<InfiniteScroll {...props} />);
    expect(loadMore).not.toHaveBeenCalled();
  });

  test("it calls loadMore function when the scroll reaches the bottom", () => {
    render(<InfiniteScroll {...props} />);
    fireEvent.scroll(screen.getByTestId("scroll-container"), {
      target: { scrollY: 100 }
    });
    expect(loadMore).toHaveBeenCalled();
  });

  test("it renders loading spinner when isLoading is true", () => {
    render(<InfiniteScroll {...props} isLoading={true} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
