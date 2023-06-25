import { useRouteError } from 'react-router-dom';
import { useState } from 'react';
import Container from '../components/Layout/Container';
import Header from '../components/Layout/Header';
import ActionsBar from '../components/Layout/ActionsBar';
import Footer from '../components/Layout/Footer';
import Backdrop from '../components/UI/Backdrop';

const ErrorPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleBackdrop = () => {
		setIsOpen(!isOpen);
	};
	const closeBackdrop = () => {
		setIsOpen(false);
	};

	const error = useRouteError();

	let title = 'An error occured!';
	let message = 'Something went wrong!';

	if (error.status === 500) {
		message = error.data.message;
	}

	if (error.status === 404) {
		title = 'Not found';
		message = 'Could not find resource of page.';
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
					<h1>{title}</h1>
					<p>{message}</p>
				</Container>
			</main>
			<Footer />
			{isOpen && <Backdrop />}
		</>
	);
};

export default ErrorPage;
