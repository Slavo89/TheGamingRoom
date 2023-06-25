import { Link } from 'react-router-dom';
import AddToCartButton from './../Buttons/AddToCartButton';
import classes from './CartCard.module.scss';


const ratings = {
	everyone: 'https://www.esrb.org/wp-content/uploads/2019/05/E.svg',
	everyone10: 'https://www.esrb.org/wp-content/uploads/2019/05/E10plus.svg',
	teen: 'https://www.esrb.org/wp-content/uploads/2019/05/T.svg',
	mature: 'https://www.esrb.org/wp-content/uploads/2019/05/M.svg',
	adult: 'https://www.esrb.org/wp-content/uploads/2019/05/AO.svg',
};

const CartCard = (props) => {
	const { rating } = props;
	const src = ratings[rating]

	return (
		<li className={classes.card}>
			<Link
				to={`/${props.id}`}
				className={classes.link}
			>
				<div className={classes.imageSection}>
					<picture className={classes.image}>
						<source
							media="(min-width: 0px)"
							srcSet={props.img}
							// srcSet="https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360"
							alt="Game picture"
						/>
						<img
							src={props.img}
							// src="https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360"
							alt="Game picture"
						/>
					</picture>
					<div className={classes.platform}>{props.platforms}</div>
				</div>

				<div className={classes.titleSection}>
					<h3 className={classes.title}>{props.name}</h3>
					<div className={classes.price}>$ {props.price}</div>
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
					<button className={classes.removeButton}>Remove</button>
					<AddToCartButton />
				</div>
			</Link>
		</li>
	);
};

export default CartCard;
