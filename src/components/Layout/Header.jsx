// import React from 'react'
// import { Link } from 'react-router-dom';
import { ImUser } from 'react-icons/im';
import { useState } from 'react';
import classes from './Header.module.scss';

const Header = (props) => {
	const [navExpanded, setNavExpanded] = useState(false);
	const toggleNavbarHandler = () => {
		setNavExpanded(!navExpanded);
		// document.body.style.overflow = 'hidden'
	};


	return (
			<header className={classes.header}>
				<a className={classes.logo}>
					<img
						src="/src/assets/logo.png"
						alt="logo"
					/>
				</a>
				<nav
					className={
						navExpanded
							? `${classes.navbar} ${classes.open}`
							: `${classes.navbar}`
					}
				>
					<ul className={classes.leftNav}>
						<li className={`${classes.listItem} ${classes.active}`}>
							<a>Store</a>
						</li>
						<li className={classes.listItem}>
							<a>Distribution</a>
						</li>
						<li className={classes.listItem}>
							<a>Support</a>
						</li>
						<li className={classes.listItem}>
							<a>Unreal Engine</a>
						</li>
					</ul>
					<ul className={classes.rightNav}>
						<li className={`${classes.listItem} ${classes.profile}`}>
							<a>
								{' '}
								<ImUser className={classes.icon} />
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
