import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
	name: 'pages',
	initialState: {
		activePage: 1,
	},
	reducers: {
		setActivePage(state, action) {
			state.activePage = action.payload;
		},

		resetActivePage(state) {
			state.activePage = 1;
		},
	},
});

export const pageActions = pageSlice.actions;

export default pageSlice;
