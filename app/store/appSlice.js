import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	appContext: {},
	quote: '',
	loader: false,
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
	},
});

export const { setAppContext, setQuote, setLoader } = appContextSlice.actions;

export default appContextSlice.reducer;
