import classes from './GenreCard.module.scss';

const GenreCard = (props) => {
	return (
		<li className={classes.genreListItem}>
			<div className={classes.imageSection}>
				<picture className={classes.image}>
					<source
						media="(min-width: 0px)"
						srcSet={props.image}
						alt="Game picture"
						loading="lazy"
					/>
					<img
						src={props.image}
						alt="Game picture"
						loading="lazy"
					/>
				</picture>
			</div>
            <div><p className={classes.title}>{props.name}</p></div>
		</li>
	);
};

export default GenreCard;
