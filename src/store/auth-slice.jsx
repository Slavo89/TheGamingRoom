import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenicated: false,
		username: '',
		email: '',
	},
	reducers: {
		login(state, action) {
			state.isAuthenicated = true;
			state.username = action.payload.username;
			state.email = action.payload.email;
		},
		logout(state) {
			state.isAuthenicated = false;
			state.username = '';
			state.email = '';
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
