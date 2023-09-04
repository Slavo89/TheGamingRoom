import { useState, useEffect } from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { backdropActions } from '../../store/backdrop-slice';
import { useDispatch } from 'react-redux';
import OpenListButton from '../UI/Buttons/OpenListButton';
import classes from './AsideFiltes.module.scss';

const AsideFilters = (props) => {
	const [genreListOpen, setGenreListOpen] = useState(false);
	const [featuresListOpen, setFeaturesListOpen] = useState(false);
	const [platformListOpen, setPlatformListOpen] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState([]);
	const dispatch = useDispatch();

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
				filtersArray = props.games.map((game) => game.parent_platforms).flat();
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
	const platforms = getFilters('platforms');

	//  Too many pointless features are displayed so I hard-coded an array
	// const features = getFilters('features');
	const features = [
		'Singleplayer',
		'Multiplayer',
		'Co-op',
		'First-Person',
		'Horror',
		'Third Person',
		'Open World',
		'PvP',
		'Sci-fi',
		'Exploration',
		'Hack and Slash',
		'MMORPG',
		'Survival',
		'Tactical',
		'Mature',
	];

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
		const filterGamesByPlatforms = (games, platforms) => {
			return games.filter((game) => game.parent_platforms.includes(platforms));
		};
		const selectedPlatform = event.target.innerText;
		const filteredGames = filterGamesByPlatforms(props.games, selectedPlatform);
		props.onFilterChange(filteredGames);
		selectFilterHandler(selectedPlatform);
	};

	const resetFiltersHandler = () => {
		setSelectedFilters([]);
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
							game.parent_platforms.includes(filter)
						);
					});
				});
			}

			props.onFilterChange(filteredGames);
		};

		filterGames();
	}, [selectedFilters]);

	const toggleListHandler = (event) => {
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

	const hideBackdropHandler = () => {
		dispatch(backdropActions.hideBackdrop());
	};

	return (
		<>
			<aside
				className={
					props.filtersMenuOpen
						? `${classes.asideFilters} ${classes.show}`
						: `${classes.asideFilters}`
				}
			>
				{selectedFilters.length > 0 ? (
					<div>
						<span>Filters ({selectedFilters.length})</span>
						<button
							className={classes.resetButton}
							onClick={resetFiltersHandler}
						>
							Reset
						</button>
					</div>
				) : (
					<div>
						<span>Filters</span>
					</div>
				)}
				{props.children}
				<div className={classes.filterTypeContainer}>
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
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										genresFilterHandler(event);
									}
								}}
							>
								{genre}
								<BsCheck2 />
							</li>
						))}
					</ul>
				)}
				<div className={classes.filterTypeContainer}>
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
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										featuresFilterHandler(event);
									}
								}}
							>
								{feature}
								<BsCheck2 />
							</li>
						))}
					</ul>
				)}
				<div className={classes.filterTypeContainer}>
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
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										platformsFilterHandler(event);
									}
								}}
							>
								{platform}
								<BsCheck2 />
							</li>
						))}
					</ul>
				)}
				<div className={classes.buttonsContainer}>
					<button
						className={classes.clearButton}
						onClick={() => {
							props.onToggleMenuOpen();
							resetFiltersHandler();
							hideBackdropHandler();
						}}
					>
						Clear
					</button>
					<button
						className={classes.applyButton}
						onClick={() => {
							props.onToggleMenuOpen();
							hideBackdropHandler();
						}}
					>
						Apply
					</button>
				</div>
			</aside>
			
		</>
	);
};

export default AsideFilters;
