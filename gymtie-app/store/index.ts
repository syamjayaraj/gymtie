import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "../reducers/memberReducer";
import paymentReducer from "../reducers/paymentReducer";
import authReducer from "../reducers/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    members: memberReducer,
    payments: paymentReducer,
  },
});
