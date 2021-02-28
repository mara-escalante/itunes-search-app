import React from "react";
import List from "@material-ui/core/List";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
import NoResultsMessage from "./NoResultsMessage";
import ResultItem from "./ResultItem";
import { Result } from "../../types";
import { getMappedResult } from "./utils";

interface ResultsProps {
  data: Result[];
  searchTerm: string;
  status: string;
  error: string;
  loadResults: () => void;
}

const Results: React.FC<ResultsProps> = ({
  data,
  searchTerm,
  status,
  error,
  loadResults
}) => {
  const isLoading = status === "loading";

  return (
    <>
      {data?.length ? (
        <InfiniteScroll
          loadMore={loadResults}
          isLoading={isLoading}
          height={500}
        >
          <List role="list">
            {data.map((result, idx) => {
              const { id, ...props } = getMappedResult(result) || {};
              return <ResultItem key={`${id}-${idx}`} {...props} />;
            })}
          </List>
        </InfiniteScroll>
      ) : (
        <NoResultsMessage
          isLoading={isLoading}
          error={error}
          searchTerm={searchTerm}
        />
      )}
    </>
  );
};

export default Results;
