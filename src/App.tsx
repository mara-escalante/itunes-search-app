import React, { useState } from "react";
import "./App.css";
import Results from "./components/Results/Results";
import SearchForm from "./components/SearchForm/SearchForm";

const App = () => {
  const [data, setData] = useState([]);

  const testApi = (searchTerm: string) => {
    fetch(`http://localhost:3000/search?term=${searchTerm}`)
      .then(response => response.json())
      .then(data => setData(data));
  };

  return (
    <div className="App">
      <h1>ITunes Search</h1>
      <SearchForm onSubmit={testApi} />
      <Results data={data} />
    </div>
  );
};

export default App;
