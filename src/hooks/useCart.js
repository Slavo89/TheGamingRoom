import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions, addToCart } from '../store/cart-slice';
import { useNavigate } from 'react-router-dom';

const useCart = (data) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const [inCart, setInCart] = useState(false);
	const cartItems = useSelector((state) => state.cart.items);

	useEffect(() => {
		const itemInCart = cartItems.some((item) => item.id === data.id);
		if (itemInCart) {
			setInCart(true);
		}
	}, [data.id, cartItems]);

	const cartHandler = () => {
		if (!inCart) {
			const gameData = addToCart(data);
			dispatch(cartActions.addItemToCart(gameData));
			setInCart(true);
		} else {
			navigate('/cart')
        }
        
	};

	

	return [inCart, cartHandler, data];
};

export default useCart;
