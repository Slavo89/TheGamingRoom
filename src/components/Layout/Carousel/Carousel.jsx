import CarouselItem from './CarouselItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/pagination';

const Carousel = (props) => {
	const carouselGames = props.games;

	return (
		<>
			<Swiper
				modules={[Pagination]}
				spaceBetween={15}
				slidesPerView={1.3}
				pagination={{
					clickable: true,
				}}
			>
				{carouselGames.map((game) => (
					<SwiperSlide key={game.id}>
						<CarouselItem
							id={game.id}
							name={game.name}
							background_image={game.background_image}
							rating={game.rating}
							genres={game.genres}
							price={game.price}
							esrb_rating={game.esrb_rating}
							parent_platforms={game.parent_platforms}
							tags={game.tags}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			
		</>
	);
};

export default Carousel;
