import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import HomePage, { loader as gameListLoader } from './pages/HomePage';
import GameDetailsPage, {
	loader as gameDetailsLoader,
} from './pages/GameDetailsPage';
import DistributionPage from './pages/DistributionPage';
import SupportPage from './pages/SupportPage';
import BrowsePage, { loader as browseGameListLoader } from './pages/BrowsePage';
import NewsPage from './pages/NewsPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import { useState } from 'react';
import GamesByGenresPage, {
	loader as gamesByGenresLoader,
} from './pages/GamesByGenresPage';

function App() {
	const [activeBrowsePage, setActiveBrowsePage] = useState(1);
	const [activeGenrePage, setActiveGenrePage] = useState(1);
	const changeBrowsePageHandler = (page) => {
		setActiveBrowsePage(page);
	};
	const changeGenrePageHandler = (page) => {
		setActiveGenrePage(page);
	};

	const router = createBrowserRouter([
		{
			path: '/',
			element: <RootLayout />,
			errorElement: <ErrorPage />,
			children: [
				{
					index: true,
					element: <HomePage />,
					loader: gameListLoader,
				},
				{ path: 'distribution', element: <DistributionPage /> },
				{ path: 'support', element: <SupportPage /> },
				{
					path: 'browse',
					element: (
						<BrowsePage
							onPageChange={changeBrowsePageHandler}
							page={activeBrowsePage}
						/>
					),
					loader: () => browseGameListLoader(activeBrowsePage),
				},
				{
					index: true,
					path: 'browse/:genre',
					element: (
						<GamesByGenresPage
							onPageChange={changeGenrePageHandler}
							page={activeGenrePage}
						/>
					),
					loader: ({ params }) =>
						gamesByGenresLoader(activeGenrePage, params.genre.toLowerCase()),
				},
				{ path: 'news', element: <NewsPage /> },
				{ path: 'wishlist', element: <WishlistPage /> },
				{ path: 'cart', element: <CartPage /> },
				{
					path: ':gameId',
					element: <GameDetailsPage />,
					loader: gameDetailsLoader,
				},
			],
		},
	]);
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
