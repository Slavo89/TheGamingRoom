import { useEffect, useState } from 'react';
import useMediaQuery from './../../hooks/use-MediaQuery.js';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch, BsCheckCircle, BsCart2, BsXLg } from 'react-icons/bs';
import FocusTrap from 'focus-trap-react';
import OpenListButton from '../UI/Buttons/OpenListButton.jsx';
import classes from './ActionsBar.module.scss';
import SearchInput from './SearchInput.jsx';

const ActionsBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [focusTrapActive, setFocusTrapActive] = useState(false);

	const [showBackdrop, setShowBackdrop] = useState(false);
	const [searchPanelOpen, setSearchPanelOpen] = useState(false);
	const [listOpen, setListOpen] = useState(false);
	const isLoggedIn = useSelector((state) => state.auth.isAuthenicated);
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cartItems]);

	const changePageName = () => {
		setPageName(event.target.innerHTML);
		setListOpen(false);
		setShowBackdrop(false);
	};

	const toggleSearchPanelHandler = () => {
		if (searchPanelOpen === false) {
			setSearchPanelOpen(true);
			setListOpen(false);
			setShowBackdrop(true);
			setFocusTrapActive(true);
		} else {
			setListOpen(false);
			setSearchPanelOpen(false);
			setShowBackdrop(false);
			setFocusTrapActive(false);
		}
	};

	const toggleListHandler = () => {
		if (listOpen === false) {
			setListOpen(true);
			setShowBackdrop(true);
			setFocusTrapActive(true);
		} else {
			setListOpen(false);
			setSearchPanelOpen(false);
			setShowBackdrop(false);
			setFocusTrapActive(false);
		}
	};

	const renderResults = (
		searchData,
		searchValueRef,
		isInputFocused,
		resetInputValue
	) => {
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
										toggleSearchPanelHandler();
									}
								}}
								onKeyPress={() => {
									resetInputValue();
									navigate(`/${game.id}`);
									if (searchPanelOpen) {
										toggleSearchPanelHandler();
									}
								}}
								tabIndex={0}
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
			aria-hidden
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
						tabIndex={0}
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
						tabIndex={0}
					>
						Browse
					</NavLink>
				</li>
				<li>
					<NavLink
						className={linkClass}
						to="/readme	"
						onClick={changePageName}
						tabIndex={0}
					>
						ReadMe
					</NavLink>
				</li>
			</ul>
		</div>
	);

	useEffect(() => {
		setListOpen(false);
		setSearchPanelOpen(false);
	}, [location]);
	return (
		<>
			<FocusTrap
				active={focusTrapActive}
				focusTrapOptions={{
					clickOutsideDeactivates: true,

					onDeactivate: () => {
						setListOpen(false);
						setSearchPanelOpen(false);
						setFocusTrapActive(false);
						setShowBackdrop(false);
					},
				}}
			>
				<div className={classes.actionsBar}>
					{!is1024Px ? (
						<div className={classes.searchBarSmall}>
							<button
								type="button"
								className={classes.searchButton}
								onClick={toggleSearchPanelHandler}
								aria-label="Open search panel"
							>
								<BsSearch aria-hidden/>
							</button>
							{searchPanelOpen && (
								<>
									<FocusTrap
										active={focusTrapActive}
										focusTrapOptions={{
											// allowOutsideClick: true,
											clickOutsideDeactivates: true,

											onDeactivate: () => {
												// setSearchPanelOpen(false);
												// setFocusTrapActive(false);
												// setShowBackdrop(false);
											},
										}}
									>
										<div className={classes.searchPanel}>
											{searchButton}
											<SearchInput onRenderResults={renderResults} />
											<button
												type="button"
												onClick={toggleSearchPanelHandler}
												className={classes.closeButton}
											>
												<BsXLg />
											</button>
											{renderResults()}
										</div>
									</FocusTrap>
								</>
							)}
						</div>
					) : (
						<div className={classes.searchBarLarge}>
							<div className={classes.searchBarContainer}>
								{searchButton}
								<SearchInput onRenderResults={renderResults} />
							</div>
							{renderResults()}
						</div>
					)}
					<div className={classes.mainBar} >
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
						{isLoggedIn && (
							<>
								<NavLink
									to="/wishlist"
									className={({ isActive }) =>
										isActive
											? `${classes.active} ${classes.link}`
											: classes.link
									}
									aria-label='Wishlist'
								>
									{!is1024Px ? <BsCheckCircle aria-hidden/> : <span>Wishlist</span>}
								</NavLink>
								<NavLink
									to="/cart"
									className={({ isActive }) =>
										isActive
											? `${classes.active} ${classes.link}`
											: classes.link
									}
									aria-label='Cart'
								>
									{!is1024Px ? <BsCart2 aria-hidden/> : <span>Cart</span>}

									<div className={badgeClass} aria-label='Items in cart'>
										<span key={key}>{prevCartItems}</span>
									</div>
								</NavLink>
							</>
						)}
					</div>

					{listOpen && mainBarList}
				</div>
			</FocusTrap>
			{showBackdrop && <div className={classes.actionBackdrop} />}
		</>
	);
};

export default ActionsBar;
