import classes from './EmptyList.module.scss'
import { Link } from 'react-router-dom';
import { FaRegSadCry } from 'react-icons/fa';

const EmptyList = (props) => {
  return (
		<div className={classes.emptyList}>
			<span>
				<FaRegSadCry className={classes.emptyIcon} />
			</span>
			<p className={classes.text}>
				{props.children}
			</p>
			<Link
				to="/"
				className={classes.link}
			>
				Shop for Games & Apps
			</Link>
		</div>
	);
}

export default EmptyList