import axios from 'axios';
import { useState } from 'react';
import { useLoaderData, json } from 'react-router-dom';
import BrowsePageCard from '../components/Cards/BrowsePageCard';
import SortList from '../components/Layout/SortList';
import AsideFilters from "../components/Layout/AsideFilters"
import classes from './BrowsePage.module.scss';

const BrowsePage = () => {
  const data = useLoaderData();
  // adding price property based on metacritic rating to all game objects
  const gamesData = data.map(game => {
    const gamesData = { ...game }
    gamesData.price = gamesData.metacritic
    gamesData.genres = [...game.genres.map(genre => genre.name)]
    gamesData.parent_platforms = [...game.parent_platforms.map(item => item.platform.name)]
    gamesData.tags = [...game.tags.map(tag => tag.name)]
    return gamesData
  })

  console.log(gamesData);

	const [sortedItems, setSortedItems] = useState(gamesData);
  const [filteredItems] = useState(sortedItems);
  const [filtersMenuOpen, setFiltersMenuOpen] = useState(false);
  
  const toggleFiltersMenu = () => {
		setFiltersMenuOpen(!filtersMenuOpen);
  };
  
  const handleFilterChange = (filteredGames) => {
		setSortedItems(filteredGames);
  };
  
  

	const sortItems = (items) => {
		setSortedItems(items);
	};
	return (
		<>
			<section>
				<h2>Popular Genres</h2>
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
								{sortedItems.map((game) => (
									<BrowsePageCard
										key={game.id}
										id={game.id}
										name={game.name}
										background_image={game.background_image}
										rating={game.rating}
										genres={game.genres}
										metacritic={game.metacritic}
										esrb_rating={game.esrb_rating}
										parent_platforms={game.parent_platforms}
										tags={game.tags}
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

				<h2>Pagination</h2>
			</section>
		</>
	);
};

export default BrowsePage;

export async function loader() {
	try {
		const response = await axios.get(
			'https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page=1&page_size=20'
		);
		// const response = await axios.get(
		// 	'https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98'
		// );
		const data = response.data;
		return data.results;
	} catch (error) {
		return json(
			{ message: 'Could not fetch games.' },
			{
				status: 500,
			}
		);
	}
}
