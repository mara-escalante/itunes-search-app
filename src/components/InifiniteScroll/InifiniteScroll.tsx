import React from "react";

interface InifiniteScrollProps {
  loadMore: () => void;
  isLoading?: boolean;
}

const InifiniteScroll: React.FunctionComponent<InifiniteScrollProps> = ({
  children,
  loadMore,
  isLoading
}) => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      loadMore();
    }
  };

  return (
    <div
      onScroll={handleScroll}
      data-testid="scroll-container"
      style={{ maxHeight: "500px", overflow: "hidden", overflowY: "auto" }}
    >
      {children}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default InifiniteScroll;
