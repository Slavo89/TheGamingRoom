import axios from 'axios';
import { useLoaderData, json } from 'react-router-dom';
import GamesLibrary from '../components/Layout/GamesLibrary';
import classes from './GamesByGenresPage.module.scss';

const GamesByGenresPage = () => {
	const { games } = useLoaderData();

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
	return (
		<>
			<div className={classes.description}>Opis</div>
			<GamesLibrary games={gamesData} />;
		</>
	);
};

export default GamesByGenresPage;

export async function loader(genrePage, genre) {
	try {
		const gamesResponse = await axios.get(
			// `https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page=${page}&page_size=40`
			`https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page=${genrePage}&page_size=40&genres=${genre}`
		);
		const gamesData = gamesResponse.data;

		return {
			games: gamesData.results,
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
