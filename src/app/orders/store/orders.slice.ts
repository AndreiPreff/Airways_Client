import { createSlice } from '@reduxjs/toolkit';
import { Ticket } from 'app/flights/types/ticket-dto.type';
import { cancelOrder, fetchAllUserOrders, fetchOrderTickets } from './orders.actions';


interface OrdersState {
  orderTickets: Ticket[] | null;
  userOrders: any[] | null;
  pending: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orderTickets: null,
  userOrders: null,
  pending: false,
  error: null,
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
      .addCase(fetchAllUserOrders.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchAllUserOrders.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.userOrders = payload;
      })
      .addCase(fetchAllUserOrders.rejected, (state, action: any & { payload: any }) => {
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
      });
  },
});

export default ordersSlice.reducer;
