import classes from './DesktopCarouselItem.module.scss';

const DesktopCarouselItem = (props) => {
	return (
		<li
			tabIndex="0"
			className={
				props.isActive
					? `${classes.desktopCarouselItem} ${classes.active}`
					: `${classes.desktopCarouselItem}`
			}
			onClick={props.onClick}
			onKeyPress={(event) => {
				if (event.key === 'Enter') {
					props.onClick()
				}
			}}
		>
			<div className={classes.itemContainer}>
				<img
					src={props.background_image}
					alt={`${props.name} cover`}
					className={classes.image}
					aria-label='Show'
				></img>
				<div className={classes.titleContainer}>
					<p className={classes.title}>{props.name}</p>
				</div>
			</div>
		</li>
	);
};

export default DesktopCarouselItem;
