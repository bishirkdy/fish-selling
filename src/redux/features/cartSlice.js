import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  grandTotal: 0,
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!action.payload) return;

      state.cart = action.payload.items;
      state.grandTotal = action.payload.grandTotal;
      state.totalItems = action.payload.totalItems;
    },

    removeFromCart: (state, action) => {
      const item = state.cart.find(
        (x) => x.cartItemId === action.payload
      );

      if (item) {
        state.grandTotal -= item.totalPrice;
        state.totalItems -= item.quantity;
      }

      state.cart = state.cart.filter(
        (x) => x.cartItemId !== action.payload
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.cart.find(
        (x) => x.cartItemId === action.payload
      );

      if (item) {
        item.quantity += 1;

        item.totalPrice =
          item.discountedPrice * item.quantity;

        state.grandTotal += item.discountedPrice;
        state.totalItems += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cart.find(
        (x) => x.cartItemId === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;

        item.totalPrice =
          item.discountedPrice * item.quantity;

        state.grandTotal -= item.discountedPrice;
        state.totalItems -= 1;
      }
    },

    clearCart: () => initialState,
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;