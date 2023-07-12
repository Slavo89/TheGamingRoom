import classes from './DesktopGamesList.module.scss'
import GamesListItem from './GamesListItem';

const DesktopGamesList = (props) => {
	const GAMES = props.games;
	// console.log(GAMES);
	return (
		<section className={classes.gamesList}>
			<ul className={classes.list}>
				<div className={classes.columnTitle}>Top Rated</div>
				{GAMES.slice(0, 5).map((game) => (
					<GamesListItem
						key={game.id}
						id={game.id}
						name={game.name}
						background_image={game.background_image}
						rating={game.rating}
						genres={game.genres}
						metacritic={game.metacritic}
						esrb_rating={game.esrb_rating}
						parent_platforms={game.parent_platforms}
						tags={game.tags}
					/>
				))}
			</ul>
			<ul className={classes.list}>
				<div className={classes.columnTitle}>Most Played</div>
				{GAMES.slice(5, 10).map((game) => (
					<GamesListItem
						key={game.id}
						id={game.id}
						name={game.name}
						background_image={game.background_image}
						rating={game.rating}
						genres={game.genres}
						metacritic={game.metacritic}
						esrb_rating={game.esrb_rating}
						parent_platforms={game.parent_platforms}
						tags={game.tags}
					/>
				))}
			</ul>
			<ul className={classes.list}>
				<div className={classes.columnTitle}>Recently Updated</div>
				{GAMES.slice(10, 15).map((game) => (
					<GamesListItem
						key={game.id}
						id={game.id}
						name={game.name}
						background_image={game.background_image}
						rating={game.rating}
						genres={game.genres}
						metacritic={game.metacritic}
						esrb_rating={game.esrb_rating}
						parent_platforms={game.parent_platforms}
						tags={game.tags}
					/>
				))}
			</ul>
		</section>
	);
};

export default DesktopGamesList;
