import classes from './CTAButton.module.scss'

const CTAButton = (props) => {
	return <button className={classes.CTAButton} disabled={props.disabled} onClick={props.onClick}>{props.children}</button>;
};

export default CTAButton;
