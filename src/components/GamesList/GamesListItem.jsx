import WishlistButton from '../Buttons/WishlistButton';
import classes from './GamesListItem.module.scss';
import useWishlist from '../../hooks/useWishlist';
import { Link } from 'react-router-dom';

const GamesListItem = (props) => {
	const [inWishlist, wishlistHandler] = useWishlist(props);

	return (
		<li className={classes.gamesListItem}>
			<Link to={`${props.id}`}>
				<div className={classes.container}>
					<div className={classes.image}>
						<picture>
							<source
								media="(min-width: 0px)"
								srcSet={props.background_image}
								alt="Game picture"
								loading='lazy'
							/>
							<img
								src={props.background_image}
								alt="Game picture"
								loading='lazy'
							/>
						</picture>
						<div className={classes.buttonContainer}
						onClick={(e) => e.preventDefault()}>
							<WishlistButton
								onClick={wishlistHandler}
								inWishlist={inWishlist}
							/>
						</div>
					</div>

					<div className={classes.info}>
						<p className={classes.title}>{props.name}</p>
						<span className={classes.price}>$ {props.price}</span>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default GamesListItem;
