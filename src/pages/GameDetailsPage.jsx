import classes from './GameDetailsPage.module.scss';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Carousel } from 'react-carousel-minimal';
import WishlistButton from '../components/Buttons/WishlistButton';
import AddToCartButton from '../components/Buttons/AddToCartButton';

const GameDetailsPage = () => {
	const params = useParams();
	const [gameDetails, setGameDetails] = useState({});

	const gamesQuery = useQuery({
		queryKey: [],
		queryFn: async () => {
			const response = await axios.get(
				`https://api.rawg.io/api/games/${params.gameId}?key=8c5f5a03a748417b9752c0b536fa1e98`
			);

			const data = await response.data;
			setGameDetails(data);
			return gameDetails;
		},
	});

	// console.log(gameDetails);

	if (gamesQuery.isLoading) return <h1>Loading...</h1>;
	if (gamesQuery.isError) return <h1>Error loading data!</h1>;

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
							time={0}
							// width="850px"
							// height="500px"
							radius="10px"
							slideBackgroundColor="transparent"
							slideImageFit="cover"
							thumbnails={true}
							thumbnailWidth="100px"
							style={{
								textAlign: 'center',
								// maxWidth: '850px',
								maxHeight: '500px',
								// margin: '40px auto',
							}}
						/>
					</div>
					<div className={classes.actions}>
						<div className={classes.price}>
							<span>Price</span>
							<span>$ {gameDetails.metacritic}</span>
						</div>
						<div className={classes.buttons}>
							<AddToCartButton />
							<WishlistButton />
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
							<span>{gameDetails.tags.slice(0,5).map((tag) => tag.name).join(', ')}</span>
						</div>
					</div>
			</div>
		</div>
	);
};

export default GameDetailsPage;
