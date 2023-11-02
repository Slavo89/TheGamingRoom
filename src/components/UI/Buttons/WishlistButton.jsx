import classes from './WishlistButton.module.scss';
import { BsPlus, BsCheck2 } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WishlistButton = (props) => {
	const isLoggedIn = useSelector((state) => state.auth.isAuthenicated);
	const navigate = useNavigate()

	const onClickHandler = () => {
		if (isLoggedIn) {
			props.onClick();
		} else {
			navigate('/register');
		}
	};
	return (
		<button
			className={classes.wishlistButton}
			onClick={() => {
				onClickHandler();
			}}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
			tabIndex="0"
			// aria-label='Add to wishlist button'
		>
			<div className={classes.container}>
				<div
					className={
						props.inWishlist
							? `${classes.spinner} ${classes.rotate}`
							: `${classes.spinner} ${classes.rotateBack}`
					}
					aria-label={!props.inWishlist ? 'Add to wishlist' : 'Remove from wishlist'}
				>
					<span>
						<BsPlus aria-hidden/>
					</span>
					<span
						className={
							props.inWishlist
								? `${classes.spinner} ${classes.visible}`
								: `${classes.spinner} ${classes.check}`
						}
					>
						<BsCheck2 aria-hidden/>
					</span>
				</div>
				{props.children}
			</div>
		</button>
	);
};

export default WishlistButton;
