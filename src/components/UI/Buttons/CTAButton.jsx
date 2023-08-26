import classes from './CTAButton.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CTAButton = (props) => {
	const isLoggedIn = useSelector((state) => state.auth.isAuthenicated);
	const navigate = useNavigate()
	const onClickHandler = () => {
		if (isLoggedIn) {
			props.onClick()
		} else {
			navigate('/register');
		}
	}

	return (
		<button
			className={classes.CTAButton}
			disabled={props.disabled}
			onClick={onClickHandler}
		>
			{props.children}
		</button>
	);
};

export default CTAButton;
