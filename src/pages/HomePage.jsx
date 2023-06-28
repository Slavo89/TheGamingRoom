import useMediaQuery from '../hooks/use-MediaQuery';
import axios from 'axios';
import Carousel from '../components/Carousel/Carousel';
import DesktopCarousel from '../components/Carousel/DesktopCarousel';

import { useLoaderData, json } from 'react-router-dom';

const HomePage = () => {
	const is770Px = useMediaQuery('(width >= 770px)');
	const data = useLoaderData();
	const games = data.slice(0, 5);

	// console.log(games);
	return (
		<section>
			<h2>Mega Sales</h2>
			{!is770Px && <Carousel games={games} />}
			{is770Px && <DesktopCarousel games={games} />}
		</section>
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
