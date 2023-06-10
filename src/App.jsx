import {
	createBrowserRouter, RouterProvider
} from 'react-router-dom';
import RootLayout from './pages/Root';
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import DistributionPage from './pages/DistributionPage'
import SupportPage from './pages/SupportPage'
import BrowsePage from './pages/BrowsePage'
import NewsPage from './pages/NewsPage'

function App() {

	const router = createBrowserRouter([
		{
			path: '/',
			element: <RootLayout />,
			errorElement: <ErrorPage />,
			children: [
				{ index: true, element: <HomePage /> },
				{ path: 'distribution', element: <DistributionPage /> },
				{ path: 'support', element: <SupportPage /> },
				{ path: 'browse', element: <BrowsePage /> },
				{ path: 'news', element: <NewsPage /> },
			],
		},
	]);
	return (
		<RouterProvider router={router}></RouterProvider>
	);
}

export default App;
