import { createSlice } from "@reduxjs/toolkit";
import { fetchMembers } from "../services/api-service";
import { IProduct } from "../models/model";

export interface IInitialState {
  items: IProduct[];
  status: string;
  error: string | null;
}

const membersSlice = createSlice({
  name: "members",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state: IInitialState) => {
        state.status = "loading";
      })
      .addCase(fetchMembers.fulfilled, (state: IInitialState, action: any) => {
        state.status = "succeeded";
        state.items = action?.payload;
      })
      .addCase(fetchMembers.rejected, (state: IInitialState, action: any) => {
        state.status = "failed";
        state.error = action?.error?.message;
      });
  },
});

export default membersSlice.reducer;
