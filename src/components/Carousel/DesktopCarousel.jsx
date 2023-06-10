import classes from './DestkopCarousel.module.scss';
import DesktopCarouselItem from './DesktopCarouselItem';
import WishlistButton from '../Buttons/WishlistButton';

const DUMMY_GAMES = [
	{
		id: 1,
		background_image:
			'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
		name: 'Grand Theft Auto V',
		rating: 4.47,
		genres: ['Adventure', 'Action'],
	},
	{
		id: 2,
		background_image:
			'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
		name: 'The Witcher 3: Wild Hunt',
		rating: 4.66,
		genres: ['Adventure', 'Action', 'RPG'],
	},
	{
		id: 3,
		background_image:
			'https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg',
		name: 'Portal 2',
		rating: 4.66,
		genres: ['Shooter', 'Puzzle'],
	},
	{
		id: 4,
		background_image:
			'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg',
		name: 'Tomb Raider (2013)',
		rating: 4.05,
		genres: ['Adventure', 'Action'],
	},
	{
		id: 5,
		background_image:
			'https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg',
		name: 'The Elder Scrolls V: Skyrim',
		rating: 4.42,
		genres: ['Action', 'RPG'],
	},
];

const DesktopCarousel = () => {
	return (
		<div className={classes.desktopCarousel}>
			<div className={classes.leftSide}>
				<picture className={classes.picture}>
					<source
						media="(min-width: 0px)"
						srcSet="https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg"
						alt="Game picture"
					/>
					<img
						src="https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg"
						alt="Game picture"
					/>
				</picture>
				<div className={classes.gameDescription}>
					<p>{DUMMY_GAMES[2].name}</p>
					<p>Rating: {DUMMY_GAMES[2].rating}</p>
					<p>Genres: {DUMMY_GAMES[2].genres.join(', ')}</p>
					<div className={classes.buttonsContainer}>
						<button className={classes.buyButton}>Buy Now</button>

						<div className={classes.wishlistButtonContainer}>
							<div>
								<WishlistButton />
							</div>
							<div>
								<p>Add to Wishlist</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={classes.rightSide}>
				<ul className={classes.carouselList}>
					{DUMMY_GAMES.map((game) => (
						<DesktopCarouselItem
							key={game.id}
							id={game.id}
							name={game.name}
							img={game.background_image}
							rating={game.rating}
							genres={game.genres.map((genre) => genre.name)}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default DesktopCarousel;
