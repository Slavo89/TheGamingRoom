import { BsFillPersonFill } from 'react-icons/bs';
import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import classes from './Header.module.scss';
import FocusTrap from 'focus-trap-react';
import { useEffect } from 'react';
import useMediaQuery from '../../hooks/use-MediaQuery';
import { wishlistActions } from '../../store/wishlist-slice';
import { cartActions } from '../../store/cart-slice';

const Header = (props) => {
	const username = useSelector((state) => state.auth.username);
	const isLoggedIn = useSelector((state) => state.auth.isAuthenicated);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
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
		dispatch(wishlistActions.resetWishlist());
		dispatch(cartActions.resetCart());
		dispatch(authActions.logout());
		navigate('/');
	};

	useEffect(() => {
		setNavExpanded(false);
	}, [location]);

	const linkClass = ({ isActive }) => (isActive ? classes.active : '');

	return (
		<FocusTrap
			active={navExpanded}
			focusTrapOptions={{
				clickOutsideDeactivates: true,

				onDeactivate: () => {
					setNavExpanded(false);
					props.onClose();
				},
			}}
		>
			<header className={classes.header}>
				<Link
					to={'/'}
					className={classes.logo}
					tabIndex={0}
				>
					<img
						src="../../assets/logo.png"
						alt="logo"
						height={45}
					></img>
				</Link>

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
								tabIndex={navExpanded || is800px ? 0 : -1}
							>
								Store
							</NavLink>
						</li>
						<li className={classes.listItem}>
							<NavLink
								to="/distribution"
								className={linkClass}
								onClick={closeAndNavigate}
								tabIndex={navExpanded || is800px ? 0 : -1}
							>
								Distribution
							</NavLink>
						</li>
						<li className={classes.listItem}>
							<a
								href="https://www.epicgames.com/help/"
								target="_blank"
								rel="noreferrer"
								tabIndex={navExpanded || is800px ? 0 : -1}
							>
								Support
							</a>
						</li>
						<li className={classes.listItem}>
							<a
								href="https://www.unrealengine.com/"
								target="_blank"
								rel="noreferrer"
								tabIndex={navExpanded || is800px ? 0 : -1}
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
										tabIndex={navExpanded ? 0 : -1}
										onClick={closeAndNavigate}
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
										tabIndex={0}
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
										tabIndex={0}
										className={`${classes.listItem} ${classes.profile}`}
									>
										{' '}
										<BsFillPersonFill className={classes.icon} />
										{username}{' '}
									</li>
									{dropdownMenu && (
										<li
											className={`${classes.listItem} ${classes.logoutButton}`}
											onClick={logoutHandler}
										>
											<button>Log Out</button>
										</li>
									)}
								</ul>
							)}
						</div>
					)}
				</nav>
				<div
					tabIndex={0}
					className={
						!navExpanded
							? `${classes.menu} `
							: `${classes.menu} ${classes.close}`
					}
					onClick={() => {
						props.onClick();
						toggleNavbarHandler();
					}}
					onKeyPress={() => {
						props.onClick();
						toggleNavbarHandler();
					}}
				>
					<div></div>
				</div>
			</header>
		</FocusTrap>
	);
};

export default Header;
