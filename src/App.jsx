import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import HomePage, { loader as gameListLoader } from './pages/HomePage';
import GameDetailsPage, {
	loader as gameDetailsLoader,
} from './pages/GameDetailsPage';
import DistributionPage from './pages/DistributionPage';
import BrowsePage from './pages/BrowsePage';
import ReadmePage from './pages/ReadmePage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import GamesByGenresPage from './pages/GamesByGenresPage';
import LoginPage, { loader as countriesLoader } from './pages/LoginPage';

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
				{
					path: 'browse',
					element: <BrowsePage />,
				},
				{
					index: true,
					path: 'browse/:genre',
					element: <GamesByGenresPage />,
				},
				{ path: 'readme', element: <ReadmePage /> },
				{ path: 'wishlist', element: <WishlistPage /> },
				{ path: 'cart', element: <CartPage /> },
				{
					path: ':gameId',
					element: <GameDetailsPage />,
					loader: gameDetailsLoader,
				},
			],
		},
		{
			path: '/register',
			element: <LoginPage />,
			loader: countriesLoader,
		},
	]);

	return (
		<RouterProvider router={router}>
			
		</RouterProvider>
	);
}

export default App;
