import classes from './DestkopCarousel.module.scss';
import DesktopCarouselItem from './DesktopCarouselItem';
import WishlistButton from '../Buttons/WishlistButton';
import { useState, useEffect } from 'react';

const DesktopCarousel = (props) => {
	const [rotate, setRotate] = useState(false);
	const [wishlistButtonText, setWishlistButtonText] = useState('Add to Wishlist');
	const [activeIndex, setActiveIndex] = useState(0);
	
	const DUMMY_GAMES = props.games;
	
	
	// setting the active carouselItem
	useEffect(() => {
		const timer = setTimeout(() => {
			setActiveIndex((prevIndex) => (prevIndex + 1) % DUMMY_GAMES.length);
		}, 10000);

		return () => {
			clearTimeout(timer);
		};
	}, [activeIndex]);

	const addToWishlistHandler = () => {
		setRotate(!rotate);
		setWishlistButtonText(rotate ? 'Add to Wishlist' : 'In Wishlist');
	};
	
	const setToActiveHandler = (index) => {
		setActiveIndex(index)
	}


	return (
		<div className={classes.desktopCarousel}>
			<div className={classes.leftSide}>
				<picture className={classes.picture}>
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
					<p>Rating: {DUMMY_GAMES[activeIndex].rating}</p>
					<p>
						Genres:{' '}
						{DUMMY_GAMES[activeIndex].genres
							.map((genre) => genre.name)
							.join(', ')}
					</p>
					<div className={classes.buttonsContainer}>
						<button className={classes.buyButton}>Buy Now</button>

						<div className={classes.wishlistButtonContainer}>
							<WishlistButton onClick={addToWishlistHandler} />
							<p>{wishlistButtonText}</p>
						</div>
					</div>
				</div>
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
							onClick={() => setToActiveHandler(index)}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default DesktopCarousel;
