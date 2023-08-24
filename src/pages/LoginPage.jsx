import classes from './LoginPage.module.scss';
import CTAButton from './../components/UI/Buttons/CTAButton';
import axios from 'axios';
import {
	AiOutlineInfoCircle,
	AiFillEyeInvisible,
	AiFillEye,
	AiOutlineArrowLeft,
} from 'react-icons/ai';
import Select from 'react-select';
import { useLoaderData, json } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const countryList = useLoaderData();
	const styles = {
		control: (baseStyles, state) => ({
			...baseStyles,
			// height: '6rem',
			paddingLeft: '16.5px',
			backgroundColor: 'inherit',
			borderColor: state.isFocused ? 'var(--hover-color)' : '#505050',
			boxShadow: 'var(--hover-color)',
			fontSize: '1.4rem',
			cursor: 'text',
			transition: 'border 0.3s',
			'&:hover': {
				borderColor: 'var(--hover-color)',
			},
		}),
		valueContainer: (baseStyles) => ({
			...baseStyles,
			padding: '0',
		}),

		input: (baseStyles) => ({
			...baseStyles,
			color: 'var(--hover-color)',
			height: '6rem',
			margin: '0',
			padding: '0',
			marginLeft: '2px',
			transform: isMenuOpen ? 'translateY(6px)' : '',
		}),
		placeholder: (baseStyles) => ({
			...baseStyles,
			color: 'var(--hover-color)',
			marginTop: '11px',
		}),
		singleValue: (baseStyles, state) => ({
			...baseStyles,
			color: 'var(--hover-color)',
			borderColor: state.isSelected ? 'var(--hover-color)' : 'red',
			marginTop: '11px',
		}),
		option: (baseStyles, state) => ({
			...baseStyles,
			paddingLeft: '2rem',
			fontSize: '1.4rem',
			backgroundColor: state.isFocused || state.isSelected ? '#666' : '#505050',
			color: 'var(--hover-color)',
		}),
		menu: (baseStyles) => ({
			...baseStyles,
			backgroundColor: '#505050',
			boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.7)',
		}),
		indicatorContaier: (baseStyles) => ({
			...baseStyles,
			height: '6rem',
		}),
		dropdownIndicator: (baseStyles, state) => ({
			...baseStyles,
			color: state.isFocused || (state.isSelected && 'var(--hover-color)'),
			backgroundColor: 'inherit',
			borderRadius: '5px',
			transition: 'background-color 0.3s, transform 0.3s',
			cursor: 'pointer',
			'&:hover': {
				color: 'var(--hover-color)',
				backgroundColor: '#505050',
			},
			'& svg': {
				display: 'inline-block',
				transition: 'transform 0.3s',
				transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
			},
		}),
		menuList: (baseStyles,) => ({
			...baseStyles,
			'::-webkit-scrollbar': {
				width: '11px',
			},
			'::-webkit-scrollbar-track': {
				background: 'var(--grey-color)',
			},
			'::-webkit-scrollbar-thumb': {
				background: '#aaa',
				borderRadius: '5px',
				height: '25px'
			},
		}),
	};

	const options = [
		...countryList.map((country) => ({
			value: country.name.official,
			label: country.name.common,
		})),
	];
	options.sort((a, b) => a.label.localeCompare(b.label));

	const [displayedNameTooltipVisible, setDisplayedNameTooltipVisible] =
		useState(false);
	const [passwordTooltipVisible, setpasswordTooltipVisible] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [termsEdited, setTermsEdited] = useState(false);
	const [valid, setValid] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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

	const handleMenuOpen = () => {
		setIsMenuOpen(true);
	};

	const handleMenuClose = () => {
		setIsMenuOpen(false);
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
						<span className={classes.countrySpan}>Country</span>
						<Select
							options={options}
							defaultValue={options.find((option) => option.label === 'Poland')}
							styles={styles}
							isSearchable={true}
							onMenuOpen={handleMenuOpen}
							onMenuClose={handleMenuClose}
						/>
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

export async function loader() {
	try {
		const response = await axios.get(`https://restcountries.com/v3.1/all`);

		const data = response.data;
		// console.log(data);
		return data;
	} catch (error) {
		return json(
			{ message: 'Something went wrong.' },
			{
				status: 500,
			}
		);
	}
}
