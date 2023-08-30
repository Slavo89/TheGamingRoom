import { useState, useEffect } from 'react';
import useMediaQuery from '../hooks/use-MediaQuery';
import { FaRegQuestionCircle, FaMailBulk } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../store/wishlist-slice';
import classes from './WishilstPage.module.scss';
import CartCard from '../components/UI/Cards/CartCard';
import EmptyCartList from '../components/Layout/EmptyCartList';
import AsideFilters from '../components/Layout/AsideFilters';
import SortList from '../components/Layout/SortList';

const WishlistPage = () => {
	const wishlistItems = useSelector((state) => state.wishlist.items);
	const [sortedItems, setSortedItems] = useState(wishlistItems);
	const [filteredItems, setFilteredItems] = useState(wishlistItems);
	const [displayedItems, setDisplayedItems] = useState(wishlistItems);
	const [filtersMenuOpen, setFiltersMenuOpen] = useState(false);
	const [checked, setChecked] = useState(false);

	const dispatch = useDispatch();
	const is770Px = useMediaQuery('(width >= 770px)');


	const removeFromWishlistHandler = (itemId) => {
		dispatch(wishlistActions.removeItemFromWishlist(itemId));
		const updatedItems = sortedItems.filter((game) => game.id !== itemId);
		setSortedItems(updatedItems);
	};

	const toggleFiltersMenu = () => {
		setFiltersMenuOpen(!filtersMenuOpen);
	};

	const handleFilterChange = (filteredGames) => {
		setFilteredItems(filteredGames);
	};

	const sortItems = (items) => {
		setSortedItems(items);
	};

	useEffect(() => {
		const findMatchedItems = () => {
			const matched = sortedItems.filter((sortedItem) =>
				filteredItems.some((filteredItem) => filteredItem.id === sortedItem.id)
			);
			setDisplayedItems(matched);
		};
		findMatchedItems();
	}, [filteredItems, sortedItems]);

	const handleCheckboxChange = () => {
		setChecked(!checked);
	};

	let notification;
	if (!checked) {
		notification = 'Receive email notification about my wishlist.';
	}
	if (checked) {
		notification = 'You are subscribed to wishlist email notification';
	}

	return (
		<>
			<h1>Wishlist</h1>
			<section className={classes.wishlistSection}>
				<div className={classes.notificationSwitch}>
					{!is770Px ? (
						<p className={classes.paragraph}>{notification}</p>
					) : (
						<div className={classes.flexContainer}>
							<FaMailBulk className={classes.icon} />
							{!checked ? (
								<>
									<p className={classes.paragraph}>{notification}</p>
									<div className={classes.tooltip}>
										<FaRegQuestionCircle />
										<span className={classes.tooltipText}>
											Get notified when your wishlisted games go on sale, or are
											available for purshase or pre-purshase.
										</span>
									</div>
								</>
							) : (
								<p className={classes.paragraph}>{notification}</p>
							)}
						</div>
					)}
					<label className={classes.switch}>
						<input
							type="checkbox"
							checked={checked}
							onChange={handleCheckboxChange}
						/>
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
									{displayedItems.map((game) => (
										<CartCard
											key={game.id}
											item={{
												id: game.id,
												name: game.name,
												background_image: game.background_image,
												parent_platforms: game.parent_platforms,
												price: game.price,
												esrb_rating: game.esrb_rating,
											}}
											onRemove={() => removeFromWishlistHandler(game.id)}
										/>
									))}
								</ul>
							</div>
						</div>

						<AsideFilters
							games={sortedItems}
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
