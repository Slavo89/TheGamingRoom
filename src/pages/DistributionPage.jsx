import classes from './DistributionPage.module.scss';
import useMediaQuery from './../hooks/use-MediaQuery';

const DistributionPage = () => {
	const is1024px = useMediaQuery('(width >= 1024px)');

	return (
		<>
			<section className={classes.signUpCard}>
				{is1024px && (
					<div className={classes.animation}>
						<img
							src="/src/assets/distributionImages/development.webp"
							alt="icon"
							className={classes.image}
						></img>
					</div>
				)}
				<div className={classes.content}>
					<div>
						<img
							src="/src/assets/distributionImages/egs logo.webp"
							alt="epic logo"
							height={100}
							width={65}
							className={classes.logo}
						></img>
					</div>
					<div>
						<h1 className={classes.header}>
							Now open to all developers and publishers
						</h1>
					</div>
					<div>
						<button
							className={classes.signUpBtn}
							tabIndex={-1}
						>
							<a
								href="https://dev.epicgames.com/portal/"
								target="_blank"
								rel="noreferrer"
							>
								Sign up today
							</a>
						</button>
					</div>
					<div>
						<p className={classes.paragraph}>
							Start distributing PC games on the Epic Games Store with our new
							self-service publishing tools.
						</p>
					</div>
				</div>
			</section>

			<section className={classes.features}>
				<div className={classes.featuresCards}>
					<div className={classes.featuresCard}>
						<div>
							<img
								src="/src/assets/distributionImages/direct-game-distribution-06596600236d.svg"
								alt="icon"
							></img>
						</div>
						<div className={classes.desc}>
							<h3 className={classes.cardTitle}>Reach a Global Audience</h3>
							<p className={classes.text}>
								Direct distribution to over 230 million Epic users across 187
								countries with 16 languages supported.
							</p>
						</div>
					</div>
					<div className={classes.featuresCard}>
						<div>
							<img
								src="/src/assets/distributionImages/video-game-revenue-c74196d72f94.svg"
								alt="icon"
							></img>
						</div>
						<div className={classes.desc}>
							<h3 className={classes.cardTitle}>88%/12% Revenue Split</h3>
							<p className={classes.text}>
								Keep 88% of the revenue and monitor product performance with
								integrated analytics dashboard.
							</p>
						</div>
					</div>
					<div className={classes.featuresCard}>
						<div>
							<img
								src="/src/assets/distributionImages/player-engagement-69f0a2ba31cd.svg"
								alt="icon"
							></img>
						</div>
						<div className={classes.desc}>
							<h3 className={classes.cardTitle}>Drive Player Engagement</h3>
							<p className={classes.text}>
								Tap into store features like wishlists, achievements, store-wide
								promotions and more!
							</p>
						</div>
					</div>

					<div className={classes.featuresCard}>
						<div>
							<img
								src="/src/assets/distributionImages/epic-games-payment-methods-18cc6135990f.svg"
								alt="icon"
							></img>
						</div>
						<div className={classes.desc}>
							<h3 className={classes.cardTitle}>Worldwide E-Commerce</h3>
							<p className={classes.text}>
								Epic`s payment service supports 76 payment methods with 47
								regional currencies and more on the way.
							</p>
						</div>
					</div>
					<div className={classes.featuresCard}>
						<div>
							<img
								src="/src/assets/distributionImages/epic-games-wallet-2af74bb47a7a.svg"
								alt="icon"
							></img>
						</div>
						<div className={classes.desc}>
							<h3 className={classes.cardTitle}>Epic Wallet</h3>
							<p className={classes.text}>
								Users can load up their Wallet with funds to spend on products
								and services in the store, now available in more than 140
								countries.
							</p>
						</div>
					</div>
					<div className={classes.featuresCard}>
						<div>
							<img
								src="/src/assets/distributionImages/game-ratings-localization-and-affliate-network-benefits-a931a6cb27b8.svg"
								alt="icon"
							></img>
						</div>
						<div className={classes.desc}>
							<h3 className={classes.cardTitle}>Additional Benefits</h3>
							<p className={classes.text}>
								Easy IARC ratings in Epic Developer Portal, request no-cost
								localization for store pages and activate our Support-A-Creator
								affiliate network.
							</p>
						</div>
					</div>
				</div>

				<div className={classes.comunityCard}>
					<div>
						<p>
							Join the discuss or create topics for community support around
							distribution
						</p>
						<a href="https://dev.epicgames.com/community/epic-games-store">
							Go to the community
						</a>
					</div>
				</div>
				<div>Dwie Karty</div>
			</section>
			<section>
				<div>FAQ</div>
			</section>
		</>
	);
};

export default DistributionPage;
