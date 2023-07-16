import { Outlet, useNavigation } from 'react-router-dom';
import Header from './../components/Layout/Header';
import ActionsBar from '../components/Layout/ActionsBar';
import Backdrop from './../components/UI/Backdrop';
import Container from '../components/Layout/Container';
import Footer from '../components/Layout/Footer';
import { backdropActions } from '../store/backdrop-slice';
import { useDispatch, useSelector } from 'react-redux';

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

	return (
		<>
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
					{navigation.state === 'loading' ? <h1>Loading...</h1> : <Outlet />}
					{/* <Outlet /> */}
				</Container>
			</main>
			<Footer />
			{backdropState && <Backdrop />}
		</>
	);
};

export default RootLayout;
