import { configureStore } from '@reduxjs/toolkit';
import reducer from './appSlice';

export const store = configureStore({
	reducer: {
		appContext: reducer,
	},
});

// (Optional helpers – fine to keep)
export const RootState = store.getState;
export const AppDispatch = store.dispatch;
