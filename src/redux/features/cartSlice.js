import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart : []
}
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!action.payload) return;
      state.cart.push(...action.payload);
    },
    setToCart: (state, action) => {
      if (!action.payload) return;
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload,
      );
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.productId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.productId === action.payload);
      if (item) {
        item.quantity -= 1;
      }
    },
    clearCart : () => initialState
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  setToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions;
