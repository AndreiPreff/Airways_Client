import { RootState } from 'store';

export const selectAvailableTickets = (state: RootState) => state.flights.availableTickets?.data;
export const selectFlightsPending = (state: RootState) => state.flights.pending;
export const selectFlightsError = (state: RootState) => state.flights.error;
export const selectSelectedThereTicket = (state: RootState) => state.flights.selectedTickets?.there;
export const selectSelectedBackTicket = (state: RootState) => state.flights.selectedTickets?.back;
export const selectFlightsPassengerCount = (state: RootState) => state.flights.passengerCount;
