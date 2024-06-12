import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import seminarReducer from '../features/seminar/seminarSlice';
import axios from '../api/axiosConfig';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    seminar: seminarReducer,
  },
});

const token = localStorage.getItem('token');
if (token) {
  axios.get('/api/v1/').then((response) => {
    store.dispatch(authReducer.loginUser({ token, user: response.data }));
  }).catch(() => {
    localStorage.removeItem('token');
  });
}
