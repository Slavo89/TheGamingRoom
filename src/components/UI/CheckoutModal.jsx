import {
	BsFillPersonFill,
	BsFillCreditCardFill,
	BsPaypal,
	BsBank2,
	BsXLg,
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import CTAButton from './Buttons/CTAButton';
import classes from './CheckoutModal.module.scss';
import { useState } from 'react';
import FocusTrap from 'focus-trap-react';
import { cartActions } from '../../store/cart-slice';
import { useNavigate } from 'react-router-dom';

const CheckoutModal = (props) => {
	const cartItems = useSelector((state) => state.cart);
	const username = useSelector((state) => state.auth.username);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [checkedInput, setCheckedInput] = useState('');
	const [order, setOrder] = useState(false);

	const inputCheckHandler = (event) => {
		setCheckedInput(event.target.getAttribute('value'));
	};

	const placeOrderHandler = () => {
		setOrder(true);
	};

	const onOrderHandler = () => {
		dispatch(cartActions.resetCart());
		setOrder(!order);
		props.onHide();
		navigate('/');
	};

	return (
		<div className={classes.backdrop}>
			<FocusTrap>
				<div className={classes.modal}>
					<div className={classes.label}>
						<span className={classes.labelTitle}>Order</span>
						<div className={classes.profile}>
							<BsFillPersonFill className={classes.icon} />
							<span>{username}</span>
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
										alt="game image"
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
										{cartItems.totalAmount +
											cartItems.totalAmount * props.taxAmount}{' '}
										$
									</span>
								</div>
							</li>
						</ul>
					</div>
					<div className={classes.paymentMethods}>
						<span className={classes.title}>Payment Methods</span>
						<ul className={classes.paymentList}>
							<li
								className={classes.listItem}
								tabIndex={0}
								value="Credit Card"
								onClick={inputCheckHandler}
								onKeyPress={inputCheckHandler}
							>
								<div className={classes.radio}>
									<input
										type="radio"
										name="paymentMethod"
										value="Credit Card"
										checked={checkedInput === 'Credit Card'}
										tabIndex={-1}
										readOnly
									></input>
								</div>
								<BsFillCreditCardFill />
								Credit Card
							</li>
							<li
								className={classes.listItem}
								tabIndex={0}
								value="PayPal"
								onClick={inputCheckHandler}
								onKeyPress={inputCheckHandler}
							>
								<div className={classes.radio}>
									<input
										type="radio"
										name="paymentMethod"
										value="PayPal"
										checked={checkedInput === 'PayPal'}
										tabIndex={-1}
										readOnly
									></input>
								</div>
								<BsPaypal /> PayPal
							</li>
							<li
								className={classes.listItem}
								tabIndex={0}
								value="Online Banking"
								onClick={inputCheckHandler}
								onKeyPress={inputCheckHandler}
							>
								<div className={classes.radio}>
									<input
										type="radio"
										name="paymentMethod"
										value="Online Banking"
										checked={checkedInput === 'Online Banking'}
										tabIndex={-1}
										readOnly
									></input>
								</div>
								<BsBank2 /> Online Banking
							</li>
						</ul>
					</div>
					<div className={classes.paymentAction}>
						<p className={classes.eula}>
							By clicking `Place Order`, I certify that I am 18 years of age or
							older and am an authorized user of this payment method, and agree
							to the terms of the End User License Agreement.
						</p>
						<div
							className={classes.buttonContainer}
							tabIndex={0}
						>
							<CTAButton
								disabled={!checkedInput}
								onClick={placeOrderHandler}
							>
								Place Order
							</CTAButton>
						</div>
					</div>
					{order && (
						<div className={classes.backdrop}>
							<dialog
								className={classes.dialog}
								open={order}
							>
								<p>
									Awesome! Your order is confirmed. Get ready to dive into some
									gaming fun!
								</p>
								<CTAButton onClick={onOrderHandler}>
									Go back to home page
								</CTAButton>
							</dialog>
						</div>
					)}
				</div>
			</FocusTrap>
		</div>
	);
};

export default CheckoutModal;
