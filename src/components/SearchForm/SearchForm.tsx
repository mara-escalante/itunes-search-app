import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { FetchResultsRequest } from "../../types";

const StyledFormGroup = styled(FormGroup)`
  justify-content: center;
`;

interface SearchFormProps {
  onSubmit: (request: FetchResultsRequest) => void;
}

const SearchForm: React.FunctionComponent<SearchFormProps> = ({ onSubmit }) => {
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
    setFilters({ ...filters, [e.target.name]: e.target.checked });
    if (searchTerm) {
      onSubmit({ searchTerm, filters });
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <TextField
        type="text"
        placeholder="Search"
        label="Search"
        size="small"
        variant="outlined"
        value={searchTerm}
        onChange={onTextInputChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        startIcon={<SearchIcon />}
      />
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
