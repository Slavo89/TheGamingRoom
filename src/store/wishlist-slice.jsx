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
					img: newItem.img,
					platforms: newItem.platforms,
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
	},
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice;

export const addToWishlist = (gameData) => {
	return {
		key: gameData.id,
		id: gameData.id,
		name: gameData.name,
		price: gameData.metacritic,
		img: gameData.background_image,
		esrb_rating: gameData.esrb_rating,
		platforms: gameData.parent_platforms
			.map((item) => item.platform.name),
		// 	.join(', '),
		// platforms: gameData.parent_platforms
		// 	.map((item) => item.platform.name)
		// 	.join(', '),
		genres: gameData.genres.map((item) => item.name),
		tags: gameData.tags.map((item => item.name))
	};
};
