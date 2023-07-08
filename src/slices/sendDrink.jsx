import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drinkStore: [],
  categoryStore: [],
  AlcoholStatusStore: [],
  allDrinksStore: [],
};

const sendDrink = createSlice({
  name: "storeOfDrinks",
  initialState,
  reducers: {
    deliverDrink: (state, action) => {
      state.drinkStore = action.payload;
    },

    deliverCategory: (state, action) => {
      state.categoryStore = action.payload;
    },

    deliverAllDrinks: (state, action) => {
      state.allDrinksStore = action.payload;
    },

    deliverAlcoholStats: (state, action) => {
      state.AlcoholStatusStore = action.payload;
    },
  },
});

export const selectDrinksToDeliver = (state) => state.storeOfDrinks.drinkStore;
export const selectCategoriesToDeliver = (state) =>
  state.storeOfDrinks.categoryStore;
export const selectAllDrinksToDeliver = (state) =>
  state.storeOfDrinks.allDrinksStore;
export const selectAlcoholStatus = (state) =>
  state.storeOfDrinks.AlcoholStatusStore;

export default sendDrink.reducer;

export const {
  deliverDrink,
  deliverCategory,
  deliverAllDrinks,
  deliverAlcoholStats,
} = sendDrink.actions;
