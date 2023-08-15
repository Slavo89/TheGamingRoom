import { BsFillPersonFill } from 'react-icons/bs';
import { useState } from 'react';
import classes from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import FocusTrap from 'focus-trap-react';

const Header = (props) => {
	const [navExpanded, setNavExpanded] = useState(false);
	const toggleNavbarHandler = () => {
		setNavExpanded(!navExpanded);
	};

	const closeAndNavigate = () => {
		toggleNavbarHandler();
		props.onClose();
	};

	const linkClass = ({ isActive }) => (isActive ? classes.active : '');

	return (
		<FocusTrap active={navExpanded}>
			<header className={classes.header}>
				{/* <NavLink
				className={classes.logo}
				to="/"
				end={true}
			>
				<img
					src="/src/assets/logo.png"
					alt="logo"
				/>
			</NavLink> */}

				<nav
					className={
						navExpanded
							? `${classes.navbar} ${classes.open}`
							: `${classes.navbar}`
					}
				>
					<ul className={classes.leftNav}>
						<li className={`${classes.listItem} ${classes.active}`}>
							<NavLink
								to="/"
								className={linkClass}
								onClick={closeAndNavigate}
								tabIndex="0"
							>
								Store
							</NavLink>
						</li>
						<li className={classes.listItem}>
							<NavLink
								to="/distribution"
								className={linkClass}
								onClick={closeAndNavigate}
								tabIndex="0"
							>
								Distribution
							</NavLink>
						</li>
						<li className={classes.listItem}>
							<a
								href="https://www.epicgames.com/help/"
								target="_blank"
								rel="noreferrer"
								// onClick={closeAndNavigate}
								tabIndex="0"
							>
								Support
							</a>
						</li>
						<li className={classes.listItem}>
							<a
								href="https://www.unrealengine.com/"
								target="_blank"
								rel="noreferrer"
								// onClick={closeAndNavigate}
								tabIndex="0"
							>
								Unreal Engine
							</a>
						</li>
					</ul>
					<ul className={classes.rightNav}>
						<li className={`${classes.listItem} ${classes.profile}`}>
							<a tabIndex="0">
								{' '}
								<BsFillPersonFill className={classes.icon} />
								Profile{' '}
							</a>
						</li>
						<li className={`${classes.listItem} ${classes.downloadButton}`}>
							<a tabIndex="0">Download</a>
						</li>
					</ul>
				</nav>

				<div
					className={
						navExpanded ? `${classes.menu} ${classes.close}` : `${classes.menu}`
					}
					onClick={() => {
						props.onClick();
						toggleNavbarHandler();
					}}
					onKeyPress={() => {
						props.onClick();
						toggleNavbarHandler();
					}}
					tabIndex={1}
				>
					<div></div>
				</div>
			</header>
		</FocusTrap>
	);
};

export default Header;
