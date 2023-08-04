import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
	name: 'pages',
	initialState: {
		activeBrowsePage: 1,
		activeGenrePage: 1,
	},
	reducers: {
		setActiveBrowsePage(state, action) {
			state.activeBrowsePage = action.payload;
		},

		resetActiveBrowsePage(state) {
			state.activeBrowsePage = 1;
		},
		setActiveGenrePage(state, action) {
			state.activeGenrePage = action.payload;
		},

		resetActiveGenrePage(state) {
			state.activeGenrePage = 1;
		},
	},
});

export const pageActions = pageSlice.actions;

export default pageSlice;
