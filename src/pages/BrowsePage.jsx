import axios from 'axios';
import Swiper from 'swiper';
import { useState, useEffect } from 'react';
import { useLoaderData, json } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import BrowsePageCard from '../components/Cards/BrowsePageCard';
import SortList from '../components/Layout/SortList';
import AsideFilters from '../components/Layout/AsideFilters';
import GenreCard from '../components/Cards/GenreCard';
import classes from './BrowsePage.module.scss';

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

const BrowsePage = (props) => {
	const [activePage, setActivePage] = useState(props.page);
	const { games, genres } = useLoaderData();

	// adding price property based on metacritic rating to all game objects, destructure parent_platforms, genres and tags for easier access
	const gamesData = games.map((game) => {
		const gamesData = { ...game };
		gamesData.price = gamesData.metacritic;
		gamesData.genres = [...game.genres.map((genre) => genre.name)];
		gamesData.parent_platforms = [
			...game.parent_platforms.map((item) => item.platform.name),
		];
		gamesData.tags = [...game.tags.map((tag) => tag.name)];
		return gamesData;
	});

	const [sortedItems, setSortedItems] = useState(gamesData);
	const [filteredItems, setFilteredItems] = useState(gamesData);
	const [displayedItems, setDisplayedItems] = useState(gamesData);
	const [filtersMenuOpen, setFiltersMenuOpen] = useState(false);

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

	useEffect(() => {
		props.onPageChange(activePage);
	}, [activePage]);

	return (
		<>
			<section>
				<h2>Popular Genres</h2>
				<ul className={classes.genreList}>
					<Swiper
						modules={[Pagination]}
						spaceBetween={15}
						slidesPerView={1.3}
						pagination={{
							clickable: true,
						}}
					>
						{genres.map((genre) => (
							<GenreCard
								name={genre.name}
								key={genre.id}
								image={genre.image_background}
							/>
						))}
					</Swiper>
				</ul>
			</section>
			<section>
				<div className={classes.mainContent}>
					<div className={classes.list}>
						<SortList
							originalItems={gamesData}
							sortItems={sortItems}
							onToggleFiltersMenu={toggleFiltersMenu}
							firstLabel={'All'}
						/>

						<div className={classes.gameList}>
							<ul className={classes.cardsContainer}>
								{displayedItems.map((game) => (
									<BrowsePageCard
										key={game.id}
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
						onToggleMenuOpen={toggleFiltersMenu}
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
								key={page}
								value={page}
								className={page === activePage ? classes.active : ''}
								onClick={
									typeof page === 'number'
										? () => setActivePage(page)
										: () => {}
								}
							>
								{page}
							</li>
						))}
						{activePage < totalPages && (
							<li
								className={classes.arrow}
								onClick={() => setActivePage(activePage + 1)}
							>
								<BsChevronRight></BsChevronRight>
							</li>
						)}
					</ul>
				</div>
			</section>
		</>
	);
};

export default BrowsePage;

export async function loader(page) {
	try {
		const gamesResponse = await axios.get(
			`https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page=${page}&page_size=40`
		);
		const genresResponse = await axios.get(
			`https://api.rawg.io/api/genres?key=8c5f5a03a748417b9752c0b536fa1e98`
		);
		const gamesData = gamesResponse.data;
		const genresData = genresResponse.data;

		return {
			games: gamesData.results,
			genres: genresData.results,
		};
	} catch (error) {
		return json(
			{ message: 'Could not fetch games.' },
			{
				status: 500,
			}
		);
	}
}
