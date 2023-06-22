import { BsFillPersonFill } from 'react-icons/bs';
import { useState } from 'react';
import classes from './Header.module.scss';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
	const [navExpanded, setNavExpanded] = useState(false);
	const toggleNavbarHandler = () => {
		setNavExpanded(!navExpanded);
	};

	const closeAndNavigate = () => {
		toggleNavbarHandler();
		props.onClose()
	}

	const linkClass = ({ isActive }) => (isActive ? classes.active : '');

	return (
		<header className={classes.header}>
			<NavLink
				className={classes.logo}
				to="/"
				end={true}
			>
				<img
					src="/src/assets/logo.png"
					alt="logo"
				/>
			</NavLink>
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
						>
							Store
						</NavLink>
					</li>
					<li className={classes.listItem}>
						<NavLink
							to="/distribution"
							className={linkClass}
							onClick={closeAndNavigate}
						>
							Distribution
						</NavLink>
					</li>
					<li className={classes.listItem}>
						<a
							to="https://www.epicgames.com/help/"
							target="_blank"
							onClick={closeAndNavigate}
						>
							Support
						</a>
					</li>
					<li className={classes.listItem}>
						<a
							to="https://www.unrealengine.com/"
							target="_blank"
							onClick={closeAndNavigate}
						>
							Unreal Engine
						</a>
					</li>
				</ul>
				<ul className={classes.rightNav}>
					<li className={`${classes.listItem} ${classes.profile}`}>
						<a>
							{' '}
							<BsFillPersonFill className={classes.icon} />
							Profile{' '}
						</a>
					</li>
					<li className={`${classes.listItem} ${classes.downloadButton}`}>
						<a>Download</a>
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
			>
				<div></div>
			</div>
		</header>
	);
};

export default Header;
