import BrowsePageCard from "../components/Cards/BrowsePageCard"
import SortList from "../components/Layout/SortList"
import classes from './BrowsePage.module.scss'

const BrowsePage = () => {
  
  return (
    <>
      <section>
        <h2>Popular Genres</h2>
      </section>
      <section>
        <SortList/>
        <ul className={classes.cardsContainer}>
          <BrowsePageCard/>
          <BrowsePageCard/>
          <BrowsePageCard/>
          <BrowsePageCard/>
          <BrowsePageCard/>
          <BrowsePageCard/>
          <BrowsePageCard/>
          <BrowsePageCard/>
          <BrowsePageCard/>
          <BrowsePageCard/>
          <BrowsePageCard/>
          <BrowsePageCard/>
        </ul>
        <h2>Pagination</h2>
      </section>
    </>
  )
}

export default BrowsePage