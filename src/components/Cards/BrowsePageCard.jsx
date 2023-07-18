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
							// srcSet="https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360"
							alt="Game picture"
						/>
						<img
							src={props.background_image}
							// src="https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360"
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
