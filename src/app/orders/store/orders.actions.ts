import { createAsyncThunk } from '@reduxjs/toolkit';
import repository from 'repository';
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

export const fetchAllUserOrders = createAsyncThunk(
  'GET/orders/fetchAllUserOrders',
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

export const cancelOrder = createAsyncThunk(
  'PATCH/orders/cancelOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await repository.patch(`/orders/${orderId}`, { status: 'cancelled' });
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);
