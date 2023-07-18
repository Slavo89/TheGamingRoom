import { Link } from 'react-router-dom';
import WishlistButton from '../Buttons/WishlistButton';
import classes from './CartCard.module.scss';
import CTAButton from '../Buttons/CTAButton';

const ratings = {
	everyone: 'https://www.esrb.org/wp-content/uploads/2019/05/E.svg',
	'everyone-10-plus':
		'https://www.esrb.org/wp-content/uploads/2019/05/E10plus.svg',
	teen: 'https://www.esrb.org/wp-content/uploads/2019/05/T.svg',
	mature: 'https://www.esrb.org/wp-content/uploads/2019/05/M.svg',
	adult: 'https://www.esrb.org/wp-content/uploads/2019/05/AO.svg',
};

const CartCard = (props) => {
	const { id, background_image, parent_platforms, name, price, rating } =
		props.item;
	const ratingsSrc = ratings[rating.slug];

	const { onRemove, onAdd } = props;

	const handleClick = () => {
		onRemove(id);
	};

	return (
		<li className={classes.card}>
			<Link
				to={`/${id}`}
				className={classes.link}
			>
				<div className={classes.imageSection}>
					<picture className={classes.image}>
						<source
							media="(min-width: 0px)"
							srcSet={background_image}
							alt="Game picture"
						/>
						<img
							src={background_image}
							alt="Game picture"
						/>
					</picture>
					<div className={classes.platform}>{parent_platforms.join(', ')}</div>
				</div>

				<div className={classes.titleSection}>
					<h3 className={classes.title}>{name}</h3>
					<div className={classes.price}>$ {price}</div>
				</div>
				<picture className={classes.contentRatingSection}>
					<source
						media="(min-width: 0px)"
						srcSet={ratingsSrc}
						alt="ESRB Content Rating Category"
					/>
					<background_image
						src={ratingsSrc}
						alt="ESRB Content Rating Category"
					/>
				</picture>
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
						<CTAButton onClick={onAdd}>Add to Cart</CTAButton>
					)}
				</div>
			</Link>
		</li>
	);
};

export default CartCard;
