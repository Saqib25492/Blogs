import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default is localStorage for web
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';

// Persist configuration for the auth and modal reducers
const persistConfig = {
  key: 'root',  // Key for local storage
  storage,      // Using localStorage for persistence
  whitelist: ['auth'], // Only persist the 'auth' slice
};

// Persisted reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,  // Using the persisted auth reducer
    modal: modalReducer,         // Optionally persist modal state if needed
  },
});

export const persistor = persistStore(store);
