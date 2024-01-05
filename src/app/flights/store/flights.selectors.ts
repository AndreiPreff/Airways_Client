import { RootState } from 'store';


export const selectAvailableTickets = (state: RootState) => state.flights.availableTickets;
export const selectFlightsPending = (state: RootState) => state.flights.pending;
export const selectFlightsError = (state: RootState) => state.flights.error;
