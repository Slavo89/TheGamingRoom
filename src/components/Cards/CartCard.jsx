import { Link } from 'react-router-dom';
import WishlistButton from '../Buttons/WishlistButton'
import classes from './CartCard.module.scss';
import CTAButton from '../Buttons/CTAButton';
// import { wishlistActions } from '../../store/wishlist-slice';
// import { useDispatch } from 'react-redux';


const ratings = {
	everyone: 'https://www.esrb.org/wp-content/uploads/2019/05/E.svg',
	'everyone-10-plus': 'https://www.esrb.org/wp-content/uploads/2019/05/E10plus.svg',
	teen: 'https://www.esrb.org/wp-content/uploads/2019/05/T.svg',
	mature: 'https://www.esrb.org/wp-content/uploads/2019/05/M.svg',
	adult: 'https://www.esrb.org/wp-content/uploads/2019/05/AO.svg',
};

const CartCard = (props) => {

	const {id, img, platforms, name, price, rating } = props.item
	const src = ratings[rating.slug]

	const {onRemove, onAdd} = props

	const handleClick = () => {
		onRemove(id)
	}

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
							srcSet={img}
							// srcSet="https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360"
							alt="Game picture"
						/>
						<img
							src={img}
							// src="https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360"
							alt="Game picture"
						/>
					</picture>
					<div className={classes.platform}>{platforms}</div>
				</div>

				<div className={classes.titleSection}>
					<h3 className={classes.title}>{name}</h3>
					<div className={classes.price}>$ {price}</div>
				</div>
				<picture className={classes.contentRatingSection}>
					<source
						media="(min-width: 0px)"
						srcSet={src}
						alt="ESRB Content Rating Category"
					/>
					<img
						src={src}
						alt="ESRB Content Rating Category"
					/>
				</picture>
				<div className={classes.buttonsSection}
					onClick={(event) => {
					event.preventDefault()
				}}>
					<button className={classes.removeButton} onClick={handleClick}>Remove</button>
					{props.onCart ? <WishlistButton onClick={props.onAdd}> Move to Wishlist </WishlistButton> : <CTAButton onClick={onAdd}>Add to Cart</CTAButton>}
				</div>
			</Link>
		</li>
	);
};

export default CartCard;
