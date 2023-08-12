import { useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
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

	return (
		<>
			{/* <CheckoutModal /> */}
			<Header
				onClick={toggleBackdropHandler}
				onClose={closeBackdropHandler}
			/>
			<main>
				<ActionsBar
					onClick={toggleBackdropHandler}
					onClose={closeBackdropHandler}
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
