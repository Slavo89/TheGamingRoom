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
		>
			<div className={classes.container}>
				<div
					className={
						props.inWishlist
							? `${classes.spinner} ${classes.rotate}`
							: `${classes.spinner} ${classes.rotateBack}`
					}
				>
					<span>
						<BsPlus />
					</span>
					<span
						className={
							props.inWishlist
								? `${classes.spinner} ${classes.visible}`
								: `${classes.spinner} ${classes.check}`
						}
					>
						<BsCheck2 />
					</span>
				</div>
				{props.children}
			</div>
		</button>
	);
};

export default WishlistButton;
