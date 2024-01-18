import { RootState } from 'store';

export const selectOrderTickets = (state: RootState) => state.orders.orderTickets;
export const selectUserOrders = (state: RootState) => state.orders.userOrders;
export const selectOrdersPending = (state: RootState) => state.orders.pending;
export const selectOrdersError = (state: RootState) => state.orders.error;


