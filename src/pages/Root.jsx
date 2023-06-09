import { Outlet, useNavigation } from 'react-router-dom';
import { useState } from 'react';
import Header from './../components/Layout/Header';
import ActionsBar from '../components/Layout/ActionsBar';
import Backdrop from './../components/UI/Backdrop';
import Container from '../components/Layout/Container';
import Footer from '../components/Layout/Footer';

const RootLayout = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigation = useNavigation();


	const toggleBackdrop = () => {
		setIsOpen(!isOpen);
	};
	const closeBackdrop = () => {
		setIsOpen(false)
	}
	return (
		<>
			<Header
				onClick={toggleBackdrop}
				onClose={closeBackdrop}
			/>
			<main>
				<ActionsBar
					onClick={toggleBackdrop}
					onClose={closeBackdrop}
				/>
				<Container>
					{navigation.state === 'loading' ? <h1>Loading...</h1> : <Outlet/>}
					{/* <Outlet /> */}
				</Container>
			</main>
			<Footer />
			{isOpen && <Backdrop />}
		</>
	);
};

export default RootLayout;
