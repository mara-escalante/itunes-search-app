import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { fetchResults } from "../../appSlice";
import InifiniteScroll from "../InifiniteScroll/InifiniteScroll";
import { Result } from "../../types";

interface ResultsProps {
  data: Result[];
}

const Results: React.FunctionComponent<ResultsProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(state => state.app.searchTerm);
  const searchStatus = useAppSelector(state => state.app.status);
  const isLoading = searchStatus === "loading";

  const getSearchResults = () => {
    dispatch(fetchResults(searchTerm));
  };

  return (
    <div>
      <h1>Results List</h1>
      {data.length ? (
        <InifiniteScroll loadMore={getSearchResults} isLoading={isLoading}>
          <ul>
            {data.map(({ trackId, trackName, artistName }) => (
              <li key={trackId} style={{ minHeight: "100px" }}>
                {trackName} - {artistName}
              </li>
            ))}
          </ul>
        </InifiniteScroll>
      ) : (
        <p>No results</p>
      )}
    </div>
  );
};

export default Results;
