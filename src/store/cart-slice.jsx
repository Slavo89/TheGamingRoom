import { createSlice } from '@reduxjs/toolkit';

createSlice({
	name: 'cart',
	initialState: {
		items: [],
		totalQuantity: 0,
		totalAmount: 0,
	},
	reducers: {
		addItemToWishlist(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			if (!existingItem) {
				state.item.push({
					itemId: newItem.id,
					price: newItem.metacritic,
					totalPrice: newItem.metacritic
				});
			}
		},
		removeItemFromWishlist() {},
	},
});
