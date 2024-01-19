import { createAsyncThunk } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import repository from 'repository';
import { ErrorResponse } from 'types/error.type';
import { OrderDataItem } from '../types/orderData-dto.type';
import { Ticket } from '../types/ticket-dto.type';

export const fetchAvailableTickets = createAsyncThunk(
  'POST/flights/fetchAvailableTickets',
  async (formData: FieldValues, { rejectWithValue }) => {
    try {
      const response = await repository.post('/flights/available-tickets', formData);
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);


export const orderTickets = createAsyncThunk(
  'flights/orderTickets',
  async (orderData: OrderDataItem[], { rejectWithValue }) => {
    try {
      const response = await repository.post('/tickets', orderData);
      console.log(response.data,3)
      return response.data;
      
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const fetchAvailableTicketsSortedByPrice = createAsyncThunk(
  'POST/flights/fetchAvailableTicketsSortedByPrice',
  async (availableTickets: { there: Ticket[][]; back: Ticket[][] }, { rejectWithValue }) => {
    try {
      const response = await repository.post('/flights/sort-by-price', availableTickets);
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const fetchAvailableTicketsSortedByTime = createAsyncThunk(
  'POST/flights/fetchAvailableTicketsSortedByTime',
  async (availableTickets: { there: Ticket[][]; back: Ticket[][] }, { rejectWithValue }) => {
    try {
      const response = await repository.post('/flights/sort-by-time', availableTickets);
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

