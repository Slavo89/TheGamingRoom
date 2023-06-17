import classes from './CarouselItem.module.scss';
import { useState } from 'react';
import WishlistButton from '../Buttons/WishlistButton';

const CarouselItem = (props) => {
	const [rotate, setRotate] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipText, setTooltipText] = useState('Add to Wishlist');

	const showTooltipHandler = () => {
		setShowTooltip(!showTooltip);
	};

	const addToWishlistHandler = () => {
		setRotate(!rotate);
		setTooltipText(rotate ? 'Add to Wishlist' : 'Remove from Wishlist');
	};


	return (
		<div className={classes.carouselItem}>
			<picture>
				<source
					media="(min-width: 0px)"
					// srcSet="https://cdn2.unrealengine.com/egs-jedi-survivor-carousel-mobile-1200x1600-1c09f31797fd.jpg"
					srcSet={props.img}
					alt="Game picture"
				/>
				<img
					// src="https://cdn2.unrealengine.com/egs-jedi-survivor-carousel-mobile-1200x1600-1c09f31797fd.jpg"
					src={props.img}
					alt="Game picture"
				/>
			</picture>

			<div className={classes.buttonContainer}>
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
	);
};

export default CarouselItem;
