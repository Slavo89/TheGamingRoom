import WishlistButton from '../../UI/Buttons/WishlistButton';
import classes from './CarouselItem.module.scss';
import { useState } from 'react';
import useWishlist from '../../../hooks/useWishlist';
import { Link } from 'react-router-dom';

const CarouselItem = (props) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const showTooltipHandler = () => {
		setShowTooltip(!showTooltip);
	};

	const [inWishlist, wishlistHandler] = useWishlist(props);

	return (
		<Link to={`${props.id}`} className={classes.carouselContainer} tabIndex={-1} aria-label=''>
			<div className={classes.carouselItem}>
				<picture aria-hidden>
					<source
						media="(min-width: 0px)"
						srcSet={props.background_image}
						alt={props.name}
						loading="lazy"
						aria-hidden
					/>
					<img
						src={props.background_image}
						alt={props.name}
						loading="lazy"
					/>
				</picture>

				<div
					className={classes.buttonContainer}
					onClick={(event) => event.preventDefault()}
					aria-label={props.name}
				>
					<WishlistButton
						onClick={wishlistHandler}
						inWishlist={inWishlist}
						onMouseEnter={showTooltipHandler}
						onMouseLeave={showTooltipHandler}
						aria-label={props.name}
						// aria-hidden
					/>
				</div>
				{showTooltip && (
					<div className={classes.tooltip} aria-hidden>
						{!inWishlist ? 'Add to Wishlist' : 'Remove from Wishlist'}
					</div>
				)}
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
