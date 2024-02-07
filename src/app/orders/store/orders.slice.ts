import { createSlice } from '@reduxjs/toolkit';
import { fetchHistory } from 'app/flights/store/flights.actions';
import { cancelOrder, fetchBookedOrders, fetchOrderTickets, fetchUserOrders, getUserProfile, markOrderAsPaid } from './orders.actions';


interface OrdersState {
  orderTickets: any[] | null;
  userOrders: any[] | null;
  pending: boolean;
  error: string | null;
  messages: any,
  user: any,
}

const initialState: OrdersState = {
  orderTickets: null,
  userOrders: null,
  pending: false,
  error: null,
  messages: null,
  user: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderTickets.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchOrderTickets.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.orderTickets = payload;
      })
      .addCase(fetchOrderTickets.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.error = action.payload.error;
      })
      .addCase(fetchBookedOrders.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchBookedOrders.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.orderTickets = payload;
      })
      .addCase(fetchBookedOrders.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.error = action.payload.error;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.userOrders = payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.error = action.payload.error;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state) => {
        state.pending = false;
      })
      .addCase(cancelOrder.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.error = action.payload.error;
      })
      .addCase(markOrderAsPaid.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(markOrderAsPaid.fulfilled, (state) => {
        state.pending = false;
      })
      .addCase(markOrderAsPaid.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.error = action.payload.error;
      })
      .addCase(fetchHistory.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.messages = payload;
      })
      .addCase(fetchHistory.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.error = action.payload.error;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.pending = true; 
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.pending = false; 
        state.user = payload;
      })
      .addCase(
        getUserProfile.rejected,
        (state, action: any & { payload: any }) => {
          state.pending = false; 
          state.error = action.payload.error;
        }
      );
  },
});

export default ordersSlice.reducer;
