import { FaRegSadCry, FaRegQuestionCircle, FaMailBulk } from 'react-icons/fa';
// import { BsChevronDown } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import classes from './Wishilst.module.scss';
import useMediaQuery from '../hooks/use-MediaQuery';
import OpenListButton from '../components/Buttons/OpenListButton';
import { useState, useEffect, useRef } from 'react';

const Wishlist = () => {
	const [listOpen, setListOpen] = useState(false);
	const [sortBy, setSortBy] = useState('On Sale');
	const sortListRef = useRef(null);

	useEffect(() => {
		const closeListHandler = () => {
			if (listOpen === true) {
				setListOpen(false);
			} else {
				return;
			}
		};

		const handleOutsideClick = (event) => {
			if (sortListRef.current && !sortListRef.current.contains(event.target)) {
				closeListHandler();
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [listOpen]);

	const sortByHandler = () => {
		setSortBy(event.target.innerHTML);
		setListOpen(false);
	};

	const toggleListHandler = () => {
		setListOpen(!listOpen);
	};

	// const closeListHandler = () => {
	// 	setListOpen(false);
	// };

	

	const is770Px = useMediaQuery('(width >= 770px)');

	return (
		<>
			<h1>Wishlist</h1>
			<section className={classes.wishlistSection}>
				<div className={classes.notificationSwitch}>
					{is770Px ? (
						<div className={classes.flexContainer}>
							<FaMailBulk className={classes.icon} />
							<p className={classes.paragraph}>
								Receive email notification about my wishlist.
							</p>
							<div className={classes.tooltip}>
								<FaRegQuestionCircle />
								<span className={classes.tooltipText}>
									Get notified when your wishlisted games go on sale, or are
									available for purshase or pre-purshase.
								</span>
							</div>
						</div>
					) : (
						<p className={classes.paragraph}>
							Receive email notification about my wishlist.
						</p>
					)}
					<label className={classes.switch}>
						<input type="checkbox" />
						<span className={classes.slider}></span>
					</label>
				</div>
				<div className={classes.sortList}>
					<span className={classes.span}>Sort By :</span>
					<div ref={sortListRef}>
						<OpenListButton
							onClick={toggleListHandler}
							onChangeText={sortBy}
							onListOpen={listOpen}
						/>
					</div>
					{listOpen && (
						<ul>
							<li
								className={classes.active}
								onClick={sortByHandler}
							>
								On Sale
							</li>
							<li onClick={sortByHandler}>Recently Added</li>
							<li onClick={sortByHandler}>Alphabetical</li>
							<li onClick={sortByHandler}>Price: Low to High</li>
							<li onClick={sortByHandler}>Price: High to Low</li>
						</ul>
					)}
				</div>
				<div className={classes.gameList}>
					<div className={classes.emptyList}>
						<span>
							<FaRegSadCry className={classes.emptyIcon} />
						</span>
						<p className={classes.text}>
							You haven`t added anything to your wishlist yet.
						</p>
						<Link
							to="/"
							className={classes.link}
						>
							Shop for Games & Apps
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default Wishlist;
