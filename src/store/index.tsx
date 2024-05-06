import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./features/index";

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Add any middleware here
});

export default store;
