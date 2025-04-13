// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/userSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth : authReducer,
  },
});

export default store;  // Export the store