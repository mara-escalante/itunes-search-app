import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { Result } from "./types";

export const fetchResults = createAsyncThunk<
  Result[],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("results/fetchResults", async (searchTerm, thunkApi) => {
  const {
    app: { offset }
  } = thunkApi.getState();

  const response = fetch(
    `http://localhost:3000/search?term=${searchTerm}&offset=${offset}`
  )
    .then(response => {
        return response.json()
    })

  return response;
});
interface AppState {
  status: string;
  searchTerm: string;
  offset: number;
  searchResults: Result[];
  error: string;
}

const initialState: AppState = {
  status: "idle",
  searchTerm: "",
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
    builder.addCase(fetchResults.pending, (state, action) => {
      state.status = "loading";
      state.searchTerm = action.meta.arg;
    });
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.offset += 10;
      state.searchResults = state.searchResults.concat(action.payload);
    });
    builder.addCase(fetchResults.rejected, (state, action) => {
      state.status = "failed";
    });
  }
});

export const { clearState } = appSlice.actions;

export default appSlice.reducer;
