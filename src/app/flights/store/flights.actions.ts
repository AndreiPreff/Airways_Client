import { createAsyncThunk } from '@reduxjs/toolkit';
import repository from 'Airways_Common/components/repository';
import axios from 'axios';
import { FieldValues } from 'react-hook-form';
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

export const fetchHistory = createAsyncThunk(
  'chat/fetchHistory',
  async (roomId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5001/chat/${roomId}`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch message history');
      }

      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "GET/users/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get("users/profile");
      return response.data;
      
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

