import { createSlice } from '@reduxjs/toolkit';
import { is } from 'date-fns/locale';
import { set } from 'mongoose';

const initialState = {
	appContext: {},
	quote: '',
	loader: false,
	isPatelTolaMember: false,
};

const appContextSlice = createSlice({
	name: 'appContext',
	initialState,
	reducers: {
		setAppContext(state, action) {
			state.appContext = {
				...state.appContext,
				...action.payload,
			};
		},
		setQuote(state, action) {
			state.quote = action.payload;
		},
		setLoader(state, action) {
			state.loader = action.payload;
		},
		setIsPatelTolaMember(state, action) {
			state.isPatelTolaMember = action.payload;
		},
	},
});

export const { setAppContext, setQuote, setLoader, setIsPatelTolaMember } =
	appContextSlice.actions;

export default appContextSlice.reducer;
