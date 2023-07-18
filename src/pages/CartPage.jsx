import classes from './CartPage.module.scss';
import CartCard from '../components/Cards/CartCard';
import CTAButton from '../components/Buttons/CTAButton';
import EmptyCartList from '../components/Layout/EmptyCartList';
import { cartActions } from '../store/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../store/wishlist-slice';

const CartPage = () => {
	const cartItems = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const taxAmount = 0.05

		const addToWishlistHandler = (item) => {
			dispatch(
				wishlistActions.addItemToWishlist({
					key: item.id,
					id: item.id,
					name: item.name,
					price: item.price,
					background_image: item.background_image,
					esrb_rating: item.esrb_rating,
					parent_platforms: item.parent_platforms,
				})
			);
			removeFromCartHandler(item.id)
		};

	const removeFromCartHandler = (itemId) => {
		dispatch(cartActions.removeItemFromCart(itemId));
	};

	return (
		<>
			<h1>My Cart</h1>
			<section className={classes.cartSection}>
				{cartItems.items.length > 0 ? (
					<div className={classes.gameList}>
						<ul className={classes.list}>
							{cartItems.items.map((game) => (
								<CartCard
									key={game.id}
									item={{
										id: game.id,
										name: game.name,
										background_image: game.background_image,
										parent_platforms: game.parent_platforms,
										price: game.price,
										rating: game.esrb_rating,
									}}
									inCart={true}
									onAdd={() => {
										addToWishlistHandler(game);
									}}
									onRemove={() => removeFromCartHandler(game.id)}
								/>
							))}
						</ul>
						<div className={classes.summary}>
							<h2>Games Summary</h2>
							<div>
								<span>Price</span>
								<span>{cartItems.totalAmount}</span>
							</div>
							<div>
								<span>Taxes</span>
								<span>5%</span>
							</div>
							<div>
								<span>Total Price</span>
								<span>{cartItems.totalAmount + (cartItems.totalAmount * taxAmount)}</span>
							</div>
							<CTAButton>Check Out</CTAButton>
						</div>
					</div>
				) : (
					<EmptyCartList>Your cart is empty.</EmptyCartList>
				)}
			</section>
		</>
	);
};

export default CartPage;
