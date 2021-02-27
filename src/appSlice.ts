import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Result } from './types';

export const fetchResults = createAsyncThunk(
  "results/fetchResults",
  async (term: string) => {
    const response = fetch(
      `http://localhost:3000/search?term=${term}`
    ).then(response => response.json());
    return response;
  }
);

interface AppState {
  status: string;
  searchResults: Result[];
  error: string;
}

const initialState: AppState = {
  status: "idle",
  searchResults: [],
  error: ""
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchResults.pending, state => {
      state.status = "loading";
    });
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.searchResults = action.payload;
    });
    builder.addCase(fetchResults.rejected, (state, action) => {
      state.status = "failed";
    });
  }
});

export default appSlice.reducer;
