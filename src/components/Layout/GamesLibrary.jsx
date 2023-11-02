import { useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import SortList from './SortList';
import AsideFilters from './AsideFilters';
import GamesLibraryCard from '../UI/Cards/GamesLibraryCard';
import classes from './GamesLibrary.module.scss';

const totalPages = 25;
const pages = [];
for (let i = 1; i <= totalPages; i++) {
	pages.push(i);
}

const generatePageNumbers = (activePage, totalPages) => {
	const visiblePages = 5;
	const halfVisiblePages = Math.floor(visiblePages / 2);

	let startPage = activePage - halfVisiblePages;
	let endPage = activePage + halfVisiblePages;

	if (startPage <= 0) {
		startPage = 1;
		endPage = visiblePages;
	}

	if (endPage > totalPages) {
		endPage = totalPages;
		startPage = Math.max(1, totalPages - visiblePages + 1);
	}

	const pages = [];
	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	if (startPage > 1) {
		pages.unshift('...');
		pages.unshift(1);
	}

	if (endPage < totalPages) {
		pages.push('...');
		pages.push(totalPages);
	}

	return pages;
};
const GamesLibrary = (props) => {
	const [activePage, setActivePage] = useState(props.page);
	const [sortedItems, setSortedItems] = useState(props.games);
	const [filteredItems, setFilteredItems] = useState(props.games);
	const [displayedItems, setDisplayedItems] = useState(props.games);
	const [filtersMenuOpen, setFiltersMenuOpen] = useState(false);

	const sortItems = (items) => {
		setSortedItems(items);
	};

	const handleFilterChange = (filteredGames) => {
		setFilteredItems(filteredGames);
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

	useEffect(() => {
		props.onPageChange(activePage);
		window.scrollTo(0, 0);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activePage]);

	return (
		<section>
			<div className={classes.mainContent}>
				<div className={classes.list}>
					<SortList
						originalItems={props.games}
						sortItems={sortItems}
						onToggleFiltersMenu={() => setFiltersMenuOpen(true)}
						firstLabel={'All'}
					/>

					<div className={classes.gameList}>
						<ul className={classes.cardsContainer}>
							{displayedItems.map((game) => (
								<GamesLibraryCard
									key={game.id + game.name}
									id={game.id}
									name={game.name}
									background_image={game.background_image}
									rating={game.rating}
									genres={game.genres}
									price={game.price}
									esrb_rating={game.esrb_rating}
									parent_platforms={game.parent_platforms}
									tags={game.tags}
								/>
							))}
						</ul>
					</div>
				</div>

				<AsideFilters
					games={sortedItems}
					onFilterChange={handleFilterChange}
					filtersMenuOpen={filtersMenuOpen}
					onCloseMenu={() => {
						setFiltersMenuOpen(false);
					}}
					onOpenMenu={() => setFiltersMenuOpen(true)}
				/>
			</div>

			<div className={classes.pagination}>
				<ul className={classes.pagesList}>
					{activePage > 1 && (
						<li
							className={classes.arrow}
							onClick={() => setActivePage(activePage - 1)}
						>
							<BsChevronLeft></BsChevronLeft>
						</li>
					)}
					{generatePageNumbers(activePage, totalPages).map((page) => (
						<li
							key={page + Math.random()} //  Encountered two children with the same key so i used Math.random()
							value={page}
							className={page === activePage ? classes.active : ''}
							onClick={
								typeof page === 'number' ? () => setActivePage(page) : () => {}
							}
							tabIndex={0}
						>
							{page}
						</li>
					))}
					{activePage < totalPages && (
						<li
							className={classes.arrow}
							onClick={() => setActivePage(activePage + 1)}
						>
							<BsChevronRight />
						</li>
					)}
				</ul>
			</div>
		</section>
	);
};

export default GamesLibrary;
