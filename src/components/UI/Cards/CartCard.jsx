import { Link } from 'react-router-dom';
import useCart from '../../../hooks/useCart';
import WishlistButton from '../Buttons/WishlistButton';
import classes from './CartCard.module.scss';
import CTAButton from '../Buttons/CTAButton';
import { platforms, ratings } from './../../../data/iconsSRC';

const CartCard = (props) => {
	const [inCart, cartHandler] = useCart(props.item);
	const { id, background_image, parent_platforms, name, price, esrb_rating } =
		props.item;
	const ratingsSrc = ratings[esrb_rating.slug];
	// const { onRemove } = props;

	const handleClick = () => {
		props.onRemove(id);
	};

	return (
		<li className={classes.card}>
			<Link
				to={`/${id}`}
				className={classes.link}
			>
				<div className={classes.imageSection}>
					<div className={classes.imageContainer}>
						<img
							src={background_image}
							alt={props.name}
							loading="lazy"
							aria-label="Game cover"
						/>
					</div>

					<div className={classes.platforms}>
						{parent_platforms.map((platform) => (
							<img
								key={platform}
								src={platforms[platform]}
								height={16}
								className={classes.icon}
								aria-label={platform}
							></img>
						))}
					</div>
				</div>

				<div className={classes.titleSection}>
					<h3 className={classes.title}>{name}</h3>
					<div className={classes.price}>$ {price}</div>
				</div>
				<div className={classes.contentRatingSection}>
					<img
						src={ratingsSrc}
						alt="ESRB Content Rating Category"
						aria-hidden
					/>
				</div>
				<div
					className={classes.buttonsSection}
					onClick={(event) => {
						event.preventDefault();
					}}
				>
					<button
						className={classes.removeButton}
						onClick={handleClick}
					>
						Remove
					</button>
					{props.inCart ? (
						<WishlistButton onClick={props.onAdd}>
							{' '}
							Move to Wishlist{' '}
						</WishlistButton>
					) : (
						<CTAButton onClick={cartHandler}>
							{!inCart ? 'Add to Cart' : 'View in Cart'}
						</CTAButton>
					)}
				</div>
			</Link>
		</li>
	);
};

export default CartCard;
