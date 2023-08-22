import classes from './LoginPage.module.scss';
import CTAButton from './../components/UI/Buttons/CTAButton';
import {
	AiOutlineInfoCircle,
	AiFillEyeInvisible,
	AiFillEye,
	AiOutlineArrowLeft,
} from 'react-icons/ai';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const options = [
	{ value: 'USA', label: 'USA' },
	{ value: 'UK', label: 'UK' },
	{ value: 'Poland', label: 'Poland' },
];

const styles = {
	// menu: (baseStyles, state) => ({
	// 	...baseStyles,
	// }),
	control: (baseStyles, state) => ({
		...baseStyles,
		transition: 'border 0.3s',
		backgroundColor: 'inherit',
		borderColor: state.isFocused ? 'var(--hover-color)' : '#505050',
		boxShadow: 'var(--hover-color)',
		cursor: 'text',
		'&:hover': {
			borderColor: 'var(--hover-color)',
		},
	}),

	input: (baseStyles) => ({
		...baseStyles,
		color: 'var(--hover-color)',
	}),
	placeholder: (baseStyles) => ({
		...baseStyles,
		color: 'var(--hover-color)',
	}),
	singleValue: (baseStyles, state) => ({
		...baseStyles,
		color: 'var(--hover-color)',
		borderColor: state.isSelected ? 'var(--hover-color)' : 'red',
	}),
	option: (baseStyles, state) => ({
		...baseStyles,
		backgroundColor: state.isFocused || state.isSelected ? '#666' : '#505050',
		color: 'var(--hover-color)',
	}),
	menu: (baseStyles) => ({
		...baseStyles,
		backgroundColor: '#505050',
	}),
	dropdownIndicator: (baseStyles, state) => ({
		...baseStyles,
		color: state.isFocused || (state.isSelected && 'var(--hover-color)'),
		backgroundColor: 'inherit',
		borderRadius: '5px',
		cursor: 'pointer',
		transform: state.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
		transition: 'background-color 0.3s, transform 0.3s',
		'&:hover': {
			color: 'var(--hover-color)',
			backgroundColor: '#505050',
		},
		'& svg': {
			display: 'inline-block',
			transition: 'transform 0.3s',
			transform: state.isFocused ? 'rotate(180deg)' : 'rotate(0deg)',
		},
	}),
	// dropdownIndicator: (baseStyles, state) => {
	// 	let rotateDegrees = state.isFocused ? 180 : 0;

	// 	if (state.menuIsOpen && state.isFocused) {
	// 		rotateDegrees = 0;
	// 	}

	// 	return {
	// 		...baseStyles,
	// 		color: state.isFocused || (state.isSelected && 'var(--hover-color)'),
	// 		backgroundColor: 'inherit',
	// 		borderRadius: '5px',
	// 		cursor: 'pointer',
	// 		transform: `rotate(${rotateDegrees}deg)`,
	// 		transition: 'background-color 0.3s, transform 0.3s',
	// 		'&:hover': {
	// 			color: 'var(--hover-color)',
	// 			backgroundColor: '#505050',
	// 		},
	// 	};
	// },
	// indicatorContainer: (baseStyles, state) => ({
	// 	...baseStyles,
	// 	transform: state.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
	// 	transition: 'transform 0.3s',
	// }),
};
const LoginPage = () => {
	const [displayedNameTooltipVisible, setDisplayedNameTooltipVisible] =
		useState(false);
	const [passwordTooltipVisible, setpasswordTooltipVisible] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [termsEdited, setTermsEdited] = useState(false);
	const [valid, setValid] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const displayNameTooltipHandler = () => {
		setDisplayedNameTooltipVisible(true);
	};
	const hideNameTooltipHandler = () => {
		setDisplayedNameTooltipVisible(false);
	};
	const displayPasswordTooltipHandler = () => {
		setpasswordTooltipVisible(true);
	};
	const hidePasswordTooltipHandler = () => {
		setpasswordTooltipVisible(false);
	};

	const usernameRegex = /^.{3,}$/;
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?!.*\s).{7,}$/;

	const [formData, setFormData] = useState({
		// country: '',
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
		// termsAccepted: false,
	});

	const [isEdited, setIsEdited] = useState({
		firstName: false,
		lastName: false,
		username: false,
		email: false,
		password: false,
	});

	const [isFocused, setisFocused] = useState({
		firstName: false,
		lastName: false,
		username: false,
		email: false,
		password: false,
	});

	const handleInputFocus = (event) => {
		const { name } = event.target;
		setisFocused((prevIsFocused) => ({
			...prevIsFocused,
			[name]: true,
		}));
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleInputBlur = (event) => {
		const { name } = event.target;
		setIsEdited((prevIsEdited) => ({
			...prevIsEdited,
			[name]: true,
		}));
		setisFocused((prevIsFocused) => ({
			...prevIsFocused,
			[name]: false,
		}));
	};

	useEffect(() => {
		if (
			formData.firstName.trim() !== '' &&
			formData.lastName.trim() !== '' &&
			usernameRegex.test(formData.username) &&
			emailRegex.test(formData.email) &&
			passwordRegex.test(formData.password) &&
			termsAccepted
		) {
			setValid(true);
		} else {
			setValid(false);
		}
	}, [formData, termsAccepted]);

	const loginHandler = () => {
		dispatch(
			authActions.login({ username: formData.username, email: formData.email })
		);
		navigate(-1);
	};

	return (
		<div className={classes.loginPanel}>
			<img
				className={classes.logo}
				src="/src/assets/epicLogo.png"
				alt="logo"
				width={50}
			></img>
			<h3>Register and Log In</h3>
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}
				className={classes.form}
			>
				<fieldset>
					<label htmlFor="country">
						<Select
							options={options}
							styles={styles}
							isSearchable={true}
						/>
						{/* <span>Country</span> */}
						{/* <select
							id="country"
							type="text"
							name="country"
							value={formData.country}
							// onChange={handleInputChange}
						>
							<option value="country">Poland</option>
							<option value="country">USA</option>
							<option value="country">UK</option>
							<option value="country">Germany</option>
						</select> */}
					</label>
				</fieldset>
				<fieldset className={classes.name}>
					<label htmlFor="name">
						<span>First Name</span>
						{isEdited.firstName && !isFocused.firstName && (
							<>
								{formData.firstName.trim() === '' && (
									<p className={classes.error}>Required</p>
								)}
							</>
						)}
						<input
							id="name"
							name="firstName"
							required
							type="text"
							value={formData.firstName}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
							onFocus={handleInputFocus}
						></input>
					</label>

					<label htmlFor="lastName">
						<span>Last name</span>
						{isEdited.lastName && !isFocused.lastName && (
							<>
								{formData.lastName.trim() === '' && (
									<p className={classes.error}>Required</p>
								)}
							</>
						)}
						<input
							id="lastName"
							name="lastName"
							required
							type="text"
							value={formData.lastName}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
							onFocus={handleInputFocus}
						></input>
					</label>
				</fieldset>
				<fieldset>
					<label htmlFor="displayedName">
						<span>Displayed name</span>
						{isEdited.username && !isFocused.username && (
							<>
								{formData.username.trim() === '' && (
									<p className={classes.error}>Required</p>
								)}
								{formData.username.trim() !== '' &&
									!usernameRegex.test(formData.username) && (
										<p className={classes.error}>Too short</p>
									)}
							</>
						)}
						<input
							id="displayedName"
							name="username"
							maxLength={16}
							required
							type="text"
							value={formData.username}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
							onFocus={handleInputFocus}
						></input>
						<div
							className={classes.tooltip}
							onMouseEnter={displayNameTooltipHandler}
							onFocus={displayNameTooltipHandler}
							onMouseLeave={hideNameTooltipHandler}
							onBlur={hideNameTooltipHandler}
							tabIndex={0}
						>
							<AiOutlineInfoCircle />
						</div>
						{displayedNameTooltipVisible && (
							<p className={classes.info}>
								{' '}
								The displayed name must contain from 3 to 16 characters. It may
								contain letters, numbers, non-consecutive hyphens, periods,
								underscores and spaces.
							</p>
						)}
					</label>
				</fieldset>
				<fieldset>
					<label htmlFor="email">
						<span>E-mail</span>
						{isEdited.email && !isFocused.email && (
							<>
								{formData.email.trim() === '' && (
									<p className={classes.error}>Required</p>
								)}
								{formData.email.trim() !== '' &&
									!emailRegex.test(formData.email) && (
										<p className={classes.error}>Invalid e-mail</p>
									)}
							</>
						)}
						<input
							id="email"
							name="email"
							required
							type="text"
							value={formData.email}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
							onFocus={handleInputFocus}
						></input>
					</label>
				</fieldset>
				<fieldset>
					<label htmlFor="password">
						<span>Password</span>
						{isEdited.password && !isFocused.password && (
							<>
								{formData.password.trim() === '' && (
									<p className={classes.error}>Required</p>
								)}
								{formData.password.trim() !== '' &&
									!passwordRegex.test(formData.password) && (
										<p className={classes.error}>Invalid format</p>
									)}
							</>
						)}
						<input
							id="password"
							required
							type={!passwordVisible ? 'password' : 'text'}
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
							onFocus={handleInputFocus}
						></input>
						<div
							className={`${classes.tooltip} ${classes.margin}`}
							onClick={() => setPasswordVisible(!passwordVisible)}
							tabIndex={0}
						>
							{!passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
						</div>
						<div
							className={classes.tooltip}
							onFocus={displayPasswordTooltipHandler}
							onMouseEnter={displayPasswordTooltipHandler}
							onBlur={hidePasswordTooltipHandler}
							onMouseLeave={hidePasswordTooltipHandler}
							tabIndex={0}
						>
							<AiOutlineInfoCircle />
						</div>
						{passwordTooltipVisible && (
							<p className={classes.info}>
								{' '}
								The password must consist of at least 7 characters, 1 number and
								1 letter, and must not contain whitespaces.
							</p>
						)}
					</label>
				</fieldset>
				<fieldset>
					<label className={classes.checkLabel}>
						<div className={classes.checkbox}>
							<input
								type="checkbox"
								tabIndex={0}
							></input>
						</div>
						<p>
							I want to receive information about news, surveys and promotions
							from Epic Games.
						</p>
					</label>
				</fieldset>
				<fieldset>
					<label className={classes.checkLabel}>
						<div className={classes.checkbox}>
							<input
								type="checkbox"
								tabIndex={0}
								checked={termsAccepted}
								// onKeyPress={() =>
								// 	{setTermsEdited(true)
								// 	setTermsAccepted(!termsAccepted)}
								// }

								onChange={(event) => {
									setTermsAccepted(event.target.checked);
									setTermsEdited(true);
								}}
							></input>
						</div>
						<p>
							I am familiar with and I accept the{' '}
							<a
								href="https://www.epicgames.com/site/pl/tos?lang=en"
								target="_blank"
								rel="noreferrer"
								tabIndex={0}
							>
								Terms of Service.
							</a>
						</p>
					</label>
				</fieldset>
				{termsEdited && !termsAccepted && (
					<div className={classes.termsError}>
						<p>You must accept the Terms of Service</p>
					</div>
				)}
				<CTAButton
					disabled={!valid}
					onClick={loginHandler}
				>
					Log In
				</CTAButton>
			</form>
			<div className={classes.navigateBack}>
				<AiOutlineArrowLeft
					onClick={() => navigate(-1)}
					tabIndex={0}
				/>
			</div>
		</div>
	);
};

export default LoginPage;
