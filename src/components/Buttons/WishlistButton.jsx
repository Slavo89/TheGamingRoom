import classes from './WishlistButton.module.scss';
import { BsPlus, BsCheck2 } from 'react-icons/bs';
// import { useState } from 'react';

const WishlistButton = (props) => {
	// const [rotate, setRotate] = useState(false);
	// const [showTooltip, setShowTooltip] = useState(false);
	// const [tooltipText, setTooltipText] = useState('Add to Wishlist');
	// const showTooltipHandler = () => {
	// setShowTooltip(!showTooltip);
	// };

	const onClickHandler = () => {
		// setRotate(!rotate);
		props.onClick();
	};
	return (
		<button
			className={classes.wishlistButton}
			onClick={() => {
				onClickHandler();
			}}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
			tabIndex='0'
		>
			<div
				className={classes.container}
			>
				<div className={props.inWishlist ? `${classes.spinner} ${classes.rotate}` : `${classes.spinner} ${classes.rotateBack}`}>
					<span>
						<BsPlus />
					</span>
					<span className={props.inWishlist ? `${classes.spinner} ${classes.visible}` : `${classes.spinner} ${classes.check}`}>
						<BsCheck2 />
					</span>
				</div>
				{props.children}
			</div>
		</button>
	);
};

export default WishlistButton;
