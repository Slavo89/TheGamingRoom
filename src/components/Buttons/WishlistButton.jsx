import classes from './WishlistButton.module.scss';
import { BsPlus, BsCheck2 } from 'react-icons/bs';
import { useState } from 'react';

const WishlistButton = (props) => {
	const [rotate, setRotate] = useState(false);
	// const [showTooltip, setShowTooltip] = useState(false);
	// const [tooltipText, setTooltipText] = useState('Add to Wishlist');

	// const showTooltipHandler = () => {
	// setShowTooltip(!showTooltip);
	// };

	const onClickHandler = () => {
		setRotate(!rotate);
		props.onClick();
	};
	return (
		<div
			className={classes.buttonContainer}
			onClick={onClickHandler}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
		>
			<button className={classes.button}>
				<div className={rotate ? `${classes.rotate}` : `${classes.rotateBack}`}>
					<span>
						<BsPlus />
					</span>
					<span className={rotate ? ` ${classes.visible}` : `${classes.check}`}>
						<BsCheck2 />
					</span>
				</div>
				{props.children}
			</button>
		</div>
	);
};

export default WishlistButton;
