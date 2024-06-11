import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setUser } from '../features/auth/authSlice';
import axios from '../api/axiosConfig';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const token = localStorage.getItem('token');
if (token) {
  axios.get('/api/auth/').then((response) => {
    store.dispatch(setUser(response.data.user));
  }).catch(() => {
    localStorage.removeItem('token');
  });
}
