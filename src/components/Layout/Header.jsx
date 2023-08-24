import { BsFillPersonFill } from 'react-icons/bs';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './Header.module.scss';
import FocusTrap from 'focus-trap-react';
import { useEffect } from 'react';

const Header = (props) => {
	const username = useSelector(state => state.auth.username);
	const location = useLocation()
	const [navExpanded, setNavExpanded] = useState(false);
	const toggleNavbarHandler = () => {
		setNavExpanded(!navExpanded);
	};

	const closeAndNavigate = () => {
		toggleNavbarHandler();
		props.onClose();
	};

	useEffect(() => {
		setNavExpanded(false)
	}, [location])

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
							<NavLink
								to="/register"
								tabIndex="0"
							>
								{' '}
								<BsFillPersonFill className={classes.icon} />
								{username ? username : 'Log In'}{' '}
							</NavLink>
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
