import classes from './GamesList.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/pagination';
import GamesListItem from './GamesListItem';

const GamesList = (props) => {
	const GAMES = props.games;
	return (
		<section>
			<Swiper
				modules={[Pagination]}
				spaceBetween={15}
				slidesPerView={1.2}
				pagination={{
					clickable: true,
				}}
			>
				<SwiperSlide>
					<ul className={`${classes.list} ${classes.border}`}>
						<div className={classes.columnTitle}>Top Rated</div>
						{GAMES.slice(0, 5).map((game) => (
							<GamesListItem
								key={game.id}
								id={game.id}
								name={game.name}
								background_image={game.background_image}
								metacritic={game.metacritic}
								// rating={game.rating}
								// // genres={game.genres.map((genre) => genre.name)}
								// esrb_rating={game.esrb_rating}
								// parent_platforms={game.parent_platforms}
								// // platforms={game.parent_platforms
								// // 	.map((item) => item.platform.name)
								// // 	.join(', ')}
							/>
						))}
					</ul>
				</SwiperSlide>
				<SwiperSlide>
					<ul className={`${classes.list} ${classes.border}`}>
						<div className={classes.columnTitle}>Most Played</div>
						{GAMES.slice(5, 10).map((game) => (
							<GamesListItem
								key={game.id}
								id={game.id}
								name={game.name}
								background_image={game.background_image}
								rating={game.rating}
								genres={game.genres.map((genre) => genre.name)}
								metacritic={game.metacritic}
								esrb_rating={game.esrb_rating}
								parent_platforms={game.parent_platforms}
								tags={game.tags}
								// platforms={game.parent_platforms
								// 	.map((item) => item.platform.name)
								// 	.join(', ')}
							/>
						))}
					</ul>
				</SwiperSlide>
				<SwiperSlide>
					<ul className={classes.list}>
						<div className={classes.columnTitle}>Recently Updated</div>
						{GAMES.slice(10, 15).map((game) => (
							<GamesListItem
								key={game.id}
								id={game.id}
								name={game.name}
								background_image={game.background_image}
								rating={game.rating}
								genres={game.genres.map((genre) => genre.name)}
								metacritic={game.metacritic}
								esrb_rating={game.esrb_rating}
								parent_platforms={game.parent_platforms}
								tags={game.tags}
								// platforms={game.parent_platforms
								// 	.map((item) => item.platform.name)
								// 	.join(', ')}
							/>
						))}
					</ul>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default GamesList;
