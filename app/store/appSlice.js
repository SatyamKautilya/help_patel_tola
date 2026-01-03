import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	appContext: {},
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
	},
});

export const { setAppContext } = appContextSlice.actions;

export default appContextSlice.reducer;
