import axios from 'axios';
import { useLoaderData, json } from 'react-router-dom';
import { Carousel } from 'react-carousel-minimal';
import useWishlist from '../hooks/useWishlist';
import classes from './GameDetailsPage.module.scss';
import WishlistButton from '../components/Buttons/WishlistButton';
import CTAButton from '../components/Buttons/CTAButton';
import useCart from '../hooks/useCart';

const GameDetailsPage = () => {
	const data = useLoaderData();

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
	return (
		<section className={classes.gameDetails}>
			<h1 className={classes.title}>{gameDetails.name}</h1>
			<div className={classes.rating}>
				<div
					className={classes.stars}
					style={ratingStyle}
				></div>
				<span className={classes.numeralRating}>{gameDetails.rating}</span>
			</div>
			<div className={classes.detailsContainer}>
				<div className={classes.carousel}>
					<Carousel
						data={[
							{
								image: gameDetails.background_image,
							},
							{
								image: gameDetails.background_image_additional,
							},
						]}
						width="100%"
						radius="10px"
						slideBackgroundColor="transparent"
						// slideImageFit="cover"
						thumbnails={true}
						thumbnailWidth="100px"
						thumbnailHeight="50px"
					/>
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
								<p>{!inWishlist ? 'Add to Wishlist' : 'In Wishlist'}</p>
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
						<span>{gameDetails.parent_platforms.join(', ')}</span>
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
					<hr />
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
		const response = await axios.get(
			`https://api.rawg.io/api/games/${id}?key=8c5f5a03a748417b9752c0b536fa1e98`
		);
		const data = response.data;
		return data;
	} catch (error) {
		return json(
			{ message: 'Could not fetch game details.' },
			{
				status: 500,
			}
		);
	}
}
