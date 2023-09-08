import CarouselItem from './CarouselItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/pagination';

const Carousel = (props) => {
	const carouselGames = props.games;

	const slickSettings = {
		infinite: false,
		dots: true,
		speed: 500,
		slidesToShow: 1.3,
		slidesToScroll: 1,
		initialSlide: 0,
		arrows: false,
	};
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
			<Slider {...slickSettings}>
				{carouselGames.map((game) => (
					<CarouselItem
						key={game.id}
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
				))}
			</Slider>
		</>
	);
};

export default Carousel;
