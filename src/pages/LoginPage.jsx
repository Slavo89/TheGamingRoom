import classes from './LoginPage.module.scss';

const LoginPage = () => {
	return (
		<div className={classes.loginPanel}>
			<img
				className={classes.logo}
				src="/src/assets/epicLogo.png"
				alt="logo"
				width={50}
			></img>
			<h3>Register and Log In</h3>
			<form className={classes.form}>
				<fieldset>
                    <label htmlFor="country">
                        <span>Country</span>
						<select
							id="country"
							required
							type="text"
							name="country"
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
							required
                            type="text"
						></input>
					</label>
					<label htmlFor="lastName">
						<span>Last name</span>
						<input
							id="lastName"
							required
							type="text"
						></input>
					</label>
				</fieldset>
				<fieldset>
					<label htmlFor="displayedName">
						<span>Displayed name</span>
						<input
							id="displayedName"
							required
							type="text"
						></input>
					</label>
				</fieldset>
				<fieldset>
					<label htmlFor="email">
						<span>E-mail</span>
						<input
							id="email"
							required
							type="text"
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
						></input>
					</label>
				</fieldset>
			</form>
		</div>
	);
};

export default LoginPage;
