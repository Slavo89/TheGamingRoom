import axios from 'axios';
import { useLoaderData, json, useParams } from 'react-router-dom';
import GamesLibrary from '../components/Layout/GamesLibrary';
import classes from './GamesByGenresPage.module.scss';

const GamesByGenresPage = (props) => {
	const { games, info } = useLoaderData();
	const params = useParams();
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

	// console.log(params);
	console.log(info);
	// console.log(gamesData);

	return (
		<>
			<div className={classes.description}>
				<h1>{params.genre} Games</h1>
				{info}
			</div>
			<GamesLibrary
				games={gamesData}
				onPageChange={props.onPageChange}
				page={props.page}
			/>
		</>
	);
};

export default GamesByGenresPage;

export async function loader(genrePage, genre) {
	if (genre === 'rpg') {
		genre = 'role-playing-games-rpg';
	}
	if (genre === 'massively multiplayer') {
		genre = 'massively-multiplayer';
	}
	try {
		const gamesResponse = await axios.get(
			// `https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page=${genrePage}&page_size=40&genres=massively-multiplayer`
			`https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page=${genrePage}&page_size=40&genres=${genre}`
		);
		const genreInfoResponse = await axios.get(
			`https://api.rawg.io/api/genres/${genre}?key=8c5f5a03a748417b9752c0b536fa1e98`
		);
		const gamesData = gamesResponse.data;
		const genreInfoData = genreInfoResponse.data;

		console.log(gamesData);
		return {
			games: gamesData.results,
			info: genreInfoData.description,
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
