import classes from './Container.module.scss'

const Container = (props) => {
  return (
      <div className={classes.container}>{props.children}</div>
  )
}

export default Container