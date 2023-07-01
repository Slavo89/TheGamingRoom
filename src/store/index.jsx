import { configureStore } from '@reduxjs/toolkit';

import wishlistSlice from './wishlist-slice';
import cartSlice from './cart-slice';

const store = configureStore({
	reducer: {
		wishlist: wishlistSlice.reducer,
		cart: cartSlice.reducer
	},
});


export default store;
