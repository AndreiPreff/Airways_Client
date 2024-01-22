import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "Airways_Common/components/auth/store/auth.slice";
import { flightsSlice } from "app/flights/store/flights.slice";
import { ordersSlice } from "app/orders/store/orders.slice";


const store = configureStore({
  reducer: {
   
    auth: authSlice.reducer,
    flights: flightsSlice.reducer,
    orders: ordersSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
