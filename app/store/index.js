import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reducer from './appSlice';

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

/* ---------------- root reducer ---------------- */

const rootReducer = combineReducers({
	appContext: reducer,
});

/* ---------------- persist config ---------------- */

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['appContext'],
};

/* ---------------- persisted reducer ---------------- */

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ---------------- store ---------------- */

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

/* ---------------- persistor ---------------- */

export const persistor = persistStore(store);

/* helpers */
export const RootState = () => store.getState();
export const AppDispatch = store.dispatch;
