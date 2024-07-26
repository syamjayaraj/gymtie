import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    items: [],
  },
  reducers: {
    createPayment(state, action) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item: any) => item.id !== action.payload.id
      );
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { createPayment, removeFromCart, clearCart } =
  paymentSlice.actions;
export default paymentSlice.reducer;
