import {
	BsFillPersonFill,
	BsFillCreditCardFill,
	BsPaypal,
	BsBank2,
	BsXLg,
} from 'react-icons/bs';
import { useSelector } from 'react-redux';
import CTAButton from './Buttons/CTAButton';
import classes from './CheckoutModal.module.scss';

const CheckoutModal = (props) => {
	const cartItems = useSelector((state) => state.cart);
	
	// document.body.classList.add('unscrollable');

	const taxAmount = props.tax; // props.taxAmount
	return (
		<div className={classes.backdrop}>
			<div className={classes.modal}>
				<div className={classes.label}>
					<span className={classes.labelTitle}>Order</span>
					<div className={classes.profile}>
						<BsFillPersonFill className={classes.icon} />
						<span>Profile</span>
						<button
							className={classes.closeBtn}
							onClick={props.onHide}
						>
							<BsXLg />
						</button>
					</div>
				</div>
				<div className={classes.summaryLabel}>
					<span className={classes.title}>Summary</span>{' '}
					<button
						className={classes.closeBtn}
						onClick={props.onHide}
					>
						<BsXLg />
					</button>
				</div>
				<div className={classes.mainContent}>
					<ul className={classes.cartList}>
						{cartItems.items.map((game) => (
							<li
								key={game.id}
								className={classes.listItem}
							>
								<img
									src={game.background_image}
									height={120}
									width={80}
									className={classes.image}
								></img>
								<div>
									<div className={classes.gameTitle}>{game.name}</div>
									<div>{game.price} $</div>
								</div>
							</li>
						))}
						<li className={`${classes.listItem} ${classes.summary}`}>
							<div>
								<span>Price</span>
								<span>{cartItems.totalAmount} $</span>
							</div>
							<div>
								<span>Taxes</span>
								<span>5%</span>
							</div>
							<div className={classes.totalPrice}>
								<span>Total Price</span>
								<span>
									{cartItems.totalAmount + cartItems.totalAmount * taxAmount} $
								</span>
							</div>
						</li>
					</ul>
				</div>
				<div className={classes.paymentMethods}>
					<span className={classes.title}>Payment Methods</span>
					<ul className={classes.paymentList}>
						<li className={classes.listItem}>
							<div className={classes.radio}>
								<input
									type="radio"
									name="paymentMethod"
								></input>
							</div>
							<BsFillCreditCardFill />
							Credit Card
						</li>
						<li className={classes.listItem}>
							<div className={classes.radio}>
								<input
									type="radio"
									name="paymentMethod"
								></input>
							</div>
							<BsPaypal /> PayPal
						</li>
						<li className={classes.listItem}>
							<div className={classes.radio}>
								<input
									type="radio"
									name="paymentMethod"
								></input>
							</div>
							<BsBank2 /> Online Banking
						</li>
					</ul>
				</div>
				<div className={classes.paymentAction}>
					<p className={classes.eula}>
						By clicking `Place Order`, I certify that I am 18 years of age or
						older and am an authorized user of this payment method, and agree to
						the terms of the End User License Agreement.
					</p>
					<div className={classes.buttonContainer}>
						<CTAButton>Place Order</CTAButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutModal;
