import useMediaQuery from '../hooks/use-MediaQuery';
import axios from 'axios';
import Carousel from '../components/Carousel/Carousel';
import DesktopCarousel from '../components/Carousel/DesktopCarousel';

import { useLoaderData, json } from 'react-router-dom';
import DesktopGamesList from '../components/GamesList/DesktopGamesList';
import GamesList from '../components/GamesList/GamesList';

const HomePage = () => {
	const is768Px = useMediaQuery('(width >= 768px)');
	const data = useLoaderData();

	// adding price property based on metacritic rating to all game objects, destructure parent_platforms, genres and tags for easier access
	const gamesData = data.map((game) => {
		const gamesData = { ...game };
		gamesData.price = gamesData.metacritic;
		gamesData.genres = [...game.genres.map((genre) => genre.name)];
		gamesData.parent_platforms = [
			...game.parent_platforms.map((item) => item.platform.name),
		];
		gamesData.tags = [...game.tags.map((tag) => tag.name)];
		return gamesData;
	});
	const gamesCarousel = gamesData.slice(0, 5);
	const gamesList = gamesData.slice(5, 20);
	return (
		<>
			<section>
				<h2>Bestsellers</h2>
				{!is768Px && <Carousel games={gamesCarousel} />}
				{is768Px && <DesktopCarousel games={gamesCarousel} />}
			</section>
			{!is768Px && <GamesList games={gamesList} />}
			{is768Px && <DesktopGamesList games={gamesList} />}
		</>
	);
};

export default HomePage;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
	try {
		const response = await axios.get(
			'https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98'
		);
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