import { RootState } from 'store';

export const selectAvailableTickets = (state: RootState) => state.flights.availableTickets?.data;
export const selectFlightsPending = (state: RootState) => state.flights.pending;
export const selectFlightsError = (state: RootState) => state.flights.error;
export const selectSelectedThereTicket = (state: RootState) => state.flights.selectedTickets?.there;
export const selectSelectedBackTicket = (state: RootState) => state.flights.selectedTickets?.back;
export const selectFlightsPassengerCount = (state: RootState) => state.flights.passengerCount;
export const selectSelectedTicket = (state: RootState) => state.flights.selectedTickets;
export const selectChatMessages = (state: RootState) => state.flights.messages;
export const selectChatPending = (state: RootState) => state.flights.pending;
export const selectChatError = (state: RootState) => state.flights.error;
export const userProfileSelector = (state: RootState) => state.flights.user; 
// export const authGetUserProfileErrorSelector = (state: RootState) => state.flights.error?.getUserProfile;
