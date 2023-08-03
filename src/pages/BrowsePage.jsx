import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useState, useRef, useEffect } from 'react';
import { json } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import GenreCard from '../components/Cards/GenreCard';
import classes from './BrowsePage.module.scss';
import GamesLibrary from '../components/Layout/GamesLibrary';
import { useDispatch, useSelector } from 'react-redux';
import { pageActions } from '../store/page-slice';

const BrowsePage = () => {
	const [activeArrow, setActiveArrow] = useState(null);
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const [games, setGames] = useState([]);
	const [genres, setGenres] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	const dispatch = useDispatch();

	const activePage = useSelector((state) => state.pages.activePage);

	const changeActivePageHandler = (page) => {
		dispatch(pageActions.setActivePage(page));
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
					`https://api.rawg.io/api/games?key=8c5f5a03a748417b9752c0b536fa1e98&page=${activePage}&page_size=40`
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
	}, [activePage]);


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
			dispatch(pageActions.resetActivePage());
		};
	}, [dispatch]);

	return (
		<>
			<section>
				<div className={classes.titleContainer}>
					<h3>Popular Genres</h3>
					<div className={classes.arrowNagination}>
						<span
							className={`${classes.arrow} ${
								activeArrow === 'prev' ? `${classes.active}` : ''
							}`}
							ref={prevRef}
							onClick={() => {
								setActiveArrow('prev');
							}}
							tabIndex="0"
						>
							<BsChevronLeft />
						</span>
						<span
							className={`${classes.arrow} ${
								activeArrow === 'next' ? `${classes.active}` : ''
							}`}
							ref={nextRef}
							onClick={() => {
								setActiveArrow('next');
							}}
							tabIndex="0"
						>
							<BsChevronRight />
						</span>
					</div>
				</div>
				<Swiper
					modules={[Navigation]}
					onInit={(swiper) => {
						swiper.params.navigation.prevEl = prevRef.current;
						swiper.params.navigation.nextEl = nextRef.current;
						swiper.navigation.init();
					}}
					onResize={(swiper) => {
						swiper.params.navigation.prevEl = prevRef.current;
						swiper.params.navigation.nextEl = nextRef.current;
						swiper.navigation.init();
					}}
					breakpoints={{
						320: {
							slidesPerView: 2,
							slidesPerGroup: 2,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 4,
							slidesPerGroup: 4,
							spaceBetween: 15,
						},
						1600: {
							slidesPerView: 5,
							slidesPerGroup: 5,
							spaceBetween: 15,
						},
					}}
					loop={true}
					navigation={{
						enabled: true,
						clickable: true,
					}}
				>
					<div className={classes.swiper}>
						<ul className={classes.genreCards}>
							{genres.map((genre) => (
								<SwiperSlide key={genre.id}>
									<GenreCard
										name={genre.name}
										image={genre.image_background}
									/>
								</SwiperSlide>
							))}
						</ul>
					</div>
				</Swiper>
			</section>

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

export default BrowsePage;