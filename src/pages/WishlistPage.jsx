import { useState, useEffect, useRef } from 'react';
import useMediaQuery from '../hooks/use-MediaQuery';
import { FaRegQuestionCircle, FaMailBulk } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../store/wishlist-slice';
import classes from './WishilstPage.module.scss';
import OpenListButton from '../components/Buttons/OpenListButton';
import CartCard from '../components/Cards/CartCard';
import EmptyList from '../components/Layout/EmptyList';
import { cartActions } from '../store/cart-slice';

const WishlistPage = () => {
	const wishlistItems = useSelector((state) => state.wishlist.items);
	const dispatch = useDispatch();

	const [listOpen, setListOpen] = useState(false);
	const [sortBy, setSortBy] = useState('On Sale');
	const sortListRef = useRef(null);
	const is1024Px = useMediaQuery('(width >= 1024px)');
	const is770Px = useMediaQuery('(width >= 770px)');

	useEffect(() => {
		const closeListHandler = () => {
			if (listOpen === true) {
				setListOpen(false);
			} else {
				return;
			}
		};

		const handleOutsideClick = (event) => {
			if (sortListRef.current && !sortListRef.current.contains(event.target)) {
				closeListHandler();
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [listOpen]);

	const sortByHandler = () => {
		setSortBy(event.target.innerHTML);
		setListOpen(false);
	};

	const toggleListHandler = () => {
		setListOpen(!listOpen);
	};

	const addToCartHandler = (item) => {
		dispatch(
			cartActions.addItemToCart({
				key: item.id,
				id: item.id,
				name: item.name,
				price: item.price,
				img: item.img,
				esrb_rating: item.esrb_rating,
				platforms: item.platforms
			})
		);
	};

	const removeFromWishlistHandler = (itemId) => {
		dispatch(wishlistActions.removeItemFromWishlist(itemId));
	};

	return (
		<>
			<h1>Wishlist</h1>
			<section className={classes.wishlistSection}>
				<div className={classes.notificationSwitch}>
					{is770Px ? (
						<div className={classes.flexContainer}>
							<FaMailBulk className={classes.icon} />
							<p className={classes.paragraph}>
								Receive email notification about my wishlist.
							</p>
							<div className={classes.tooltip}>
								<FaRegQuestionCircle />
								<span className={classes.tooltipText}>
									Get notified when your wishlisted games go on sale, or are
									available for purshase or pre-purshase.
								</span>
							</div>
						</div>
					) : (
						<p className={classes.paragraph}>
							Receive email notification about my wishlist.
						</p>
					)}
					<label className={classes.switch}>
						<input type="checkbox" />
						<span className={classes.slider}></span>
					</label>
				</div>
				<div className={classes.sortList}>
					<span className={classes.span}>Sort By :</span>
					<div ref={sortListRef}>
						<OpenListButton
							onClick={toggleListHandler}
							onChangeText={sortBy}
							onListOpen={listOpen}
						/>
					</div>
					{listOpen && (
						<ul>
							<li
								className={classes.active}
								onClick={sortByHandler}
							>
								On Sale
							</li>
							<li onClick={sortByHandler}>Recently Added</li>
							<li onClick={sortByHandler}>Alphabetical</li>
							<li onClick={sortByHandler}>Price: Low to High</li>
							<li onClick={sortByHandler}>Price: High to Low</li>
						</ul>
					)}
				</div>

				{wishlistItems.length > 0 ? (
					<div className={classes.gameList}>
						<ul className={classes.list}>
							{wishlistItems.map((game) => (
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
									// onAdd={() => {
									// 	const gameData = addToCart(game);
									// 	dispatch(cartActions.addItemToCart(gameData));
									// }}
									// onAdd={addToCartHandler(game)}
									onRemove={() => removeFromWishlistHandler(game.id)}
								/>
							))}
						</ul>
						{is1024Px && wishlistItems.length > 0 && (
							<aside className={classes.filters}>FILTERS</aside>
						)}
					</div>
				) : (
					<EmptyList>
						You haven`t added anything to your wishlist yet.
					</EmptyList>
				)}
			</section>
		</>
	);
};

export default WishlistPage;

// const wishlistItems = [
// 	{
// 		id: 1,
// 		name: 'Dead Island 2',
// 		img:
// 			'https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360',
// 		price: 249,
// 		platforms: ['PC', 'PS5', 'Xbox'],
// 		esrb_rating: ['everyone'],
// 	},
// 	{
// 		id: 2,
// 		name: 'Dead Island 2',
// 		img:
// 			'https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360',
// 		price: 249,
// 		platforms: ['PC', 'PS5', 'Xbox', 'Apple'],
// 		esrb_rating: ['teen'],
// 	},
// 	{
// 		id: 3,
// 		name: 'Dead Island 2',
// 		img:
// 			'https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360',
// 		price: 249,
// 		platforms: ['PC', 'PS5', 'Xbox'],
// 		esrb_rating: ['mature'],
// 	},
// 	{
// 		id: 4,
// 		name: 'Dead Island 2',
// 		img:
// 			'https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360',
// 		price: 249,
// 		platforms: ['PC', 'PS5', 'Xbox'],
// 		esrb_rating: ['adult'],
// 	},
// ];

{
	/* <div className={classes.gameList}>
					<ul className={classes.list}>
						{wishlistItems.map((game) => (
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
								onRemove={() => removeFromWishlistHandler(game.id)}
							/>
						))}
					</ul>
					{is1024Px && wishlistItems.length > 0 && (
						<aside className={classes.filters}>FILTERS</aside>
					)}
				</div> */
}

{
	/* EMPTY LIST */
}
{
	/* {wishlistItems.length < 1 && (
					<div className={classes.emptyList}>
						<span>
							<FaRegSadCry className={classes.emptyIcon} />
						</span>
						<p className={classes.text}>
							You haven`t added anything to your wishlist yet.
						</p>
						<Link
							to="/"
							className={classes.link}
						>
							Shop for Games & Apps
						</Link>
					</div>
				)} */
}
