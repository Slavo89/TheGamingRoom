import { useState, useEffect, useRef } from 'react';
import DesktopCarouselItem from './DesktopCarouselItem';
import classes from './DestkopCarousel.module.scss';
import DesktoCarouselMainSlide from './DesktoCarouselMainSlide';

const DesktopCarousel = (props) => {
	const carouselGames = props.games;
	const [activeIndex, setActiveIndex] = useState(0);
	const [animate, setAnimate] = useState(false);
	const timeoutRef = useRef(null);
	const [key, setKey] = useState(0);

	// setting the active carouselItem
	useEffect(() => {
		clearTimeout(timeoutRef.current);
		const timer = setTimeout(() => {
			setActiveIndex((prevIndex) => (prevIndex + 1) % carouselGames.length);
			setAnimate(true);
		}, 7000);

		if (animate) {
			const animationTimer = setTimeout(() => {
				setAnimate(false);
			}, 500);

			return () => {
				clearTimeout(timer);
				clearTimeout(animationTimer);
			};
		}

		return () => {
			clearTimeout(timer);
			setKey(Date.now());
		};
	}, [carouselGames.length, animate]);

	const setToActiveHandler = (index) => {
		setActiveIndex(index);
		setAnimate(true);
	};

	return (
		<div className={classes.desktopCarousel}>
			<div className={classes.container}>
				<DesktoCarouselMainSlide
					key={key}
					game={carouselGames[activeIndex]}
				/>
			</div>
			<div className={classes.rightSection}>
				<ul className={classes.desktopCarouselList}>
					{carouselGames.map((game, index) => (
						<DesktopCarouselItem
							key={game.id}
							id={game.id}
							name={game.name}
							background_image={game.background_image}
							isActive={index === activeIndex}
							onClick={() => {
								setToActiveHandler(index);
							}}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default DesktopCarousel;
