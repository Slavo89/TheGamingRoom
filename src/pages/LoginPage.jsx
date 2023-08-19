import classes from './LoginPage.module.scss';
import CTAButton from './../components/UI/Buttons/CTAButton';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { useEffect, useState } from 'react';

const LoginPage = () => {
	const [valid, setValid] = useState(false);

	const usernameRegex = /^.{3,}$/;

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

	const dispatch = useDispatch();

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
	};

	useEffect(() => {
		if (
			formData.firstName.trim() !== '' &&
			formData.lastName.trim() !== '' &&
			usernameRegex.test(formData.username) &&
			formData.email.trim() !== '' &&
			formData.password.trim() !== ''
		) {
			setValid(true);
		}
	}, [formData]);

	const loginHandler = () => {
		dispatch(
			authActions.login({ username: formData.username, email: formData.email })
		);
		console.log(formData);
	};

	console.log(isEdited, formData);

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
							onChange={handleInputChange}
						>
							<option value="country">Country</option>
						</select>
					</label>
				</fieldset>
				<fieldset className={classes.name}>
					<label htmlFor="name">
						<span>First Name</span>
						<input
							id="name"
							name="firstName"
							required
							type="text"
							value={formData.firstName}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
						></input>
					</label>
					<label htmlFor="lastName">
						<span>Last name</span>
						<input
							id="lastName"
							name="lastName"
							required
							type="text"
							value={formData.lastName}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
						></input>
					</label>
				</fieldset>
				<fieldset>
					<label htmlFor="displayedName">
						<span>Displayed name</span>
						<input
							id="displayedName"
							name="username"
							maxLength={16}
							required
							type="text"
							value={formData.username}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
						></input>
					</label>
					{isEdited.username && !usernameRegex.test(formData.username) ? (
						<p>Too short</p>
					) : (
						''
					)}
				</fieldset>
				<fieldset>
					<label htmlFor="email">
						<span>E-mail</span>
						<input
							id="email"
							name="email"
							required
							type="text"
							value={formData.email}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
						></input>
					</label>
				</fieldset>
				<fieldset>
					<label htmlFor="password">
						<span>Password</span>
						<input
							id="password"
							required
							type="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
						></input>
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
