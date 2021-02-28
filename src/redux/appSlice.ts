import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSearchResults } from "../api/searchService";
import { AppDispatch, RootState } from "./store";
import { FetchResultsRequest, Filters, Result } from "../types";

type Someting = {
  dispatch: AppDispatch;
  state: RootState;
};

export const getResults = createAsyncThunk<
  Result[],
  FetchResultsRequest,
  Someting
>("results/getResults", async (request, thunkApi) => {
  const {
    app: { offset }
  } = thunkApi.getState();

  return fetchSearchResults(request, offset);
});

interface AppState {
  status: string;
  searchTerm: string;
  filters: Filters;
  offset: number;
  searchResults: Result[];
  error: string;
}

const initialState: AppState = {
  status: "idle",
  searchTerm: "",
  filters: {} as Filters,
  offset: 0,
  searchResults: [],
  error: ""
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clearState: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(getResults.pending, (state, action) => {
      state.status = "loading";
      state.searchTerm = action.meta.arg.searchTerm;
      state.filters = action.meta.arg.filters;
    });
    builder.addCase(getResults.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.offset += 10;
      state.searchResults = state.searchResults.concat(action.payload);
    });
    builder.addCase(getResults.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || 'Something went wrong';
    });
  }
});

export const { clearState } = appSlice.actions;

export default appSlice.reducer;
