import { configureStore } from "@reduxjs/toolkit";
import drinkReducer from "./slices/sendDrink";

export const store = configureStore({
  reducer: {
    storeOfDrinks: drinkReducer,
  },
});
