import { useState } from 'react';
import useMediaQuery from './../../hooks/use-MediaQuery.js';
import classes from './ActionsBar.module.scss';
import {
	BsSearch,
	BsCheckCircle,
	BsCart2,
	// BsChevronDown,
	BsXLg,
} from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import OpenListButton from '../Buttons/OpenListButton.jsx';

const ActionsBar = (props) => {
	const [searchPanelOpen, setSearchPanelOpen] = useState(false);
	const [listOpen, setListOpen] = useState(false);

	const [pageName, setPageName] = useState('Discover'); // ADD RESET AT CHANGING SITES

	const changePageName = () => {
		setPageName(event.target.innerHTML);
		setListOpen(false);
		props.onClose();
	};
	
	const toggleSearchPanelHandler = () => {
		setSearchPanelOpen(!searchPanelOpen);
		props.onClick();
	};

	const toggleListHandler = () => {
		props.onClick();
		setListOpen(!listOpen);
	};
	
	const is1024Px = useMediaQuery('(width >= 1024px)');
	const is1280Px = useMediaQuery('(width >= 1280px)');

	const linkClass = ({ isActive }) => (isActive ? classes.active : '');
	const searchButton = (
		<button type="button"
		className={classes.searchButton}>
			<BsSearch />
		</button>
	);

	const mainBarList = (
		<div className={classes.actionNav}>
			<ul className={classes.actionList}>
				<li>
					<NavLink
						className={linkClass}
						to="/"
						onClick={changePageName}
						end={true}
					>
						Discover
					</NavLink>
				</li>
				<li>
					<NavLink
						className={linkClass}
						to="/browse"
						onClick={changePageName}
					>
						Browse
					</NavLink>
				</li>
				<li>
					<NavLink
						className={linkClass}
						to="/news"
						onClick={changePageName}
					>
						News
					</NavLink>
				</li>
			</ul>
		</div>
	);

	return (
		<div className={classes.actionsBar}>
			{!is1024Px ? (
				<div className={classes.searchBarSmall}>
					<button
						type="button"
						className={classes.searchButton}
						onClick={toggleSearchPanelHandler}
					>
						<BsSearch />
					</button>
					{searchPanelOpen && (
						<div className={classes.searchPanel}>
							{searchButton}

							<input
								className={classes.searchInput}
								placeholder="Search store"
							></input>
							<button
								type="button"
								onClick={toggleSearchPanelHandler}
								className={classes.closeButton}
							>
								<BsXLg />
							</button>
						</div>
					)}
				</div>
			) : (
				<div className={classes.searchBarLarge}>
					<div className={classes.searchBarContainer}>
						{searchButton}
						<input
							className={classes.searchInput}
							placeholder="Search store"
						></input>
					</div>
				</div>
			)}
			<div className={classes.mainBar}>
				{!is1280Px ? (
					<OpenListButton
						onClick={toggleListHandler}
						onChangeText={pageName}
						onListOpen={listOpen}
					/>
				) : (
					mainBarList
				)}
			</div>

			<div className={classes.rightBar}>
				<NavLink
					to="/wishlist"
					className={({ isActive }) =>
						isActive ? `${classes.active} ${classes.link}` : classes.link
					}
				>
					{!is1024Px ? <BsCheckCircle /> : <span>Wishlist</span>}
				</NavLink>
				<NavLink
					to="/cart"
					className={({ isActive }) =>
						isActive ? `${classes.active} ${classes.link}` : classes.link
					}
				>
					{!is1024Px ? <BsCart2 /> : <span>Cart</span>}
				</NavLink>
			</div>

			{listOpen && mainBarList}
		</div>
	);
};

export default ActionsBar;
