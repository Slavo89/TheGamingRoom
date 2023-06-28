import CarouselItem from './CarouselItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/pagination';

const Carousel = (props) => {
	const GAMES = props.games;

	return (
		<Swiper
			modules={[Pagination]}
			spaceBetween={15}
			slidesPerView={1.3}
			pagination={{
				clickable: true,
			}}
		>
			{GAMES.map((game) => (
				<SwiperSlide key={game.id}>
					<CarouselItem
						id={game.id}
						name={game.name}
						background_image={game.background_image}
						rating={game.rating}
						genres={game.genres.map((genre) => genre.name)}
						metacritic={game.metacritic}
						esrb_rating={game.esrb_rating}
						parent_platforms={game.parent_platforms}
						// platforms={game.parent_platforms
						// 	.map((item) => item.platform.name)
						// 	.join(', ')}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default Carousel;
