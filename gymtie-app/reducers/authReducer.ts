import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    client: null,
    token: null,
  },
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
      AsyncStorage.setItem("client", JSON.stringify(action.payload));
    },
    clearClient: (state) => {
      state.client = null;
      AsyncStorage.removeItem("client");
    },
    setToken: (state, action) => {
      state.token = action.payload;
      AsyncStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      AsyncStorage.removeItem("token");
    },
  },
});

export const { setClient, clearClient, setToken, clearToken } =
  authSlice.actions;
export default authSlice.reducer;
