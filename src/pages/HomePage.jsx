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
	const gamesCarousel = data.slice(0, 5);
	const gamesList = data.slice(5, 20);

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

// const [gamesList, setGamesList] = useState([]);
// const [isLoading, setIsLoading] = useState(true);
// const [isError, setIsError] = useState(false);

// useEffect(() => {
// 	const fetchData = async () => {
// 		try {
// 			const response = await axios.get(
// 				'https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page_size=5'
// 			);
// 			const data = response.data;
// 			const games = data.results;
// 			setGamesList(games);
// 			setIsLoading(false);
// 		} catch (error) {
// 			setIsError(true);
// 			setIsLoading(false);
// 			console.error('Error loading data!', error);
// 		}
// 	};

// 	fetchData();
// }, []);

//   if (isLoading) {
// 		return <h1>Loading...</h1>;
// 	}

// 	if (isError) {
// 		return <h1>Error loading data!</h1>;
// 	}
