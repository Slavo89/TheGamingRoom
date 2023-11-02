import { Link } from 'react-router-dom';
import classes from './GenreCard.module.scss';

const GenreCard = (props) => {
	return (
		<li className={classes.genreListItem}>
			<Link
				to={`${props.name}`}
				className={classes.link}
				aria-label={`Link to ${props.name} genre` }

			>
				<div className={classes.imageSection}>
					<picture className={classes.image}>
						
						<img
							src={props.image}
							alt={props.name}
							loading="lazy"
							aria-hidden
						/>
					</picture>
				</div>
				<div>
					<p className={classes.title}>{props.name}</p>
				</div>
			</Link>
		</li>
	);
};

export default GenreCard;
