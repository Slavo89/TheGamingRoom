import classes from './CTAButton.module.scss'

const CTAButton = (props) => {
	return <button className={classes.CTAButton} onClick={props.onClick}>{props.children}</button>;
};

export default CTAButton;
