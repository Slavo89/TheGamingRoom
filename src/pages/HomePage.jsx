import { useState, useEffect } from 'react';
import useMediaQuery from '../hooks/use-MediaQuery';
import axios from 'axios';
import Carousel from '../components/Carousel/Carousel';
import DesktopCarousel from '../components/Carousel/DesktopCarousel';

const HomePage = () => {
	const is770Px = useMediaQuery('(width >= 770px)');
	const [gamesList, setGamesList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page_size=5'
				);
				const data = response.data;
				const games = data.results;
				setGamesList(games);
				setIsLoading(false);
			} catch (error) {
				setIsError(true);
				setIsLoading(false);
				console.error('Error loading data!', error);
			}
		};

		fetchData();
	}, []);

	
  if (isLoading) {
		return <h1>Loading...</h1>;
	}

	if (isError) {
		return <h1>Error loading data!</h1>;
	}

	return (
		<section>
			<h2>Mega Sales</h2>
			{!is770Px && <Carousel games={gamesList} />}
			{is770Px && <DesktopCarousel games={gamesList} />}
		</section>
	);
};

export default HomePage;
