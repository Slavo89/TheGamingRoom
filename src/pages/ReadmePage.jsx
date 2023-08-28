import classes from './ReadmePage.module.scss';

const ReadmePage = () => {
	return (
		<section className={classes.readmeSection}>
			<h1 className={classes.title}>Amateur Project `The GamingRoom`</h1>

			<div className={classes.description}>
				<p className={classes.paragraph}>
					This is my amateur project created for learning purposes, inspired by
					the{' '}
					<a
						href="https://www.epicgames.com/"
						target="_blank"
						rel="noreferrer"
						className={classes.link}
					>
						Epic Games Store
					</a>
					. The project was developed using React and various additional
					libraries and tools.
				</p>
				<p className={classes.paragraph}>
					The application utilizes the main API provided by{' '}
					<a
						href="https://rawg.io/"
						target="_blank"
						rel="noreferrer"
						className={classes.link}
					>
						RAWG.io
					</a>{' '}
					for fetching game data. This API was slightly customized to include
					game prices based on Metacritic scores.
				</p>
				<p className={classes.paragraph}>
					Unfortunately, due to limitations in the provided API data, the
					project does not include information about game trailers. This
					constraint has affected the functionality of the project.
					Additionally, the resolution of downloaded images was limited by the
					API.
				</p>
			</div>

			<h2 className={classes.listTitle}>Features</h2>
			<ul className={classes.list}>
				<li>Browsing available games</li>
				<li>Detailed game information</li>
				<li>Adding games to the cart</li>
				<li>Simple checkout process</li>
				<li>Wishlist functionality</li>
				<li>User authentication and login</li>
			</ul>

			<h2 className={classes.listTitle}>Used Technologies and Libraries</h2>
			<ul className={classes.list}>
				<li>React</li>
				<li>Redux (for state management)</li>
				<li>React Router DOM (for view navigation)</li>
				<li>Axios (for making HTTP requests)</li>
				<li>Swiper (for creating slide shows)</li>
				<li>React Select (for creating interactive dropdown lists)</li>
				<li>React Carousel (for displaying image carousels)</li>
				<li>Focus Trap React (for handling focus trapping on elements)</li>
			</ul>
		</section>
	);
};

export default ReadmePage;
