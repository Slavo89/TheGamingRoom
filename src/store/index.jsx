import { configureStore } from '@reduxjs/toolkit';

import wishlistSlice from './wishlist-slice';
import cartSlice from './cart-slice';
import backdropSlice from './backdrop-slice';

const store = configureStore({
	reducer: {
		wishlist: wishlistSlice.reducer,
		cart: cartSlice.reducer,
		backdrop: backdropSlice.reducer
	},
});


export default store;
