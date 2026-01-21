import { configureStore, combineReducers } from '@reduxjs/toolkit';
import appReducer from './appSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

/* ---------- SAFE STORAGE (IMPORTANT) ---------- */

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storageSafe =
  typeof window !== 'undefined' ? storage : createNoopStorage();

/* ---------- REDUCERS ---------- */

const rootReducer = combineReducers({
  appContext: appReducer,
});

/* ---------- PERSIST CONFIG ---------- */

const persistConfig = {
  key: 'root',
  storage: storageSafe,
  whitelist: ['appContext'],
};

/* ---------- STORE ---------- */

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);
