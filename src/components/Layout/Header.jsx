import { BsFillPersonFill } from 'react-icons/bs';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './Header.module.scss';
import FocusTrap from 'focus-trap-react';
import { useEffect } from 'react';
import useMediaQuery from '../../hooks/use-MediaQuery';

const Header = (props) => {
	const username = useSelector((state) => state.auth.username);
	const isLoggedIn = useSelector((state) => state.auth.isAuthenicated);
	const location = useLocation();
	const [navExpanded, setNavExpanded] = useState(false);
	const [dropdownMenu, setDropdownMenu] = useState(false);
	const is800px = useMediaQuery('(width >= 800px)');

	const dropdownMenuHandler = () => {
		setDropdownMenu(!dropdownMenu);
	};

	const toggleNavbarHandler = () => {
		setNavExpanded(!navExpanded);
	};

	const closeAndNavigate = () => {
		toggleNavbarHandler();
		props.onClose();
	};

	const logoutHandler = () => {
		window.location.reload();
		// dispatch(authActions.logout());
	};

	useEffect(() => {
		setNavExpanded(false);
	}, [location]);

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
								tabIndex="0"
							>
								Unreal Engine
							</a>
						</li>
					</ul>
					{!is800px ? (
						<ul className={classes.rightNav}>
							{!isLoggedIn ? (
								<li className={`${classes.listItem} ${classes.profile}`}>
									<NavLink
										to="/register"
										tabIndex="0"
									>
										
										<BsFillPersonFill className={classes.icon} />
										Log In
									</NavLink>
								</li>
							) : (
								<>
									<li className={`${classes.listItem} ${classes.profile}`}>
										<div>
											{' '}
											<BsFillPersonFill className={classes.icon} />
											{username}{' '}
										</div>
									</li>

									<li
										className={`${classes.listItem} ${classes.logoutButton}`}
										onClick={logoutHandler}
									>
										<button>Log Out</button>
									</li>
								</>
							)}
						</ul>
					) : (
						<div className={classes.rightNav}>
							{!isLoggedIn ? (
								<div className={`${classes.listItem} ${classes.profile}`}>
									<NavLink
										to="/register"
										tabIndex="0"
									>
										{' '}
										<BsFillPersonFill className={classes.icon} />
										{'Log In'}{' '}
									</NavLink>
								</div>
							) : (
								<ul
									className={classes.rightNav}
									onMouseEnter={dropdownMenuHandler}
									onMouseLeave={dropdownMenuHandler}
								>
									<li
										tabIndex="0"
										className={`${classes.listItem} ${classes.profile}`}
									>
										{' '}
										<BsFillPersonFill className={classes.icon} />
										{username}{' '}
									</li>
									{dropdownMenu && (
										<>
											<li
												className={`${classes.listItem} ${classes.logoutButton}`}
												onClick={logoutHandler}
											>
												<button>Log Out</button>
											</li>
										</>
									)}
								</ul>
							)}
						</div>
					)}
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
