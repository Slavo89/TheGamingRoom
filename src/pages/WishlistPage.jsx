import { useState } from 'react';
import useMediaQuery from '../hooks/use-MediaQuery';
import { FaRegQuestionCircle, FaMailBulk } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../store/wishlist-slice';
import { cartActions } from '../store/cart-slice';
import classes from './WishilstPage.module.scss';
import CartCard from '../components/Cards/CartCard';
import EmptyCartList from '../components/Layout/EmptyCartList';
import AsideFilters from '../components/Layout/AsideFilters';
import SortList from '../components/Layout/SortList';

const WishlistPage = () => {
	const wishlistItems = useSelector((state) => state.wishlist.items);
	const [sortedItems, setSortedItems] = useState(wishlistItems);
	const [filteredItems] = useState(sortedItems);
	const [filtersMenuOpen, setFiltersMenuOpen] = useState(false);
	const dispatch = useDispatch();
	const is770Px = useMediaQuery('(width >= 770px)');

console.log(wishlistItems);

	const addToCartHandler = (game) => {
		dispatch(
			cartActions.addItemToCart({
				key: game.id,
				id: game.id,
				name: game.name,
				price: game.price,
				img: game.img,
				esrb_rating: game.esrb_rating,
				platforms: game.platforms,
			})
		);
	};

	const removeFromWishlistHandler = (itemId) => {
		dispatch(wishlistActions.removeItemFromWishlist(itemId));
		const updatedItems = sortedItems.filter(
			(game) => game.id !== itemId
		);
		setSortedItems(updatedItems);
	};

	const toggleFiltersMenu = () => {
		setFiltersMenuOpen(!filtersMenuOpen);
	};

	const handleFilterChange = (filteredGames) => {
		setSortedItems(filteredGames);
	};


	const sortItems = (items) => {
		setSortedItems(items)
	};

	return (
		<>
			<h1>Wishlist</h1>
			<section className={classes.wishlistSection}>
				<div className={classes.notificationSwitch}>
					{is770Px ? (
						<div className={classes.flexContainer}>
							<FaMailBulk className={classes.icon} />
							<p className={classes.paragraph}>
								Receive email notification about my wishlist.
							</p>
							<div className={classes.tooltip}>
								<FaRegQuestionCircle />
								<span className={classes.tooltipText}>
									Get notified when your wishlisted games go on sale, or are
									available for purshase or pre-purshase.
								</span>
							</div>
						</div>
					) : (
						<p className={classes.paragraph}>
							Receive email notification about my wishlist.
						</p>
					)}
					<label className={classes.switch}>
						<input type="checkbox" />
						<span className={classes.slider}></span>
					</label>
				</div>

				{wishlistItems.length > 0 ? (
					<div className={classes.mainContent}>
						<div className={classes.list}>
							<SortList
								originalItems={wishlistItems}
								sortItems={sortItems}
								onToggleFiltersMenu={toggleFiltersMenu}
								firstLabel={'Recently Added'}
							/>
							
							<div className={classes.gameList}>
								<ul className={classes.list}>
									{sortedItems.map((game) => (
										<CartCard
											key={game.id}
											item={{
												id: game.id,
												name: game.name,
												img: game.img,
												platforms: game.platforms.join(', '),
												price: game.price,
												rating: game.esrb_rating,
											}}
											onAdd={() => addToCartHandler(game)}
											onRemove={() => removeFromWishlistHandler(game.id)}
										/>
									))}
								</ul>
							</div>
						</div>

						<AsideFilters
							games={filteredItems}
							onFilterChange={handleFilterChange}
							filtersMenuOpen={filtersMenuOpen}
							onToggleMenuOpen={toggleFiltersMenu}
						/>
					</div>
				) : (
					<EmptyCartList>
						You haven`t added anything to your wishlist yet.
					</EmptyCartList>
				)}
			</section>
		</>
	);
};

export default WishlistPage;


	// const [sortedWishlistItems, setSortedWishlistItems] = useState(wishlistItems);
	// const [listOpen, setListOpen] = useState(false);
	// const [activeSort, setActiveSort] = useState('Recently Added');
	// const sortListRef = useRef(null);
	// const is1024Px = useMediaQuery('(width >= 1024px)');

	// useEffect(() => {
	// 	const closeListHandler = () => {
	// 		if (listOpen === true) {
	// 			setListOpen(false);
	// 		} else {
	// 			return;
	// 		}
	// 	};

	// 	const handleOutsideClick = (event) => {
	// 		if (sortListRef.current && !sortListRef.current.contains(event.target)) {
	// 			closeListHandler();
	// 		}
	// 	};

	// 	document.addEventListener('click', handleOutsideClick);

	// 	return () => {
	// 		document.removeEventListener('click', handleOutsideClick);
	// 	};
	// }, [listOpen]);

	// const sortByRecentlyAddedHandler = () => {
	// 	setSortedWishlistItems(wishlistItems);
	// 	setActiveSort('Recently Added');
	// };

	// const sortByNameHandler = () => {
	// 	const sortedItems = [...wishlistItems];
	// 	sortedItems.sort((a, b) => {
	// 		const nameA = a.name.toLowerCase();
	// 		const nameB = b.name.toLowerCase();

	// 		if (nameA < nameB) {
	// 			return -1;
	// 		}
	// 		if (nameA > nameB) {
	// 			return 1;
	// 		}
	// 		return 0;
	// 	});
	// 	setSortedWishlistItems(sortedItems);
	// 	setActiveSort('Alphabetical');
	// };

	// const sortByPriceHandler = (price) => {
	// 	const sortedItems = [...wishlistItems];
	// 	if (price === 'lowToHigh') {
	// 		sortedItems.sort((a, b) => {
	// 			return a.price - b.price;
	// 		});
	// 		setSortedWishlistItems(sortedItems);
	// 		setActiveSort('Price: Low to High');
	// 	} else if (price === 'highToLow') {
	// 		sortedItems.sort((a, b) => {
	// 			return b.price - a.price;
	// 		});
	// 		setSortedWishlistItems(sortedItems);
	// 		setActiveSort('Price: High to Low');
	// 	}
	// };

	// const toggleListHandler = () => {
	// 	setListOpen(!listOpen);
	// };

	
	// const toggleBackdropHandler = () => {
	// 	dispatch(backdropActions.showBackdrop());
	// };

	{
		/* <div className={classes.sortList}>
								<span className={classes.span}>Sort By :</span>
								<div ref={sortListRef}>
									<OpenListButton
										onClick={toggleListHandler}
										onChangeText={activeSort}
										onListOpen={listOpen}
									/>
								</div>
								{listOpen && (
									<ul>
										<li
											tabIndex="0"
											className={
												activeSort === 'Recently Added' ? classes.active : ''
											}
											onClick={sortByRecentlyAddedHandler}
											onKeyDown={(event) => {
												if (event.key === 'Enter') {
													sortByRecentlyAddedHandler();
												}
											}}
										>
											Recenty Added
										</li>
										<li
											tabIndex="0"
											className={
												activeSort === 'Alphabetical' ? classes.active : ''
											}
											onClick={sortByNameHandler}
											onKeyDown={(event) => {
												if (event.key === 'Enter') {
													sortByNameHandler();
												}
											}}
										>
											Alphabetical
										</li>
										<li
											tabIndex="0"
											className={
												activeSort === 'Price: Low to High'
													? classes.active
													: ''
											}
											onClick={() => {
												sortByPriceHandler('lowToHigh');
											}}
											onKeyDown={(event) => {
												if (event.key === 'Enter') {
													sortByPriceHandler('lowToHigh');
												}
											}}
										>
											Price: Low to High
										</li>
										<li
											tabIndex="0"
											className={
												activeSort === 'Price: High to Low'
													? classes.active
													: ''
											}
											onClick={() => {
												sortByPriceHandler('highToLow');
											}}
											onKeyDown={(event) => {
												if (event.key === 'Enter') {
													sortByPriceHandler('highToLow');
												}
											}}
										>
											Price: High to Low
										</li>
									</ul>
								)}
								{!is1024Px && (
									<button
										className={classes.filterHeader}
										onClick={() => {
											toggleFiltersMenu();
											toggleBackdropHandler();
										}}
									>
										<span>Filter</span>
										<div className={classes.menuIcon}>
											<div className={`${classes.line} ${classes.top}`}></div>
											<div
												className={`${classes.line} ${classes.middle}`}
											></div>
											<div
												className={`${classes.line} ${classes.bottom}`}
											></div>
										</div>
									</button>
								)}
							</div> */
	}