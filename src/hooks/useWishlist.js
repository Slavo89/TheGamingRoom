import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wishlistActions, addToWishlist } from '../store/wishlist-slice';

const useWishlist = (data) => {
	const dispatch = useDispatch();
	const [inWishlist, setInWishlist] = useState(false);
	const wishlistItems = useSelector((state) => state.wishlist.items);

	useEffect(() => {
		const itemInWishlist = wishlistItems.some((item) => item.id === data.id);
		if (itemInWishlist) {
			setInWishlist(true);
		}
	}, [data.id, wishlistItems]);

	const wishlistHandler = () => {
		if (!inWishlist) {
			const gameData = addToWishlist(data);
			dispatch(wishlistActions.addItemToWishlist(gameData));
			setInWishlist(true);
		} else {
			dispatch(wishlistActions.removeItemFromWishlist(data.id));
			setInWishlist(false);
        }
	};

	return [inWishlist, wishlistHandler, data];
};

export default useWishlist;
