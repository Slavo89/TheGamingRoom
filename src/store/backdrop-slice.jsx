import { createSlice } from '@reduxjs/toolkit';

const backdropSlice = createSlice({
	name: 'backdrop',
	initialState: {
		isBackdropVisible: false,
	},
	reducers: {
		showBackdrop(state) {
			state.isBackdropVisible = !state.isBackdropVisible;
        },
        hideBackdrop(state) {
            state.isBackdropVisible = false
        }
	},
});

export const backdropActions = backdropSlice.actions;

export default backdropSlice;

