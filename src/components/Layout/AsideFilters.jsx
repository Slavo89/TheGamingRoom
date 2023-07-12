import { useState } from 'react';
import OpenListButton from '../Buttons/OpenListButton';
import classes from './AsideFiltes.module.scss';

const AsideFilters = (props) => {
	const [listOpen, setListOpen] = useState(false);
	const [genreList, setGenreList] = useState(false);
	const [featuresList, setFeaturesList] = useState(false);
	const [platformList, setPlatformList] = useState(false);
	const toggleListHandler = (event) => {
		setListOpen(!listOpen);
		if (event.target.innerText === 'Genre') {
			setGenreList(!genreList)
		}
		if (event.target.innerText === 'Features') {
			setFeaturesList(!featuresList)
		}
		if (event.target.innerText === 'Platform') {
			setPlatformList(!platformList)
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
					onClick={toggleListHandler}
					onListOpen={genreList}
				>
					Genre
				</OpenListButton>
			</div>
			{genreList && (
				<ul>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Action
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Strategy
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						RPG
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Shooter
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Adventure
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Puzzle
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Racing
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Sports
					</li>
				</ul>
			)}
			<div className={classes.buttonContainer}>
				<OpenListButton
					onClick={toggleListHandler}
					onListOpen={featuresList}
				>
					Features
				</OpenListButton>
			</div>
			{featuresList && (
				<ul>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Single Player
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Multi Player
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Co-op
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Open World
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						First-Person
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						2D
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Third Person
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Sci-fi
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Horror
					</li>
					<li
						className={classes.listItem}
						onClick={() => {}}
					>
						Fantasy
					</li>
				</ul>
			)}
			<div className={classes.buttonContainer}>
				<OpenListButton
					onClick={toggleListHandler}
					onListOpen={platformList}
				>
					Platform
				</OpenListButton>
			</div>
			{platformList && (
				<ul>
					<li
							className={classes.listItem}
							onClick={() => {}}
						>
							PC
						</li>
					<li
							className={classes.listItem}
							onClick={() => {}}
						>
							PlayStation
						</li>
					<li
							className={classes.listItem}
							onClick={() => {}}
						>
							Xbox
						</li>
					<li
							className={classes.listItem}
							onClick={() => {}}
						>
							Android
						</li>
					<li
							className={classes.listItem}
							onClick={() => {}}
						>
							Apple
						</li>
					<li
							className={classes.listItem}
							onClick={() => {}}
						>
							Nintendo
						</li>
				</ul>
			)}
		</aside>
	);
};

export default AsideFilters;
