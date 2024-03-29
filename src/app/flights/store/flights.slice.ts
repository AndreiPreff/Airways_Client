import { createSlice } from "@reduxjs/toolkit";
import { FlightsState } from "../types/flights-state";
import {
  fetchAvailableTickets,
  fetchAvailableTicketsSortedByPrice,
  fetchAvailableTicketsSortedByTime,
  fetchHistory,
  getUserProfile,
  orderTickets,
} from "./flights.actions";


const initialState: FlightsState = {
  availableTickets: null,
  selectedTickets: {
    there: null,
    back: null,
  },
  messages: null,
  user: null,
  pending: false,
  error: null,
  passengerCount: null,
};

export const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    selectTicket: (state, action) => {
      const { ticketType, ticket } = action.payload;
      if (ticketType === "there") state.selectedTickets.there = ticket;
      if (ticketType === "back") state.selectedTickets.back = ticket;
    },
    selectPassengerCount: (state, action) => {
      state.passengerCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTickets.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchAvailableTickets.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.availableTickets = payload;
      })
      .addCase(
        fetchAvailableTickets.rejected,
        (state, action: any & { payload: any }) => {
          state.pending = false;
          state.error = action.payload.error;
        }
      )
      .addCase(fetchAvailableTicketsSortedByPrice.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(
        fetchAvailableTicketsSortedByPrice.fulfilled,
        (state, { payload }) => {
          state.pending = false;
          state.availableTickets = payload;
        }
      )
      .addCase(
        fetchAvailableTicketsSortedByPrice.rejected,
        (state, action: any & { payload: any }) => {
          state.pending = false;
          state.error = action.payload.error;
        }
      )
      .addCase(fetchAvailableTicketsSortedByTime.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(
        fetchAvailableTicketsSortedByTime.fulfilled,
        (state, { payload }) => {
          state.pending = false;
          state.availableTickets = payload;
        }
      )
      .addCase(
        fetchAvailableTicketsSortedByTime.rejected,
        (state, action: any & { payload: any }) => {
          state.pending = false;
          state.error = action.payload.error;
        }
      )
      .addCase(orderTickets.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(orderTickets.fulfilled, (state, { payload }) => {
        state.pending = false;
      })
      .addCase(
        orderTickets.rejected,
        (state, action: any & { payload: any }) => {
          state.pending = false;
          state.error = action.payload.error;
        }
      )
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

export const { selectTicket, selectPassengerCount } = flightsSlice.actions;
