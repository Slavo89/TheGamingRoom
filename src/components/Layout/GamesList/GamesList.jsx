import classes from './GamesList.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/pagination';
import GamesListItem from './GamesListItem';

const GamesList = (props) => {
	const gameList = props.games;
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
						{gameList.slice(0, 5).map((game) => (
							<GamesListItem
								key={game.id}
								id={game.id}
								name={game.name}
								background_image={game.background_image}
								price={game.price}
								genres={game.genres}
								esrb_rating={game.esrb_rating}
								parent_platforms={game.parent_platforms}
							/>
						))}
					</ul>
				</SwiperSlide>
				<SwiperSlide>
					<ul className={`${classes.list} ${classes.border}`}>
						<div className={classes.columnTitle}>Most Played</div>
						{gameList.slice(5, 10).map((game) => (
							<GamesListItem
								key={game.id}
								id={game.id}
								name={game.name}
								background_image={game.background_image}
								genres={game.genres}
								price={game.price}
								esrb_rating={game.esrb_rating}
								parent_platforms={game.parent_platforms}
								tags={game.tags}
							/>
						))}
					</ul>
				</SwiperSlide>
				<SwiperSlide>
					<ul className={classes.list}>
						<div className={classes.columnTitle}>Recently Updated</div>
						{gameList.slice(10, 15).map((game) => (
							<GamesListItem
								key={game.id}
								id={game.id}
								name={game.name}
								background_image={game.background_image}
								genres={game.genres}
								price={game.price}
								esrb_rating={game.esrb_rating}
								parent_platforms={game.parent_platforms}
								tags={game.tags}
							/>
						))}
					</ul>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default GamesList;
