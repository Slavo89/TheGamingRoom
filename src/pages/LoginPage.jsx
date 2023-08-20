import classes from './LoginPage.module.scss';
import CTAButton from './../components/UI/Buttons/CTAButton';
import { AiOutlineInfoCircle, AiFillEye } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { useEffect, useState } from 'react';

const LoginPage = () => {
	const [valid, setValid] = useState(false);

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

	const dispatch = useDispatch();

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
			// formData.password.trim() !== ''
			passwordRegex.test(formData.password)
		) {
			setValid(true);
		} else {
			setValid(false)
		}
	}, [formData]);

	const loginHandler = () => {
		dispatch(
			authActions.login({ username: formData.username, email: formData.email })
		);
		console.log(formData);
	};

	console.log('Edited', { isEdited });
	console.log('Focused', { isFocused });

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
						<span>Country</span>
						<select
							id="country"
							required
							type="text"
							name="country"
							value={formData.country}
							// onChange={handleInputChange}
						>
							<option value="country">Country</option>
						</select>
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
						<AiOutlineInfoCircle className={classes.tooltip} />
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
							// type="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
							onFocus={handleInputFocus}
						></input>
						<AiFillEye className={`${classes.tooltip} ${classes.margin}`} />
						<AiOutlineInfoCircle className={classes.tooltip} />
					</label>
				</fieldset>
				<CTAButton
					disabled={!valid}
					onClick={loginHandler}
				>
					Log In
				</CTAButton>
			</form>
		</div>
	);
};

export default LoginPage;
