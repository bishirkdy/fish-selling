import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  favorite: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      state.favorite = action.payload || [];
    },
    setToFavorite: (state, action) => {
      if (!action.payload) return;
      state.favorite.push(action.payload);
    },
    removeFromFavorite: (state, action) => {
      state.favorite = state.favorite.filter(
        (ste) => ste.productId !== action.payload,
      );
    },
    clearFavorite: () => initialState,
  },
});

export default favoriteSlice.reducer;
export const {
  addToFavorite,
  setToFavorite,
  removeFromFavorite,
  clearFavorite,
} = favoriteSlice.actions;
