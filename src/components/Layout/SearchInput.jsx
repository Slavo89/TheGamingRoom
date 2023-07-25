import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import classes from './SearchInput.module.scss';
import { useCallback } from 'react';

const SearchInput = (props) => {
	const searchBarRef = useRef(null);
	const searchValueRef = useRef('');
	const [inputValue, setInputValue] = useState('')
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [searchData, setSearchData] = useState(null);
	let timer = null;

	const searchGameHandler = async () => {
		try {
			const response = await axios.get(
				`https://api.rawg.io/api/games?search=${searchValueRef.current}&key=8c5f5a03a748417b9752c0b536fa1e98`
			);
			const data = response.data;
			const sortedData = data.results
				.sort((a, b) => b.ratings_count - a.ratings_count)
				.slice(0, 5);

			setSearchData(sortedData);
		} catch (error) {
			console.error('Could not find games', error);
		}
	};

	const handleInputFocus = () => {
		if (searchValueRef.current !== '') {
			setIsInputFocused(true);
		}
		
	};

	const handleInputChange = (event) => {
		searchValueRef.current = event.target.value;
		setInputValue(event.target.value)
		setIsInputFocused(true);
		if (searchValueRef.current === '') {
			setIsInputFocused(false);
		}

		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			searchGameHandler();
		}, 500);
	};

	const resetInputValue = () => {
		searchValueRef.current = '';
		setInputValue('')
	};

	const handleClickOutside = useCallback(
		(event) => {
			if (!searchBarRef.current.contains(event.target) && isInputFocused) {
				setIsInputFocused(false);
			}
		},
		[isInputFocused]
	);

	useEffect(() => {
		window.addEventListener('click', handleClickOutside);

		// Removing the event listener when unmounting a component
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	}, [handleClickOutside]);

	return (
		<div>
			<input
				className={classes.searchInput}
				placeholder="Search store"
				ref={searchBarRef}
				value={inputValue}
				onChange={handleInputChange}
				onFocus={handleInputFocus}
			></input>
			{props.onRenderResults(
				searchData,
				searchValueRef,
				isInputFocused,
				resetInputValue
			)}
		</div>
	);
};

export default SearchInput;
