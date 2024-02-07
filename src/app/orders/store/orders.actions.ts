import { createAsyncThunk } from '@reduxjs/toolkit';
import repository from 'Airways_Common/components/repository';
import axios from 'axios';
import { ErrorResponse } from 'types/error.type';

export const fetchOrderTickets = createAsyncThunk(
  'GET/orders/fetchOrderTickets',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await repository.get(`/orders/getOrderTickets/${orderId}`);
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'GET/orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get('/orders/getAllUserOrders');
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const fetchBookedOrders = createAsyncThunk(
  'GET/orders/fetchBookedOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get('/orders/getBookedOrders');
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'PATCH/orders/cancelOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await repository.patch(`/orders/${orderId}`, { status: 'CANCELLED' });
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);
export const markOrderAsPaid = createAsyncThunk(
  'PATCH/orders/markOrderAsPaid',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await repository.patch(`/orders/${orderId}`, { status: 'PAID' });
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