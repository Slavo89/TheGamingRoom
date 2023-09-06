import classes from './OpenListButton.module.scss';
import { BsChevronDown } from 'react-icons/bs';

const OpenListButton = (props) => {
	return (
		<button
			type="button"
			className={classes.listButton}
			onClick={props.onClick}
			tabIndex={0}
		>
			{props.children}
			<span className={classes.text}>{props.onChangeText}</span>
			<span>
				<BsChevronDown
					className={
						props.onListOpen
							? `${classes.transformOpen}`
							: `${classes.transformClose}`
					}
				/>
			</span>
		</button>
	);
};

export default OpenListButton;
