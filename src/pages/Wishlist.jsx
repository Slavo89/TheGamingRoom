import { FaRegSadCry, FaRegQuestionCircle, FaMailBulk } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import classes from './Wishilst.module.scss';
import useMediaQuery from '../hooks/use-MediaQuery';
import OpenListButton from '../components/Buttons/OpenListButton';
import { useState, useEffect, useRef } from 'react';
import CartCard from '../components/Cards/CartCard';

const DUMMY_WISHLIST = [
	{	
		id:1,
		title: 'Dead Island 2',
		img: 'https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360',
		price: 249,
		platform: ['PC', 'PS5', 'Xbox'],
		esrb_rating: ['Violence', 'Bad language'],
	},
	{	
		id:2,
		title: 'Dead Island 2',
		img: 'https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360',
		price: 249,
		platform: ['PC', 'PS5', 'Xbox', 'Apple'],
		esrb_rating: ['Violence', 'Bad language'],
	},
	{	
		id:3,
		title: 'Dead Island 2',
		img: 'https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360',
		price: 249,
		platform: ['PC', 'PS5', 'Xbox'],
		esrb_rating: [],
	},
	{	
		id:4,
		title: 'Dead Island 2',
		img: 'https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360',
		price: 249,
		platform: ['PC', 'PS5', 'Xbox'],
		esrb_rating: ['Violence', 'Bad language'],
	},
];

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


						<CartCard />
				
				{ /* EMPTY WISHLIST */}
				

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
