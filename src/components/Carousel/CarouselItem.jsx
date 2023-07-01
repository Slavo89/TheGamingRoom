import WishlistButton from '../Buttons/WishlistButton';
import classes from './CarouselItem.module.scss';
import { useState } from 'react';
import useWishlist from '../../hooks/useWishlist';
import { Link } from 'react-router-dom';

// import { useDispatch } from 'react-redux';
// import { wishlistActions, addToWishlist } from '../../store/wishlist-slice';

const CarouselItem = (props) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const showTooltipHandler = () => {
		setShowTooltip(!showTooltip);
	};

	const [inWishlist, wishlistHandler] = useWishlist(props);

	// const addToWishlistHandler = () => {
	// 	const gameData = addToWishlist(props);
	// 	dispatch(wishlistActions.addItemToWishlist(gameData));

	// 	setRotate(!rotate);
	// 	setTooltipText(rotate ? 'Add to Wishlist' : 'Remove from Wishlist');
	// };

	return (
		<Link to={`${props.id}`}>
			<div className={classes.carouselItem}>
				<picture>
					<source
						media="(min-width: 0px)"
						// srcSet="https://cdn2.unrealengine.com/egs-jedi-survivor-carousel-mobile-1200x1600-1c09f31797fd.jpg"
						srcSet={props.background_image}
						alt="Game picture"
					/>
					<img
						// src="https://cdn2.unrealengine.com/egs-jedi-survivor-carousel-mobile-1200x1600-1c09f31797fd.jpg"
						src={props.background_image}
						alt="Game picture"
					/>
				</picture>

				<div
					className={classes.buttonContainer}
					onClick={(event) => event.preventDefault()}
				>
					<WishlistButton
						onClick={wishlistHandler}
						onMouseEnter={showTooltipHandler}
						onMouseLeave={showTooltipHandler}
					/>
				</div>
				{showTooltip && <div className={classes.tooltip}>{!inWishlist ? 'Add to Wishlist' : 'Remove from Wishlist'}</div>}
				<div className={classes.itemDescription}>
					<p className={classes.title}>{props.name}</p>
					<p>Rating: {props.rating}</p>
					<p>Genres: {props.genres.join(', ')}</p>
					<p className={classes.price}>Starting at $ {props.price}</p>
				</div>
			</div>
		</Link>
	);
};

export default CarouselItem;
