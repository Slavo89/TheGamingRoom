import classes from './BrowsePageCard.module.scss';
import { Link } from 'react-router-dom';
import WishlistButton from '../Buttons/WishlistButton';
import useWishlist from '../../hooks/useWishlist';

const BrowsePageCard = (props) => {
	const [inWishlist, wishlistHandler] = useWishlist(props);
	
	return (
		<li className={classes.browseCard}>
			<Link
				to={`/${props.id}`}
				className={classes.link}
			>
				<div className={classes.imageSection}>
					<picture className={classes.image}>
						<source
							media="(min-width: 0px)"
							srcSet={props.background_image}
							alt="Game picture"
						/>
						<img
							src={props.background_image}
							alt="Game picture"
						/>
					</picture>
					<div
						className={classes.buttonContainer}
						onClick={(e) => e.preventDefault()}
					>
						<WishlistButton
							onClick={wishlistHandler}
							inWishlist={inWishlist}
						/>
					</div>
				</div>
			</Link>
			<div className={classes.info}>
				<div>{props.name}</div>
				<div>$ {props.price}</div>
			</div>
		</li>
	);
};

export default BrowsePageCard;
