import classes from './OpenListButton.module.scss';
import { BsChevronDown } from 'react-icons/bs';

const OpenListButton = (props) => {
	return (
		<button
			type="button"
			className={classes.listButton}
			onClick={props.onClick}
			tabIndex={0}
			aria-label='Open list'
		>
			{props.children}
			<span className={classes.text}>{props.onChangeText}</span>
			<span className={classes.icon}>
				<BsChevronDown
					className={
						props.onListOpen
							? `${classes.transformOpen}`
							: `${classes.transformClose}`
					}
					aria-hidden
				/>
			</span>
		</button>
	);
};

export default OpenListButton;
