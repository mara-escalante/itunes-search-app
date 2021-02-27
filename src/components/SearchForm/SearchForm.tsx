import React, { useState } from "react";

interface SearchFormProps {
  onSubmit: (searchTerm: string) => void;
}

const SearchForm: React.FunctionComponent<SearchFormProps> = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onClickHandler = () => {
    if (searchTerm) {
      onSubmit(searchTerm);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  };

  return (
    <div>
      <h1>Search Form</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={onInputChange}
      />
      <button onClick={onClickHandler}>Search</button>
    </div>
  );
};

export default SearchForm;
