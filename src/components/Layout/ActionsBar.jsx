import { useEffect, useState } from 'react';
import useMediaQuery from './../../hooks/use-MediaQuery.js';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsSearch, BsCheckCircle, BsCart2, BsXLg } from 'react-icons/bs';
import OpenListButton from '../Buttons/OpenListButton.jsx';
import classes from './ActionsBar.module.scss';
import SearchInput from './SearchInput.jsx';

const ActionsBar = (props) => {
	const navigate = useNavigate();

	const [searchPanelOpen, setSearchPanelOpen] = useState(false);
	const [listOpen, setListOpen] = useState(false);
	const cartItems = useSelector((state) => state.cart.items.length);
	const is1024Px = useMediaQuery('(width >= 1024px)');
	const is1280Px = useMediaQuery('(width >= 1280px)');
	const [pageName, setPageName] = useState('Discover'); // ADD RESET AT CHANGING SITES

	// badge animation
	const [key, setKey] = useState(0);
	const [prevCartItems, setPrevCartItems] = useState(0);
	const [badgeClass, setBadgeClass] = useState(`${classes.badge}`);

	useEffect(() => {
		setKey(cartItems);
		if (cartItems > 0) {
			setBadgeClass(`${classes.badge} ${classes.show}`);
		}

		if (cartItems > prevCartItems) {
			setBadgeClass(`${classes.badge} ${classes.show} ${classes.increase}`);
			setTimeout(() => {
				setPrevCartItems(key + 1);
			}, 700);
		}

		if (cartItems < prevCartItems) {
			setBadgeClass(`${classes.badge} ${classes.show} ${classes.decrease}`);
			setTimeout(() => {
				setPrevCartItems(key - 1);
			}, 700);
		}

		if (cartItems === 0) {
			setBadgeClass(`${classes.badge} ${classes.hide}`);
		}
	}, [cartItems]);

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

	// const handleNavigate = (id) => {
	// 	navigate(`/${id}`);
	// };

	

	const renderResults = (searchData, searchValueRef, isInputFocused, resetInputValue) => {
		if (searchData === null || searchValueRef === '' || !isInputFocused) {
			return null;
		} else {
			return (
				<ul className={classes.searchList}>
					{searchData.map((game) => (
						<li
							className={classes.searchItem}
							key={game.id}
						>
							<div
								className={classes.link}
								id={game.id}
								onClick={() => {
									resetInputValue();
									navigate(`/${game.id}`);
									if (searchPanelOpen) {
										toggleSearchPanelHandler()
									}
								}}
							>
								<img
									src={game.background_image}
									alt="Game cover"
									height="46"
									width="32"
									className={classes.image}
								/>
								<p>{game.name}</p>
							</div>
						</li>
					))}
				</ul>
			);
		}
	};

	const linkClass = ({ isActive }) => (isActive ? classes.active : '');
	const searchButton = (
		<button
			type="button"
			className={classes.searchButton}
		>
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
						<>
							<div className={classes.searchPanel}>
								{searchButton}
								<SearchInput
									onRenderResults={renderResults}
								/>
								<button
									type="button"
									onClick={toggleSearchPanelHandler}
									className={classes.closeButton}
								>
									<BsXLg />
								</button>
								{renderResults()}
							</div>
						</>
					)}
				</div>
			) : (
				<div className={classes.searchBarLarge}>
					<div className={classes.searchBarContainer}>
						{searchButton}
						<SearchInput
							onRenderResults={renderResults}
						/>
					</div>
					{renderResults()}
				</div>
			)}
			<div className={classes.mainBar}>
				{!is1280Px ? (
					<div>
						<OpenListButton
							onClick={toggleListHandler}
							onChangeText={pageName}
							onListOpen={listOpen}
						/>
					</div>
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

					<div className={badgeClass}>
						<span key={key}>{prevCartItems}</span>
					</div>
				</NavLink>
			</div>

			{listOpen && mainBarList}
		</div>
	);
};

export default ActionsBar;
