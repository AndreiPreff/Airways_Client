import { createAsyncThunk } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import repository from 'repository';
import { ErrorResponse } from 'types/error.type';
import { OrderDataItem } from '../types/orderData-dto.type';

export const fetchAvailableTickets = createAsyncThunk(
  'flights/fetchAvailableTickets',
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
  async (orderData:OrderDataItem[], { rejectWithValue }) => {
    try {
      const response = await repository.post('/tickets', orderData);
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);