import classes from './DesktopCarouselItem.module.scss';

const DesktopCarouselItem = (props) => {
	return (
		<li className={classes.desktopCarouselItem}>
			<div className={classes.listContaier}>
				<img src={props.img}></img>
				<div>
					<p>{props.name}</p>
				</div>
			</div>
		</li>
	);
};

export default DesktopCarouselItem;
