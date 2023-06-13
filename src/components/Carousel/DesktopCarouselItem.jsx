import classes from './DesktopCarouselItem.module.scss';

const DesktopCarouselItem = (props) => {
	return (
		<li
			className={props.isActive ? `${classes.desktopCarouselItem} ${classes.active}` : `${classes.desktopCarouselItem}`}
			onClick={props.onClick}
			
		>
			<div className={classes.itemContaier}>
				<img src={props.img}></img>
				<div>
					<p>{props.name}</p>
				</div>
			</div>
		</li>
	);
};

export default DesktopCarouselItem;
