import classes from './DestkopCarousel.module.scss';
import DesktopCarouselItem from './DesktopCarouselItem';
import WishlistButton from '../Buttons/WishlistButton';
import { useState, useEffect, useRef } from 'react';
import useWishlist from '../../hooks/useWishlist';
import { Link } from 'react-router-dom';
import CTAButton from '../Buttons/CTAButton';

import { useDispatch, useSelector } from 'react-redux';
// import { wishlistActions, addToWishlist } from '../../store/wishlist-slice';
import { cartActions, addToCart } from '../../store/cart-slice';

const DesktopCarousel = (props) => {
	const dispatch = useDispatch();
	// const wishlistItems = useSelector((state) => state.wishlist.items);
	// const [inWishlist, setInWishlist] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [animate, setAnimate] = useState(false);

	const GAMES = props.games;
	const timeoutRef = useRef(null);

	// setting the active carouselItem
	useEffect(() => {
		clearTimeout(timeoutRef.current);
		const timer = setTimeout(() => {
			setActiveIndex((prevIndex) => (prevIndex + 1) % GAMES.length);
			setAnimate(true);
		}, 7000);

		if (animate) {
			const animationTimer = setTimeout(() => {
				setAnimate(false);
			}, 500);

			return () => {
				clearTimeout(timer);
				clearTimeout(animationTimer);
			};
		}

		return () => {
			clearTimeout(timer);
		};
	}, [animate]);
	const [inWishlist, wishlistHandler] = useWishlist(GAMES[activeIndex]);

	// useEffect(() => {
	// 	const itemInWishlist = wishlistItems.some(
	// 		(item) => item.id === GAMES[activeIndex].id
	// 	);
	// 	if (itemInWishlist) {
	// 		setInWishlist(true);
	// 	}
	// }, [GAMES[activeIndex].id, wishlistItems]);

	// const wishlistHandler = () => {
	// 	if (!inWishlist) {
	// 		const gameData = addToWishlist(GAMES[activeIndex]);
	// 		dispatch(wishlistActions.addItemToWishlist(gameData));

	// 		setInWishlist(true);
	// 	} else {
	// 		dispatch(wishlistActions.removeItemFromWishlist(GAMES[activeIndex].id));
	// 		setInWishlist(false);
	// 	}
	// };
	const addToCartHandler = () => {
		const gameData = addToCart(GAMES[activeIndex]);
		dispatch(cartActions.addItemToCart(gameData));
	};

	const setToActiveHandler = (index) => {
		setActiveIndex(index);
		setAnimate(true);

		// reseting animation
		// setTimeout(() => {
		// 	setAnimate(false);
		// }, 500);
	};

	return (
		<div className={classes.desktopCarousel}>
			<div
				className={` ${
					animate
						? `${classes.container} ${classes.animate}`
						: `${classes.container}`
				}`}
			>
				<Link to={`${GAMES[activeIndex].id}`}>
					<div className={classes.leftSection}>
						<picture className={classes.image}>
							<source
								media="(min-width: 0px)"
								srcSet={GAMES[activeIndex].background_image}
								alt="Game picture"
							/>
							<img
								src={GAMES[activeIndex].background_image}
								alt="Game picture"
							/>
						</picture>
						<div className={classes.gameDescription}>
							<p className={classes.title}>{GAMES[activeIndex].name}</p>
							<p className={classes.rating}>
								Rating: {GAMES[activeIndex].rating}
							</p>
							<p className={classes.genres}>
								Genres:{' '}
								{GAMES[activeIndex].genres
									.map((genre) => genre.name)
									.join(', ')}
							</p>
							<p className={classes.price}>
								Starting at $ {GAMES[activeIndex].metacritic}
							</p>

							<div className={classes.buttons}>
								<div
									className={classes.buttonContainer}
									onClick={(event) => event.preventDefault()}
								>
									<CTAButton onClick={addToCartHandler}>Add to Cart</CTAButton>
								</div>
								<div
									className={`${classes.buttonContainer} ${classes.wishlist}`}
									onClick={(event) => event.preventDefault()}
								>
									<WishlistButton onClick={wishlistHandler} />

									<p>{!inWishlist ? 'Add to Wishlist' : 'In Wishlist'}</p>
								</div>
							</div>
						</div>
					</div>
				</Link>
			</div>
			<div className={classes.rightSection}>
				<ul className={classes.desktopCarouselList}>
					{GAMES.map((game, index) => (
						<DesktopCarouselItem
							key={game.id}
							id={game.id}
							name={game.name}
							img={game.background_image}
							isActive={index === activeIndex}
							onClick={() => {
								setToActiveHandler(index);
							}}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default DesktopCarousel;

// dispatch(
// 	wishlistActions.addItemToWishlist({
// 		key: GAMES[activeIndex].id,
// 		id: GAMES[activeIndex].id,
// 		name: GAMES[activeIndex].name,
// 		price: GAMES[activeIndex].metacritic,
// 		img: GAMES[activeIndex].background_image,
// 		esrb_rating: GAMES[activeIndex].esrb_rating,
// 		platforms: GAMES[activeIndex].parent_platforms
// 			.map((item) => item.platform.name)
// 			.join(', '),
// 	})
// );
