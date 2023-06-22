import classes from './DestkopCarousel.module.scss';
import DesktopCarouselItem from './DesktopCarouselItem';
import WishlistButton from '../Buttons/WishlistButton';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../Buttons/AddToCartButton';

const DesktopCarousel = (props) => {
	const [rotate, setRotate] = useState(false);
	const [wishlistButtonText, setWishlistButtonText] =
		useState('Add to Wishlist');
	const [activeIndex, setActiveIndex] = useState(0);
	const [animate, setAnimate] = useState(false);

	const DUMMY_GAMES = props.games;
	const timeoutRef = useRef(null);

	// setting the active carouselItem
	useEffect(() => {
		clearTimeout(timeoutRef.current);
		const timer = setTimeout(() => {
			setActiveIndex((prevIndex) => (prevIndex + 1) % DUMMY_GAMES.length);
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
	}, [activeIndex, animate]);

	const addToWishlistHandler = () => {
		setRotate(!rotate);
		setWishlistButtonText(rotate ? 'Add to Wishlist' : 'In Wishlist');
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
				<Link to={`${DUMMY_GAMES[activeIndex].id}`}>
					<div className={classes.leftSide}>
						<picture className={classes.image}>
							<source
								media="(min-width: 0px)"
								srcSet={DUMMY_GAMES[activeIndex].background_image}
								alt="Game picture"
							/>
							<img
								src={DUMMY_GAMES[activeIndex].background_image}
								alt="Game picture"
							/>
						</picture>
						<div className={classes.gameDescription}>
							<p className={classes.title}>{DUMMY_GAMES[activeIndex].name}</p>
							<p className={classes.rating}>
								Rating: {DUMMY_GAMES[activeIndex].rating}
							</p>
							<p className={classes.genres}>
								Genres:{' '}
								{DUMMY_GAMES[activeIndex].genres
									.map((genre) => genre.name)
									.join(', ')}
							</p>
							<p className={classes.price}>
								Starting at $ {DUMMY_GAMES[activeIndex].metacritic}
							</p>

							<div className={classes.buttons}>
								<div
									className={classes.buttonContainer}
									onClick={(event) => event.preventDefault()}
								>
									<AddToCartButton />
								</div>
								<div
									className={`${classes.buttonContainer} ${classes.wishlist}`}
									onClick={(event) => event.preventDefault()}
								>
									<WishlistButton onClick={addToWishlistHandler} />

									<p>{wishlistButtonText}</p>
								</div>
							</div>
						</div>
					</div>
				</Link>
			</div>
			<div className={classes.rightSide}>
				<ul className={classes.desktopCarouselList}>
					{DUMMY_GAMES.map((game, index) => (
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
