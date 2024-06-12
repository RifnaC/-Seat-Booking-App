// src/features/seminars/seminarSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosConfig';

const initialState = {
  seminars: [],
  token: localStorage.getItem('token'),
  status: 'idle',
  error: null,
};

export const fetchSeminars = createAsyncThunk('seminar/fetchSeminars', async () => {
    console.log()
  try {
    const response = await axios.get('/api/v1/seminar');
    return response.data;
  } catch (error) {
    
      throw error.response.data;
  }
});

const seminarSlice = createSlice({
  name: 'seminar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeminars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSeminars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.seminars = action.payload;
      })
      .addCase(fetchSeminars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default seminarSlice.reducer;

