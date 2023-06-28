import { configureStore } from '@reduxjs/toolkit';

import wishlistSlice from './wishlist-slice';

const store = configureStore({
	reducer: {
		wishlist: wishlistSlice.reducer
	},
});


export default store;
