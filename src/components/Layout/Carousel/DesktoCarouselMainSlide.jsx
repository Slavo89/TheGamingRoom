import { Link } from 'react-router-dom';
import classes from './DesktopCarouselMainSlide.module.scss';
import CTAButton from '../../UI/Buttons/CTAButton';
import WishlistButton from '../../UI/Buttons/WishlistButton';
import useWishlist from '../../../hooks/useWishlist';
import useCart from '../../../hooks/useCart';

const DesktoCarouselMainSlide = (props) => {
	const game = props.game;
	const [inWishlist, wishlistHandler] = useWishlist(game);
	const [inCart, cartHandler] = useCart(game);
	return (
		<Link
			to={`${game.id}`}
			className={classes.mainSlideContainer}
		>
			<div className={classes.leftSection}>
				<div className={classes.imageContainer}>
					<img
						src={game.background_image}
						alt={props.name}
						aria-label="Go to game description"
					/>
				</div>
				<div className={classes.gameDescription}>
					<p className={classes.title}>{game.name}</p>
					<p className={classes.rating}>Rating: {game.rating}</p>
					<p className={classes.genres}>Genres: {game.genres.join(', ')}</p>
					<p className={classes.price}>Starting at $ {game.price}</p>

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
							<WishlistButton
								onClick={wishlistHandler}
								inWishlist={inWishlist}
							/>

							<p>{!inWishlist ? 'Add to Wishlist' : 'In Wishlist'}</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default DesktoCarouselMainSlide;
