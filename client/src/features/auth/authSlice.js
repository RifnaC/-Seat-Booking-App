import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosConfig';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};
export const registerUser = createAsyncThunk('auth/registerUser', async (credentials, thunkAPI) => {
    const {name, email, password, confirmPassword, navigate } = credentials;
  try {
    const response = await axios.post('api/v1/user/register', { name, email, password, confirmPassword });
    navigate('/login');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
    const {email, password, navigate } = credentials;
  try {
    const response = await axios.post('api/v1/user/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', response.data.token)
    console.log('Stored token:', localStorage.getItem('token')); // Verify token storage
    navigate('/seminars');
    return { token, user };

  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const validateToken = createAsyncThunk('auth/validateToken', async (token, thunkAPI) => {
    try {
      const response = await axios.get('/api/v1/user');
      console.log(response)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        localStorage.removeItem('token');
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload.user;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(loginUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.token = action.payload.token;
          state.user = action.payload.user;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    },
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;
  