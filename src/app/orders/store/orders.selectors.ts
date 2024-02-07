import { RootState } from 'store';

export const selectOrderTickets = (state: RootState) => state.orders.orderTickets;
export const selectUserOrders = (state: RootState) => state.orders.userOrders;
export const selectOrdersPending = (state: RootState) => state.orders.pending;
export const selectOrdersError = (state: RootState) => state.orders.error;
export const selectChatMessages = (state: RootState) => state.flights.messages;
export const selectChatPending = (state: RootState) => state.flights.pending;
export const selectChatError = (state: RootState) => state.flights.error;
export const userProfileSelector = (state: RootState) => state.flights.user; 

