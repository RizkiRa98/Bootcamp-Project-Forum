import { configureStore, Provider } from "@reduxjs/toolkit";
import AuthReducer from "../Features/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
