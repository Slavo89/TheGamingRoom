import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'authenication',
	initialState: {
		isAuthenicated: false,
	},
	reducers: {
		login(state) {
			state.isAuthenicated = true;
		},
		logout(state) {
			state.isAuthenicated = false;
		},
	},
});


export const authActions = authSlice.actions;
