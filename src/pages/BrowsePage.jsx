import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useRef, useEffect } from 'react';
import { json } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { pageActions } from '../store/page-slice';
import GenreCard from '../components/UI/Cards/GenreCard';
import classes from './BrowsePage.module.scss';
import GamesLibrary from '../components/Layout/GamesLibrary';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const BrowsePage = () => {
	const [activeArrow, setActiveArrow] = useState(null);
	const sliderRef = useRef(null);
	const [games, setGames] = useState([]);
	const [genres, setGenres] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	const dispatch = useDispatch();

	const activeBrowsePage = useSelector((state) => state.pages.activeBrowsePage);

	const changeActiveBrowsePageHandler = (page) => {
		dispatch(pageActions.setActiveBrowsePage(page));
	};
	useEffect(() => {
		const fetchGenresData = async () => {
			try {
				const genresResponse = await axios.get(
					`https://api.rawg.io/api/genres?key=8c5f5a03a748417b9752c0b536fa1e98`
				);
				const genresData = genresResponse.data.results;
				setGenres(genresData);
			} catch (error) {
				return json(
					{ message: 'Could not fetch games.' },
					{
						status: 500,
					}
				);
			}
		};
		fetchGenresData();
	}, []);

	useEffect(() => {
		const fetchGamesData = async () => {
			setDataLoaded(false);
			try {
				const gamesResponse = await axios.get(
					// `https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page=1&page_size=40`
					`https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page=${activeBrowsePage}&page_size=40`
				);
				const gamesData = gamesResponse.data.results;

				setGames(gamesData);
				setDataLoaded(true);
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
	}, [activeBrowsePage]);

	// Adding price property based on metacritic rating to all game objects, destructure parent_platforms, genres and tags for easier access
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
			dispatch(pageActions.resetActiveBrowsePage());
		};
	}, [dispatch]);

	return (
		<>
			<section>
				<div className={classes.navigationContainer}>
					<h3>Popular Genres</h3>
					<div className={classes.arrowNagination}>
						<span
							className={`${classes.prev} ${classes.arrow} ${
								activeArrow === 'prev' ? `${classes.active}` : ''
							}`}
							onClick={() => {
								setActiveArrow('prev');
								sliderRef.current.slickPrev();
							}}
							tabIndex="0"
						>
							<BsChevronLeft />
						</span>
						<span
							className={`${classes.next} ${classes.arrow} ${
								activeArrow === 'next' ? `${classes.active}` : ''
							}`}
							onClick={() => {
								setActiveArrow('next');
								sliderRef.current.slickNext();
							}}
							tabIndex="0"
						>
							<BsChevronRight />
						</span>
					</div>
				</div>

				<Slider
					ref={sliderRef}
					arrows={false}
					dots={false}
					speed={500}
					slidesToShow={5}
					slidesToScroll={5}
					centerPadding={'0px'}
					initialSlide={1}
					responsive={[
						{
							breakpoint: 1600,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 4,
							},
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2,
							},
						},
					]}
				>
					{genres.map((genre) => (
						<GenreCard
							key={genre.id}
							name={genre.name}
							image={genre.image_background}
						/>
					))}
				</Slider>
			</section>
			{dataLoaded ? (
				<GamesLibrary
					games={gamesData}
					onPageChange={changeActiveBrowsePageHandler}
					page={activeBrowsePage}
				/>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
};

export default BrowsePage;
