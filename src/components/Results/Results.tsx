import React from "react";
import styled from "styled-components";
import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
import ResultItem from "./ResultItem";
import { Result } from "../../types";
import { getMappedResult } from "./utils";

const MessageContainer = styled("div")`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ResultsProps {
  data: Result[];
  searchTerm: string;
  status: string;
  loadResults: () => void;
}

const Results: React.FunctionComponent<ResultsProps> = ({
  data,
  searchTerm,
  status,
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
        <MessageContainer>
          {isLoading ? (
            <CircularProgress />
          ) : searchTerm ? (
            <p>No results for the term "{searchTerm}"</p>
          ) : (
            <p>Type a search term to see some results</p>
          )}
        </MessageContainer>
      )}
    </>
  );
};

export default Results;
