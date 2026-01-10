import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	appContext: {},
	quote: '',
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
	},
});

export const { setAppContext, setQuote } = appContextSlice.actions;

export default appContextSlice.reducer;
