import { useState } from 'react';
import useMediaQuery from './../../hooks/use-MediaQuery.js';
import classes from './ActionsBar.module.scss';
import {
	BsSearch,
	BsCheckCircle,
	BsCart2,
	BsChevronDown,
	BsXLg,
} from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const ActionsBar = (props) => {
	const [searchPanelOpen, setSearchPanelOpen] = useState(false);
	const [listOpen, setListOpen] = useState(false);

	const [pageName, setPageName] = useState('Discover');

	const isExtended = useMediaQuery('(width >= 1024px)');
	const isWide = useMediaQuery('(width >= 1280px)');

	const toggleSearchPanelHandler = () => {
		setSearchPanelOpen(!searchPanelOpen);
		props.onClick();
	};

	const toggleListHandler = () => {
		props.onClick();
		setListOpen(!listOpen);
	};

	const changePageName = (value) => {
		setPageName(value);
		setListOpen(false);
		props.onClose()
	};

	const linkClass = ({ isActive }) => (isActive ? classes.active : '');

	const mainBarList = (
		<div className={classes.actionNav}>
			<ul className={classes.actionList}>
				<li>
					<NavLink
						className={linkClass}
						to="/"
						onClick={() => {
							changePageName('Discover');
						}}
					>
						Discover
					</NavLink>
				</li>
				<li>
					<NavLink
						className={linkClass}
						to="/browse"
						onClick={() => {
							changePageName('Browse');
						}}
					>
						Browse
					</NavLink>
				</li>
				<li>
					<NavLink
						className={linkClass}
						to="/news"
						onClick={() => {
							changePageName('News');
						}}
					>
						News
					</NavLink>
				</li>
			</ul>
		</div>
	);

	return (
		<div className={classes.actionsBar}>
			{!isExtended ? (
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
							<button type="button">
								<BsSearch />
							</button>

							<input
								className={classes.searchInput}
								placeholder="Search store"
							></input>
							<button
								type="button"
								onClick={toggleSearchPanelHandler}
							>
								<BsXLg />
							</button>
						</div>
					)}
				</div>
			) : (
				<div className={classes.searchBarLarge}>
					<div className={classes.searchBarContainer}>
						<button type="button">
							<BsSearch />
						</button>
						<input
							className={classes.searchInput}
							placeholder="Search store"
						></input>
					</div>
				</div>
			)}
			<div className={classes.mainBar}>
				{!isWide ? (
					<button
						type="button"
						className={classes.listButton}
						onClick={toggleListHandler}
					>
						<span>{pageName}</span>
						<span>
							<BsChevronDown
								className={
									listOpen
										? `${classes.transformOpen}`
										: `${classes.transformClose}`
								}
							/>
						</span>
					</button>
				) : (
					mainBarList
				)}
			</div>

			<div className={classes.rightBar}>
				<a className={classes.link}>
					{!isExtended ? <BsCheckCircle /> : <span>Wishlist</span>}
				</a>
				<a className={classes.link}>
					{!isExtended ? <BsCart2 /> : <span>Cart</span>}
				</a>
			</div>

			{listOpen && mainBarList}
		</div>
	);
};

export default ActionsBar;
