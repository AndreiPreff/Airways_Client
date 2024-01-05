import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "app/auth/store/auth.slice";
import { flightsSlice } from "app/flights/store/flights.slice";





const store = configureStore({
  reducer: {
   
    auth: authSlice.reducer,
    flights: flightsSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
