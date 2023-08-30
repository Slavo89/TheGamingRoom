import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState: {
		items: [],
	},
	reducers: {
		addItemToWishlist(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			if (!existingItem) {
				state.items.unshift({
					key: newItem.id,
					id: newItem.id,
					name: newItem.name,
					price: newItem.price,
					background_image: newItem.background_image,
					parent_platforms: newItem.parent_platforms,
					esrb_rating: newItem.esrb_rating,
					tags: newItem.tags,
					genres: newItem.genres,
				});
			} else {
				return;
			}
		},
		removeItemFromWishlist(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			if (existingItem) {
				state.items = state.items.filter((item) => item.id !== id);
			}
		},
		resetWishlist(state) {
			state.items = [];
		}
		
	},
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice;

export const addToWishlist = (gameData) => {
	return {
		key: gameData.id,
		id: gameData.id,
		name: gameData.name,
		price: gameData.price,
		background_image: gameData.background_image,
		esrb_rating: gameData.esrb_rating,
		parent_platforms: gameData.parent_platforms,
		genres: gameData.genres,
		tags: gameData.tags,
	};
};
