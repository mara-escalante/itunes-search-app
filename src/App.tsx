import React from "react";
import "./App.css";
import { useAppSelector, useAppDispatch } from "./hooks";
import { clearState, fetchResults } from "./appSlice";
import Results from "./components/Results/Results";
import SearchForm from "./components/SearchForm/SearchForm";

const App = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.app.searchResults);

  const getSearchResults = (searchTerm: string) => {
    dispatch(clearState());
    dispatch(fetchResults(searchTerm));
  };

  return (
    <div className="App">
      <h1>ITunes Search</h1>
      <SearchForm onSubmit={getSearchResults} />
      <Results data={data} />
    </div>
  );
};

export default App;
