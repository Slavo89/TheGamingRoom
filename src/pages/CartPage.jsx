import classes from './CartPage.module.scss';
import CartCard from '../components/Cards/CartCard';
import CTAButton from '../components/Buttons/CTAButton';
import EmptyList from '../components/Layout/EmptyList';
import { cartActions } from '../store/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../store/wishlist-slice';

// const cartItems = [
// {
// 	id: 1,
// 	name: 'Aliens: Dark Descent',
// 	price: 140,
// 	img: 'https://cdn1.epicgames.com/offer/87b7ded137594cbbbe7b772826ec3289/EGS_AliensDarkDescent_TindalosInteractive_S2_1200x1600-23e324fbb7783cbb94d923205e2398a3?h=480&quality=medium&resize=1&w=360',
// 	esrb_rating: {
// 		slug: 'mature',
// 	},
// 	platforms: 'PC, PlayStation, Xbox',
// },
// {
// 	id: 2,
// 	name: 'Aliens: Dark Descent',
// 	price: 140,
// 	img: 'https://cdn1.epicgames.com/offer/87b7ded137594cbbbe7b772826ec3289/EGS_AliensDarkDescent_TindalosInteractive_S2_1200x1600-23e324fbb7783cbb94d923205e2398a3?h=480&quality=medium&resize=1&w=360',
// 	esrb_rating: {
// 		slug: 'mature',
// 	},
// 	platforms: 'PC, PlayStation, Xbox',
// },
// {
// 	id: 3,
// 	name: 'Aliens: Dark Descent',
// 	price: 140,
// 	img: 'https://cdn1.epicgames.com/offer/87b7ded137594cbbbe7b772826ec3289/EGS_AliensDarkDescent_TindalosInteractive_S2_1200x1600-23e324fbb7783cbb94d923205e2398a3?h=480&quality=medium&resize=1&w=360',
// 	esrb_rating: {
// 		slug: 'mature',
// 	},
// 	platforms: 'PC, PlayStation, Xbox',
// },
// {
// 	id: 190,
// 	name: 'Aliens: Dark Descent',
// 	price: 140,
// 	img: 'https://cdn1.epicgames.com/offer/87b7ded137594cbbbe7b772826ec3289/EGS_AliensDarkDescent_TindalosInteractive_S2_1200x1600-23e324fbb7783cbb94d923205e2398a3?h=480&quality=medium&resize=1&w=360',
// 	esrb_rating: {
// 		slug: 'mature',
// 	},
// 	platforms: 'PC, PlayStation, Xbox',
// },
// ];

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
					img: item.img,
					esrb_rating: item.esrb_rating,
					platforms: item.platforms,
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
										img: game.img,
										platforms: game.platforms,
										price: game.price,
										rating: game.esrb_rating,
									}}
									onCart={true}
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
					<EmptyList>Your cart is empty.</EmptyList>
				)}
			</section>
		</>
	);
};

export default CartPage;
