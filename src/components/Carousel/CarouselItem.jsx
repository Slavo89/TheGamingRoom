import WishlistButton from '../Buttons/WishlistButton';
import classes from './CarouselItem.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { wishlistActions, addToWishlist } from '../../store/wishlist-slice';

const CarouselItem = (props) => {
	const dispatch = useDispatch();
	const [rotate, setRotate] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipText, setTooltipText] = useState('Add to Wishlist');

	const showTooltipHandler = () => {
		setShowTooltip(!showTooltip);
	};

	const addToWishlistHandler = () => {
		const gameData = addToWishlist(props);
		dispatch(wishlistActions.addItemToWishlist(gameData));
		// dispatch(
		// 	wishlistActions.addItemToWishlist({
		// 		key: props.id,
		// 		id: props.id,
		// 		name: props.name,
		// 		price: props.price,
		// 		img: props.img,
		// 		esrb_rating: props.esrb_rating,
		// 		platforms: props.platforms,
		// 	})
		// );
		// dispatch(
		// 	wishlistActions.addItemToWishlist({
		// 		key: props.id,
		// 		id: props.id,
		// 		name: props.name,
		// 		price: props.metacritic,
		// 		img: props.img,
		// 		esrb_rating: props.esrb_rating,
		// 		platforms: props.platforms
		// 					.map((item) => item.platform.name)
		// 					.join(', '),
		// 	})
		// );

		setRotate(!rotate);
		setTooltipText(rotate ? 'Add to Wishlist' : 'Remove from Wishlist');
	};

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
					{/* <button
					className={classes.button}
					onClick={addToWishlistHandler}
					onMouseEnter={showTooltipHandler}
					onMouseLeave={showTooltipHandler}
				>
					<div
						className={rotate ? `${classes.rotate}` : `${classes.rotateBack}`}
					>
						<span>
							<BsPlus />
						</span>
						<span
							className={rotate ? ` ${classes.visible}` : `${classes.check}`}
						>
							<BsCheck2 />
						</span>
					</div>
				</button> */}
					<WishlistButton
						onClick={addToWishlistHandler}
						onMouseEnter={showTooltipHandler}
						onMouseLeave={showTooltipHandler}
					/>
				</div>
				{showTooltip && <div className={classes.tooltip}>{tooltipText}</div>}
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
