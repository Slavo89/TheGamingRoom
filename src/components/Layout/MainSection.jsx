import ActionsBar from './ActionsBar';
import classes from './MainSection.module.scss';

const MainSection = (props) => {
	return (
		<main>
      <ActionsBar onClick={props.onClick} />
			<div className={classes.container}>CONTAINER</div>
		</main>
	);
};

export default MainSection;
