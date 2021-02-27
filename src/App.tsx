import React from "react";
import "./App.css";
import Results from "./components/Results/Results";
import SearchForm from "./components/SearchForm/SearchForm";
import { useAppSelector, useAppDispatch } from './hooks';
import { fetchResults } from './appSlice'

const App = () => {
  const data = useAppSelector(state => state.app.searchResults);
  const dispatch = useAppDispatch();

  const getSearchResults = (searchTerm: string) => {
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
