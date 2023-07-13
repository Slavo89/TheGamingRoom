import { useState, useEffect } from 'react';
import { BsCheck2 } from 'react-icons/bs';
import OpenListButton from '../Buttons/OpenListButton';
import classes from './AsideFiltes.module.scss';

const AsideFilters = (props) => {
	// const [listOpen, setListOpen] = useState(false);
	const [genreListOpen, setGenreListOpen] = useState(false);
	const [featuresListOpen, setFeaturesListOpen] = useState(false);
	const [platformListOpen, setPlatformListOpen] = useState(false);

	const [selectedFilters, setSelectedFilters] = useState([]);

	function getFilters(prop) {
		let filtersArray;
		switch (prop) {
			case 'genres':
				filtersArray = props.games.map((game) => game.genres).flat();
				break;
			case 'features':
				filtersArray = props.games
					.map((game) => game.tags)
					.flat()
					.filter((value) => {
						return value.charAt(0) === value.charAt(0).toUpperCase();
					});

				break;
			case 'platforms':
				filtersArray = props.games.map((game) => game.platforms).flat();
				break;
			default:
				filtersArray = [];
				break;
		}
		const unique = filtersArray.filter((value, index, self) => {
			return self.indexOf(value) === index;
		});
		return unique;
	}
	const genres = getFilters('genres');
	const features = getFilters('features');
	const platforms = getFilters('platforms');

	const selectFilterHandler = (item) => {
		if (selectedFilters.includes(item)) {
			setSelectedFilters(selectedFilters.filter((i) => i !== item));
		} else {
			setSelectedFilters([...selectedFilters, item]);
		}
	};

	const genresFilterHandler = (event) => {
		const filterGamesByGenre = (games, genre) => {
			return games.filter((game) => game.genres.includes(genre));
		};
		const selectedGenre = event.target.innerText;
		const filteredGames = filterGamesByGenre(props.games, selectedGenre);
		props.onFilterChange(filteredGames);
		selectFilterHandler(selectedGenre);
	};

	const featuresFilterHandler = (event) => {
		const filterGamesByFeatures = (games, feature) => {
			return games.filter((game) => game.tags.includes(feature));
		};
		const selectedFeature = event.target.innerText;
		const filteredGames = filterGamesByFeatures(props.games, selectedFeature);
		props.onFilterChange(filteredGames);
		selectFilterHandler(selectedFeature);
	};

	const platformsFilterHandler = (event) => {
		const filterGamesByPlatforms = (games, features) => {
			return games.filter((game) => game.platforms.includes(features));
		};
		const selectedPlatform = event.target.innerText;
		const filteredGames = filterGamesByPlatforms(props.games, selectedPlatform);
		props.onFilterChange(filteredGames);
		selectFilterHandler(selectedPlatform);
	};

	useEffect(() => {
		const filterGames = () => {
			let filteredGames = props.games;

			// Filter games based on selected filters
			if (selectedFilters.length > 0) {
				filteredGames = filteredGames.filter((game) => {
					return selectedFilters.every((filter) => {
						return (
							game.genres.includes(filter) ||
							game.tags.includes(filter) ||
							game.platforms.includes(filter)
						);
					});
				});
			}

			props.onFilterChange(filteredGames);
		};

		filterGames();
	}, [selectedFilters]);

	const toggleListHandler = (event) => {
		// setListOpen(!listOpen);
		if (event.target.innerText === 'Genre') {
			setGenreListOpen(!genreListOpen);
		}
		if (event.target.innerText === 'Features') {
			setFeaturesListOpen(!featuresListOpen);
		}
		if (event.target.innerText === 'Platform') {
			setPlatformListOpen(!platformListOpen);
		}
	};

	return (
		<aside className={classes.asideFilters}>
			<div>
				<span>Filters</span>
			</div>
			{props.children}
			<div className={classes.buttonContainer}>
				<OpenListButton
					onClick={() => {
						toggleListHandler(event);
					}}
					onListOpen={genreListOpen}
				>
					Genre
				</OpenListButton>
			</div>
			{genreListOpen && (
				<ul>
					{genres.map((genre) => (
						<li
							key={genre}
							className={`${classes.listItem} ${
								selectedFilters.includes(genre) ? classes.selected : ''
							}`}
							tabIndex="0"
							onClick={genresFilterHandler}
						>
							{genre}
							<BsCheck2 />
						</li>
					))}
				</ul>
			)}
			<div className={classes.buttonContainer}>
				<OpenListButton
					onClick={toggleListHandler}
					onListOpen={featuresListOpen}
				>
					Features
				</OpenListButton>
			</div>
			{featuresListOpen && (
				<ul>
					{features.map((feature) => (
						<li
							key={feature}
							className={`${classes.listItem} ${
								selectedFilters.includes(feature) ? classes.selected : ''
							}`}
							tabIndex="0"
							onClick={featuresFilterHandler}
						>
							{feature}
							<BsCheck2 />
						</li>
					))}
				</ul>
			)}
			<div className={classes.buttonContainer}>
				<OpenListButton
					onClick={toggleListHandler}
					onListOpen={platformListOpen}
				>
					Platform
				</OpenListButton>
			</div>
			{platformListOpen && (
				<ul>
					{platforms.map((platform) => (
						<li
							key={platform}
							className={`${classes.listItem} ${
								selectedFilters.includes(platform) ? classes.selected : ''
							}`}
							tabIndex="0"
							onClick={platformsFilterHandler}
						>
							{platform}
							<BsCheck2 />
						</li>
					))}
				</ul>
			)}
		</aside>
	);
};

export default AsideFilters;
