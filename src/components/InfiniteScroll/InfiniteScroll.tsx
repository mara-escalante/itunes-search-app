import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

interface InfiniteScrollProps {
  loadMore: () => void;
  isLoading?: boolean;
  height?: number;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  loadMore,
  isLoading,
  height,
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
      style={{ height, overflow: "hidden", overflowY: "auto" }}
    >
      {children}
      {isLoading &&  <CircularProgress />}
    </div>
  );
};

export default InfiniteScroll;
