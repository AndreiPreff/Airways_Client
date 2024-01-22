import { createAsyncThunk } from '@reduxjs/toolkit';
import repository from 'Airways_Common/components/repository';
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
