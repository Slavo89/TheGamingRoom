import { configureStore } from '@reduxjs/toolkit';

import wishlistSlice from './wishlist-slice';
import cartSlice from './cart-slice';
import backdropSlice from './backdrop-slice';
import pageSlice from './page-slice';
import authSlice from './auth-slice';

const store = configureStore({
	reducer: {
		wishlist: wishlistSlice.reducer,
		cart: cartSlice.reducer,
		backdrop: backdropSlice.reducer,
		pages: pageSlice.reducer,
		auth: authSlice.reducer,
	},
});


export default store;
