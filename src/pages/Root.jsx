import { useEffect } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import Header from './../components/Layout/Header';
import ActionsBar from '../components/Layout/ActionsBar';
import Backdrop from './../components/UI/Backdrop';
import Container from '../components/Layout/Container';
import Footer from '../components/Layout/Footer';
import { backdropActions } from '../store/backdrop-slice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const RootLayout = () => {
	const navigation = useNavigation();
	const location = useLocation();
	const backdropState = useSelector(
		(state) => state.backdrop.isBackdropVisible
	);
	const dispatch = useDispatch();

	const toggleBackdropHandler = () => {
		dispatch(backdropActions.showBackdrop());
	};

	const closeBackdropHandler = () => {
		dispatch(backdropActions.hideBackdrop());
	};

	useEffect(() => {
		if (backdropState) {
			document.body.classList.add('unscrollable');
		} else {
			document.body.classList.remove('unscrollable');
		}
	}, [backdropState]);

	useEffect(() => {
		closeBackdropHandler();
		window.scrollTo({
			top: 0,
			behavior: 'instant'
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return (
		<>
			<Header
				onClick={toggleBackdropHandler}
				onClose={closeBackdropHandler}
			/>
			<main>
				<ActionsBar
				/>
				<Container>
					{navigation.state === 'loading' ? <LoadingSpinner /> : <Outlet />}
				</Container>
			</main>
			<Footer />
			{backdropState && <Backdrop />}
		</>
	);
};

export default RootLayout;
