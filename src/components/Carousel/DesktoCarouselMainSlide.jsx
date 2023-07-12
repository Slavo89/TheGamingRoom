import { Link } from 'react-router-dom';
import classes from './DesktopCarouselMainSlide.module.scss';
import CTAButton from '../Buttons/CTAButton';
import WishlistButton from '../Buttons/WishlistButton';
import useWishlist from '../../hooks/useWishlist';
import useCart from '../../hooks/useCart';

const DesktoCarouselMainSlide = (props) => {
	const [inWishlist, wishlistHandler] = useWishlist(props.game);
	const [inCart, cartHandler] = useCart(props.game);
	// console.log(props.game);

	return (
		<Link to={`${props.game.id}`}>
			<div className={classes.leftSection}>
				<picture className={classes.image}>
					<source
						media="(min-width: 0px)"
						srcSet={props.game.background_image}
						alt="Game picture"
					/>
					<img
						src={props.game.background_image}
						alt="Game picture"
					/>
				</picture>
				<div className={classes.gameDescription}>
					<p className={classes.title}>{props.game.name}</p>
					<p className={classes.rating}>Rating: {props.game.rating}</p>
					<p className={classes.genres}>
						Genres: {props.game.genres.map((genre) => genre.name).join(', ')}
					</p>
					<p className={classes.price}>Starting at $ {props.game.metacritic}</p>

					<div className={classes.buttons}>
						<div
							className={classes.buttonContainer}
							onClick={(event) => event.preventDefault()}
						>
							<CTAButton onClick={cartHandler}>
								{!inCart ? 'Add to Cart' : 'View in Cart'}
							</CTAButton>
						</div>
						<div
							className={`${classes.buttonContainer} ${classes.wishlist}`}
							onClick={(event) => event.preventDefault()}
						>
							<WishlistButton onClick={wishlistHandler} inWishlist={inWishlist} />

							<p>{!inWishlist ? 'Add to Wishlist' : 'In Wishlist'}</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default DesktoCarouselMainSlide;
