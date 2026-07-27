import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  favorite: [],
  totalFavorites : 0,
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {      
      state.favorite = action.payload.favorites || [];
      state.totalFavorites = action.payload.totalFavorites;

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
  removeFromFavorite,
  clearFavorite,
} = favoriteSlice.actions;
