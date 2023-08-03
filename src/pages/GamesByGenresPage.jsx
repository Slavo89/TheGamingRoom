import axios from 'axios';
import { json, useParams } from 'react-router-dom';
import GamesLibrary from '../components/Layout/GamesLibrary';
import classes from './GamesByGenresPage.module.scss';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pageActions } from '../store/page-slice';

const GamesByGenresPage = () => {
	const params = useParams();
	const [games, setGames] = useState([]);
	const [genre, setGenre] = useState(params.genre.toLowerCase());
	const [genreReady, setGenreReady] = useState(false);
	const [info, setInfo] = useState('');
	const [dataLoaded, setDataLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (genre === 'rpg') {
			setGenre('role-playing-games-rpg');
		} else if (genre === 'massively multiplayer') {
			setGenre('massively-multiplayer');
		}
		setGenreReady(true);
	}, [genre]);

	const activePage = useSelector((state) => state.pages.activePage);

	const changeActivePageHandler = (page) => {
		dispatch(pageActions.setActivePage(page));
	};

	useEffect(() => {
		setDataLoaded(false);
		const fetchGamesData = async () => {
			try {
				if (genreReady) {
					const gamesResponse = await axios.get(
						// `https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page=1&page_size=40`
						`https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page=${activePage}&page_size=40&genres=${genre}`
					);

					const genreInfoResponse = await axios.get(
						`https://api.rawg.io/api/genres/${genre}?key=8c5f5a03a748417b9752c0b536fa1e98`
					);
					const gamesData = gamesResponse.data.results;
					const genreInfoData = genreInfoResponse.data.description;

					setGames(gamesData);
					setInfo(genreInfoData);
					setDataLoaded(true);
				}
			} catch (error) {
				return json(
					{ message: 'Could not fetch games.' },
					{
						status: 500,
					}
				);
			}
		};
		fetchGamesData();
	}, [activePage, genreReady]);

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

	// Reseting active page on changing route
	useEffect(() => {
		return () => {
			dispatch(pageActions.resetActivePage());
		};
	}, [dispatch]);

	return (
		<>
			<div className={classes.description}>
				<h1>{params.genre} Games</h1>
				{info}
			</div>
			{dataLoaded && (
				<GamesLibrary
					games={gamesData}
					onPageChange={changeActivePageHandler}
					page={activePage}
				/>
			)}
		</>
	);
};

export default GamesByGenresPage;