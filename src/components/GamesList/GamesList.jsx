import classes from './GamesList.module.scss';
import GamesListItem from './GamesListItem';

const GamesList = (props) => {
  const GAMES = props.games;
  // console.log(GAMES);
	return (
		<section className={classes.gamesList}>
			<ul className={classes.list}>
				<div className={classes.columnTitle}>Column</div>
				{GAMES.slice(0, 5).map((game) => (
					<GamesListItem
						key={game.id}
						id={game.id}
						name={game.name}
						background_image={game.background_image}
						rating={game.rating}
						genres={game.genres.map((genre) => genre.name)}
						metacritic={game.metacritic}
						esrb_rating={game.esrb_rating}
						parent_platforms={game.parent_platforms}
					/>
				))}
			</ul>
			<ul className={classes.list}>
				<div className={classes.columnTitle}>Column</div>
				{GAMES.slice(5, 10).map((game) => (
					<GamesListItem
						key={game.id}
						id={game.id}
						name={game.name}
						background_image={game.background_image}
						rating={game.rating}
						genres={game.genres.map((genre) => genre.name)}
						metacritic={game.metacritic}
						esrb_rating={game.esrb_rating}
						parent_platforms={game.parent_platforms}
					/>
				))}
			</ul>
			<ul className={classes.list}>
				<div className={classes.columnTitle}>Column</div>
				{GAMES.slice(10, 15).map((game) => (
					<GamesListItem
						key={game.id}
						id={game.id}
						name={game.name}
						background_image={game.background_image}
						rating={game.rating}
						genres={game.genres.map((genre) => genre.name)}
						metacritic={game.metacritic}
						esrb_rating={game.esrb_rating}
						parent_platforms={game.parent_platforms}
					/>
				))}
			</ul>
		</section>
	);
};

export default GamesList;
