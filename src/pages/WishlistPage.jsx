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


	const addToCartHandler = (game) => {
		dispatch(
			cartActions.addItemToCart({
				key: game.id,
				id: game.id,
				name: game.name,
				price: game.price,
				background_image: game.background_image,
				esrb_rating: game.esrb_rating,
				parent_platforms: game.parent_platforms,
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
												background_image: game.background_image,
												parent_platforms: game.parent_platforms,
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
							games={wishlistItems}
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