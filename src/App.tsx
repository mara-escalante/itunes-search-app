import React from "react";
import "./App.css";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "./hooks";
import { clearState, fetchResults } from "./appSlice";
import { FetchResultsRequest } from "./types";
import Results from "./components/Results/Results";
import SearchForm from "./components/SearchForm/SearchForm";
import Container from "@material-ui/core/Container";

const StyledContainer = styled(Container)`
  text-align: center;
`;

const App = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.app.searchResults);

  const getSearchResults = (request: FetchResultsRequest) => {
    dispatch(clearState());
    dispatch(fetchResults(request));
  };

  return (
    <StyledContainer maxWidth="sm">
      <h1>iTunes Search App</h1>
      <SearchForm onSubmit={getSearchResults} />
      <Results data={data} />
    </StyledContainer>
  );
};

export default App;
