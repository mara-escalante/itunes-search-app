import React from "react";
import { render, screen } from "@testing-library/react";
import ResultItem from "./ResultItem";

describe("ResultItem component", () => {
  const props = {
    title: "title",
    subtitle: "subtitle"
  };
  test("it renders correctly with an image", () => {
    const newProps = {
      ...props,
      imageTitle: "image title",
      imageUrl: "image url"
    };
    render(<ResultItem {...newProps} />);
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("subtitle")).toBeInTheDocument();
    expect(screen.getByTitle("image title")).toBeInTheDocument();
  });

  test("it renders correctly with an icon", () => {
    const newProps = {
      ...props,
      icon: <div>Icon component</div>
    };
    render(<ResultItem {...newProps} />);
    expect(screen.getByText("Icon component")).toBeInTheDocument();
  });
});
