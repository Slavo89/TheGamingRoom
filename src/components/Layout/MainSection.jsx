import ActionsBar from './ActionsBar'
import classes from './MainSection.module.scss'

const MainSection = () => {
  return (
      <main>
             <ActionsBar/>
          <div className={classes.container}>CONTAINER
          </div>
    </main>
  )
}

export default MainSection;