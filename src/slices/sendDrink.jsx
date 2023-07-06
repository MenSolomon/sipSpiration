import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drinkStore: [],
};

const sendDrink = createSlice({
  name: "storeOfDrinks",
  initialState,
  reducers: {
    deliverDrink: (state, action) => {
      state.drinkStore = action.payload;
    },
  },
});

export const selectDrinksToDeliver = (state) => state.storeOfDrinks.drinkStore;

export default sendDrink.reducer;

export const { deliverDrink } = sendDrink.actions;
