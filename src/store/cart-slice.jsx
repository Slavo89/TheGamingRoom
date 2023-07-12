import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
		// totalQuantity: 0,
		totalAmount: 0,
	},
	reducers: {
		addItemToCart(state, action) {
			const newItem = action.payload;
			
			const existingItem = state.items.find((item) => item.id === newItem.id);
			if (!existingItem) {
				state.items.unshift({
					key: newItem.id,
					id: newItem.id,
					name: newItem.name,
					price: newItem.price,
					img: newItem.img,
					esrb_rating: newItem.esrb_rating,
					platforms: newItem.platforms,
				});
				state.totalAmount = state.totalAmount + newItem.price
			} else {
				return
			}
		},
		removeItemFromCart(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			if (existingItem) {
				state.items = state.items.filter((item) => item.id !== id);
			}
			state.totalAmount = state.totalAmount - existingItem.price;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;

export const addToCart = (gameData) => {
	return {
		key: gameData.id,
		id: gameData.id,
		name: gameData.name,
		price: gameData.metacritic,
		img: gameData.background_image,
		esrb_rating: gameData.esrb_rating,
		platforms: gameData.parent_platforms
			.map((item) => item.platform.name)
			.join(', '),
	};
};