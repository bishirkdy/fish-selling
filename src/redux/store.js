import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import favoriteSlice from "./features/favoriteSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    favorite: favoriteSlice,
    auth: authReducer,
  },
});
