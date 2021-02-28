import React, { useState } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { FetchResultsRequest } from "../../types";

const StyledFormGroup = styled(FormGroup)`
  justify-content: center;
  align-items: center;
`;
interface SearchFormProps {
  onSubmit: (request: FetchResultsRequest) => void;
  hasResults: boolean;
}

const SearchForm: React.FunctionComponent<SearchFormProps> = ({ onSubmit, hasResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    artist: true,
    track: true,
    collection: true
  });

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      onSubmit({ searchTerm, filters });
    }
  };

  const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, [e.target.name]: e.target.checked };
    setFilters(newFilters);
    if (searchTerm && hasResults) {
      onSubmit({ searchTerm, filters: newFilters });
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <StyledFormGroup row>
        <TextField
          type="text"
          placeholder="Search"
          label="Search term"
          size="small"
          variant="outlined"
          value={searchTerm}
          onChange={onTextInputChange}
        />
        <IconButton aria-label="search" type="submit">
          <SearchIcon />
        </IconButton>
      </StyledFormGroup>
      <StyledFormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.artist}
              onChange={onCheckboxChange}
              name="artist"
            />
          }
          label="Artists"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.track}
              onChange={onCheckboxChange}
              name="track"
            />
          }
          label="Songs"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.collection}
              onChange={onCheckboxChange}
              name="collection"
            />
          }
          label="Albums"
        />
      </StyledFormGroup>
    </form>
  );
};

export default SearchForm;
