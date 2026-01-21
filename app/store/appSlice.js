import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	appContext: {},
	quote: '',
	loader: false,
	isPatelTolaMember: false,
	user: null,
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
		setUser(state, action) {
			state.user = action.payload;
		},
	},
});

export const {
	setAppContext,
	setQuote,
	setLoader,
	setIsPatelTolaMember,
	setUser,
} = appContextSlice.actions;

export default appContextSlice.reducer;
