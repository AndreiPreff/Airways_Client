import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveToSessionStorage } from 'app/utils/storageUtils';
import { FieldValues } from 'react-hook-form';
import repository from 'repository';
import { ErrorResponse } from 'types/error.type';


export const signIn = createAsyncThunk(
  'POST/auth/login',
  async ({ email, password }: FieldValues, { rejectWithValue }) => {
    try {
      const response = await repository.post('auth/login/', { email, password });
      console.log(response)
      sessionStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: "Invalid Password or Email!" });
    }
  }
);

export const signUp = createAsyncThunk(
  'Post/auth/',
  async ({ email, password,first_name,last_name }: FieldValues, { rejectWithValue }) => {
    try {
      sessionStorage.removeItem('accessToken');
      const response = await repository.post('/auth/', { email, password, first_name, last_name });
      sessionStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error) {
      
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const signOut = createAsyncThunk(
  'GET/auth/sign-out',
  async (_, { rejectWithValue }) => {
    try {
      await repository.get('/auth/sign-out');
      sessionStorage.removeItem('accessToken');
      saveToSessionStorage('cart', []);
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);
