import classes from './GameDetailsPage.module.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-carousel-minimal';
import WishlistButton from '../components/Buttons/WishlistButton';
import AddToCartButton from '../components/Buttons/AddToCartButton';

const GameDetailsPage = () => {
	const params = useParams();
	// const [gameDetails, setGameDetails] = useState({});
	const [gameDetails, setGameDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [rotate, setRotate] = useState(false);
	const [wishlistButtonText, setWishlistButtonText] =
		useState('Add to Wishlist');

	const addToWishlistHandler = () => {
		setWishlistButtonText(rotate ? 'Add to Wishlist' : 'In Wishlist');
		setRotate(!rotate);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://api.rawg.io/api/games/${params.gameId}?key=8c5f5a03a748417b9752c0b536fa1e98`
				);
				const data = response.data;
				setGameDetails(data);
				setIsLoading(false);
			} catch (error) {
				setIsError(true);
				setIsLoading(false);
				console.error('Error loading data!', error);
			}
		};

		fetchData();
	}, [params.gameId]);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	if (isError) {
		return <h1>Error loading data!</h1>;
	}

	// console.log(gameDetails);
	return (
		<div className={classes.gameDetails}>
			<h1 className={classes.title}>{gameDetails.name}</h1>
			<div className={classes.rating}>
				<div className={classes.stars}></div>
				<span>{gameDetails.rating}</span>
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
							<AddToCartButton />
						</div>
						<div className={`${classes.buttonContainer} ${classes.wishlist}`}>
							<WishlistButton onClick={addToWishlistHandler}>
								<p>{wishlistButtonText}</p>
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
						<span>
							{gameDetails.parent_platforms
								.map((item) => item.platform.name)
								.join(', ')}
						</span>
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
						<span>
							{gameDetails.genres.map((genre) => genre.name).join(', ')}
						</span>
					</div>
					<div className={classes.gameTypesContainer}>
						<span>Features</span>
						<span>
							{gameDetails.tags
								.slice(0, 5)
								.map((tag) => tag.name)
								.join(', ')}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameDetailsPage;
