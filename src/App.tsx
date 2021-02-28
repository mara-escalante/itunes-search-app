import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Results from "./components/Results/Results";
import SearchForm from "./components/SearchForm/SearchForm";
import { useAppSelector, useAppDispatch } from "./redux/redux-hooks";
import { clearState, getResults } from "./redux/appSlice";
import { FetchResultsRequest } from "./types";

const StyledContainer = styled(Container)`
  text-align: center;
  padding-top: 30px;
`;

const App = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.app);
  const { searchResults, searchTerm, filters, status, error } = state || {};

  const getSearchResults = (request?: FetchResultsRequest) => {
    if (request) {
      dispatch(clearState());
      dispatch(getResults(request));
    } else {
      dispatch(getResults({ searchTerm, filters }));
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <Typography variant="h4" component="h1" color="primary" gutterBottom>
        iTunes Search App
      </Typography>
      <SearchForm
        onSubmit={getSearchResults}
      />
      <Results
        data={searchResults}
        searchTerm={searchTerm}
        status={status}
        error={error}
        loadResults={getSearchResults}
      />
    </StyledContainer>
  );
};

export default App;
