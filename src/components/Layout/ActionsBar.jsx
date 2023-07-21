import { useEffect, useState } from 'react';
import useMediaQuery from './../../hooks/use-MediaQuery.js';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';
import { BsSearch, BsCheckCircle, BsCart2, BsXLg } from 'react-icons/bs';
import OpenListButton from '../Buttons/OpenListButton.jsx';
import classes from './ActionsBar.module.scss';

const ActionsBar = (props) => {
	const [searchValue, setSeatchValue] = useState('');
	const [searchData, setSearchData] = useState(null);
	const [searchPanelOpen, setSearchPanelOpen] = useState(false);
	const [listOpen, setListOpen] = useState(false);
	const cartItems = useSelector((state) => state.cart.items.length);

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

	const searchGameHandler = async () => {
		// const inputValue = event.target.value;
		// setTimeout(
		// async () => {
		try {
			const response = await axios.get(
				`https://api.rawg.io/api/games?search=${searchValue}&key=8c5f5a03a748417b9752c0b536fa1e98`
			);
			const data = response.data;
			// return data;
			setSearchData(data.results.slice(0, 5));
		} catch (error) {
			console.error('Could not find games', error);
		}
		// },

		// 1000
		// );
	};
	console.log(searchData);

	const handleInputChange = (event) => {
		setSeatchValue(event.target.value);
		setTimeout(() => {
			searchGameHandler();
		}, 1500);
	};

	const renderResults = () => {
		if (searchData === null) {
			return;
		}

		return (
			<ul className={classes.searchList}>
				{searchData.map((game) => (
					<li
						className={classes.searchItem}
						key={game.id}
					>
						<Link
							to={`/${props.id}`}
							className={classes.link}
						>
							<LazyLoadImage
								src={game.background_image}
								alt="Game cover"
								height="46"
								width="32"
								className={classes.image}
							/>
							{game.name}
						</Link>
					</li>
				))}
			</ul>
		);
	};

	const is1024Px = useMediaQuery('(width >= 1024px)');
	const is1280Px = useMediaQuery('(width >= 1280px)');

	const linkClass = ({ isActive }) => (isActive ? classes.active : '');
	const searchButton = (
		<button
			type="button"
			className={classes.searchButton}
		>
			<BsSearch />
		</button>
	);

	const searchInput = (
		<input
			className={classes.searchInput}
			placeholder="Search store"
			onChange={handleInputChange}
		></input>
	);
	// console.log(searchData.map((game) => game.name));

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
							{searchInput}
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
						{searchInput}
					</div>
					{/* <ul className={classes.searchList}>
						{searchData.map((game) => {
							<li className={classes.searchItem}>{game.name}</li>;
						})}
					</ul> */}
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
