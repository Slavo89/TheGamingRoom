import { useState, useEffect, useRef } from 'react';
import useMediaQuery from '../../hooks/use-MediaQuery';
import OpenListButton from '../Buttons/OpenListButton';
import { useDispatch } from 'react-redux';
import { backdropActions } from '../../store/backdrop-slice';
import classes from './SortList.module.scss';

const SortList = (props) => {
	const sortListRef = useRef(null);
	const [listOpen, setListOpen] = useState(false);
	const [activeSort, setActiveSort] = useState(`${props.firstLabel}`);
	const is1024Px = useMediaQuery('(width >= 1024px)');
    const dispatch = useDispatch();
    

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

	const sortByRecentlyAddedHandler = () => {
		props.sortItems(props.originalItems);
		setActiveSort('Recently Added');
	};

	const sortByNameHandler = () => {
		const sortedItems = [...props.originalItems];
		sortedItems.sort((a, b) => {
			const nameA = a.name.toLowerCase();
			const nameB = b.name.toLowerCase();

			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
		props.sortItems(sortedItems);
        setActiveSort('Alphabetical');
    };

	const sortByPriceHandler = (price) => {
		const sortedItems = [...props.originalItems];
		if (price === 'lowToHigh') {
			sortedItems.sort((a, b) => {
				return a.price - b.price;
			});
			props.sortItems(sortedItems);
			setActiveSort('Price: Low to High');
		} else if (price === 'highToLow') {
			sortedItems.sort((a, b) => {
				return b.price - a.price;
			});
			props.sortItems(sortedItems);
			setActiveSort('Price: High to Low');
		}
	};

	const toggleListHandler = () => {
		setListOpen(!listOpen);
	};


	const toggleBackdropHandler = () => {
		dispatch(backdropActions.showBackdrop());
	};

	return (
		<div className={classes.sortList}>
			<span className={classes.span}>Sort By :</span>
			<div ref={sortListRef}>
				<OpenListButton
					onClick={toggleListHandler}
					onChangeText={activeSort}
					onListOpen={listOpen}
				/>
			</div>
			{listOpen && (
				<ul>
					<li
						tabIndex="0"
						className={activeSort === 'Recently Added' ? classes.active : ''}
						onClick={sortByRecentlyAddedHandler}
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								sortByRecentlyAddedHandler();
							}
						}}
					>
						{props.firstLabel}
					</li>
					<li
						tabIndex="0"
						className={activeSort === 'Alphabetical' ? classes.active : ''}
						onClick={sortByNameHandler}
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								sortByNameHandler();
							}
						}}
					>
						Alphabetical
					</li>
					<li
						tabIndex="0"
						className={
							activeSort === 'Price: Low to High' ? classes.active : ''
						}
						onClick={() => {
							sortByPriceHandler('lowToHigh');
						}}
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								sortByPriceHandler('lowToHigh');
							}
						}}
					>
						Price: Low to High
					</li>
					<li
						tabIndex="0"
						className={
							activeSort === 'Price: High to Low' ? classes.active : ''
						}
						onClick={() => {
							sortByPriceHandler('highToLow');
						}}
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								sortByPriceHandler('highToLow');
							}
						}}
					>
						Price: High to Low
					</li>
				</ul>
			)}
			{!is1024Px && (
				<button
					className={classes.filterHeader}
					onClick={() => {
						props.onToggleFiltersMenu();
						toggleBackdropHandler();
					}}
				>
					<span>Filter</span>
					<div className={classes.menuIcon}>
						<div className={`${classes.line} ${classes.top}`}></div>
						<div className={`${classes.line} ${classes.middle}`}></div>
						<div className={`${classes.line} ${classes.bottom}`}></div>
					</div>
				</button>
			)}
		</div>
	);
};

export default SortList;
