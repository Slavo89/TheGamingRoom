import axios from 'axios';
import { useLoaderData, json } from 'react-router-dom';
import useWishlist from '../hooks/useWishlist';
import classes from './GameDetailsPage.module.scss';
import WishlistButton from '../components/UI/Buttons/WishlistButton';
import CTAButton from '../components/UI/Buttons/CTAButton';
import useCart from '../hooks/useCart';
import { platforms } from '../data/iconsSRC';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const GameDetailsPage = () => {
	const { data, screenshots } = useLoaderData();

	// adding price property based on metacritic rating to all game objects, destructure parent_platforms, genres and tags for easier access
	const gameDetails = {
		...data,
		price: data.metacritic,
		genres: data.genres.map((genre) => genre.name),
		parent_platforms: data.parent_platforms.map((item) => item.platform.name),
		tags: data.tags.map((tag) => tag.name),
	};

	const ratingStyle = {
		'--rating': gameDetails.rating,
	};

	const [inWishlist, wishlistHandler] = useWishlist(gameDetails);

	const [inCart, cartHandler] = useCart(gameDetails);

	const carouselData = [
		{ id: 1, image: gameDetails.background_image },
		{ id: 2, image: gameDetails.background_image_additional },
		...screenshots,
	];


	return (
		<section className={classes.gameDetails}>
			<h1 className={classes.title}>{gameDetails.name}</h1>
			<div className={classes.rating}>
				<div
					className={classes.stars}
					style={ratingStyle}
					aria-hidden
				></div>
				<span className={classes.numeralRating} aria-label="Rating">{gameDetails.rating}</span>
			</div>
			<div className={classes.detailsContainer}>
				<div className={classes.carouselContainer}>
					<Carousel
						showArrows={true}
						infiniteLoop={true}
						showThumbs={true}
						showStatus={false}
						showIndicators={false}
						
					>
						{carouselData.map((data) => (
							<div
								key={data.id}
								className={classes.imageContainer}
							>
								<img
									alt="Game screen"
									src={data.image}
								/>
							</div>
						))}
					</Carousel>
				</div>
				<div className={classes.actions}>
					<div className={classes.price}>
						<span>Price</span>
						<span>$ {gameDetails.metacritic}</span>
					</div>
					<div className={classes.buttons}>
						<div className={classes.buttonContainer}>
							<CTAButton onClick={cartHandler}>
								{!inCart ? 'Add to Cart' : 'View in Cart'}
							</CTAButton>
						</div>
						<div className={`${classes.buttonContainer} ${classes.wishlist}`}>
							<WishlistButton
								onClick={wishlistHandler}
								inWishlist={inWishlist}
							>
								<p aria-hidden>{!inWishlist ? 'Add to Wishlist' : 'In Wishlist'}</p>
							</WishlistButton>
						</div>
					</div>
				</div>
				<div className={classes.infoTable}>
					<div className={classes.row}>
						<span>Developer</span>
						<span>
							{gameDetails.developers.map((item) => item.name).join(', ')}
						</span>
					</div>
					<div className={classes.row}>
						<span>Publisher</span>
						<span>{gameDetails.publishers[0].name}</span>
					</div>
					<div className={classes.row}>
						<span>Release Date</span>
						<span>{gameDetails.released}</span>
					</div>
					<div className={classes.row}>
						<span>Platforms</span>
						<div className={classes.platforms}>
							{gameDetails.parent_platforms.map((platform) => (
								<img
									key={platform}
									src={platforms[platform]}
									alt={platform}
									height={16}
									className={classes.icon}
									
								></img>
							))}
						</div>
					</div>
					<div className={classes.row}>
						<a
							href={gameDetails.website}
							target="_blank"
							rel="noreferrer"
							className={classes.link}
						>
							{gameDetails.website}
						</a>
					</div>
				</div>
				<div className={classes.gameDescription}>
					<p>{gameDetails.description_raw}</p>
				</div>
				<div className={classes.gameTypes}>
					<div className={classes.gameTypesContainer}>
						<span>Genres</span>
						<span>{gameDetails.genres.join(', ')}</span>
					</div>
					<hr aria-hidden/>
					<div className={classes.gameTypesContainer}>
						<span>Features</span>
						<span>{gameDetails.tags.slice(0, 5).join(', ')}</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GameDetailsPage;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
	const id = params.gameId;
	try {
		const detailResponse = await axios.get(
			`https://api.rawg.io/api/games/${id}?key=8c5f5a03a748417b9752c0b536fa1e98`
		);
		const screenshotsResponse = await axios.get(
			`https://api.rawg.io/api/games/${id}/screenshots?key=8c5f5a03a748417b9752c0b536fa1e98`
		);

		const data = detailResponse.data;
		const screenshots = screenshotsResponse.data.results;
		return { data, screenshots };
	} catch (error) {
		return json(
			{ message: 'Could not fetch game details.' },
			{
				status: 500,
			}
		);
	}
}
