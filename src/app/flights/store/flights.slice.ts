import { createSlice } from '@reduxjs/toolkit';
import { fetchAvailableTickets } from './flights.actions';


const initialState = {
  availableTickets: null,
  pending: false,
  error: null,
};

export const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {},
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
      );
  },
});

