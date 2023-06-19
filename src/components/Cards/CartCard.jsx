import { Link } from 'react-router-dom'
import classes from './CartCard.module.scss'

const id = 3456

const CartCard = () => {
  return <Link to={`/${id}`} >{id}</Link>;
}

export default CartCard