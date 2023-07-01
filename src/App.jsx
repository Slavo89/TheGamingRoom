import {
	createBrowserRouter, RouterProvider
} from 'react-router-dom';
import RootLayout from './pages/Root';
import ErrorPage from './pages/ErrorPage'
import HomePage, { loader as gameListLoader } from './pages/HomePage'
import GameDetailsPage, {loader as gameDetailsLoader} from './pages/GameDetailsPage';
import DistributionPage from './pages/DistributionPage'
import SupportPage from './pages/SupportPage'
import BrowsePage from './pages/BrowsePage'
import NewsPage from './pages/NewsPage'
import WishlistPage from './pages/WishlistPage'
import CartPage from './pages/CartPage'

function App() {

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
				{ path: 'browse', element: <BrowsePage /> },
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
	return (
		<RouterProvider router={router}></RouterProvider>
	);
}

export default App;
