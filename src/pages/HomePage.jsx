import { useState } from 'react';
import useMediaQuery from '../hooks/use-MediaQuery';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Carousel from '../components/Carousel/Carousel';
import DesktopCarousel from '../components/Carousel/DesktopCarousel';

const HomePage = () => {
	const [gamesList, setGamesList] = useState([]);
	const is770Px = useMediaQuery('(width >= 770px)');

	const gamesQuery = useQuery({
		queryKey: gamesList,
		queryFn: async () => {
			const response = await axios.get(
				'https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page_size=5'
			);

			const data = await response.data;
			const games = [];
			data.results.map((item) => {
				games.push(item);
			});
			setGamesList(games);
			return games;
		},
	});

	if (gamesQuery.isLoading) return <h1>Loading...</h1>;
	if (gamesQuery.isError) return <h1>Error loading data!</h1>;

	return (
		<>
			<h2>Mega Sales</h2>
			{!is770Px && <Carousel games={gamesList} />}
			{is770Px && <DesktopCarousel games={gamesList } />}
		</>
	);
};

export default HomePage;
