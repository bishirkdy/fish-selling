import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorite: [],
  totalFavorites: 0,
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      if (!action.payload) return;

      state.favorite = action.payload.favorites ?? [];
      state.totalFavorites = action.payload.totalFavorites ?? 0;
    },

    removeFromFavorite: (state, action) => {
      state.favorite = state.favorite.filter(
        (item) => item.id !== action.payload
      );

      state.totalFavorites = state.favorite.length;
    },

    clearFavorite: () => initialState,
  },
});

export const {
  addToFavorite,
  removeFromFavorite,
  clearFavorite,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;