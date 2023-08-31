import { useState } from 'react';
import classes from './DistributionPage.module.scss';
import useMediaQuery from './../hooks/use-MediaQuery';

const cardData = [
	{
		id: 1,
		src: '/assets/distributionImages/direct-game-distribution-06596600236d.svg',
		title: 'Reach a Global Audience',
		text: `Direct distribution to over 230 million Epic users across 187
								countries with 16 languages supported.`,
	},
	{
		id: 2,
		src: '/assets/distributionImages/video-game-revenue-c74196d72f94.svg',
		title: '88%/12% Revenue Split',
		text: `Keep 88% of the revenue and monitor product performance with
								integrated analytics dashboard.`,
	},
	{
		id: 3,
		src: '/assets/distributionImages/player-engagement-69f0a2ba31cd.svg',
		title: 'Drive Player Engagement',
		text: `Tap into store features like wishlists, achievements, store-wide
								promotions and more!`,
	},
	{
		id: 4,
		src: '/assets/distributionImages/epic-games-payment-methods-18cc6135990f.svg',
		title: 'Worldwide E-Commerce',
		text: `Epic's payment service supports 76 payment methods with 47
								regional currencies and more on the way.`,
	},
	{
		id: 5,
		src: '/assets/distributionImages/epic-games-wallet-2af74bb47a7a.svg',
		title: 'Epic Wallet',
		text: `Users can load up their Wallet with funds to spend on products
								and services in the store, now available in more than 140
								countries.`,
	},
	{
		id: 6,
		src: '/assets/distributionImages/game-ratings-localization-and-affliate-network-benefits-a931a6cb27b8.svg',
		title: 'Additional Benefits',
		text: `Easy IARC ratings in Epic Developer Portal, request no-cost
								localization for store pages and activate our Support-A-Creator
								affiliate network.`,
	},
];

const questionItems = [
	{
		id: 1,
		question: 'Why should I distribute my game on the Epic Games Store?',
		answer: (
			<p>
				The Epic Games Store has a global audience of over 230M+ users, a
				88%/12% revenue split and additional no-cost services to help bring your
				game to market. For games built on Unreal Engine, engine royalty fees
				are waived for in-store purchases using Epic`s payment processor. In-app
				purchases and products using their own payment processor are not exempt
				from engine royalties.
			</p>
		),
	},
	{
		id: 2,
		question:
			'My game is built with Unity or another engine, can I bring it to the Epic Games store?',
		answer: (
			<p>
				Yes, the Epic Games store is engine-agnostic. Epic is aiming to bring
				great games to players, regardless of your engine choice.
			</p>
		),
	},
	{
		id: 3,
		question: 'What are the Epic Games Store self-service publishing tools?',
		answer: (
			<p>
				They are a suite of tools within the Epic Developer Portal used by
				developers to set up their game pages, pricing, offers, builds, and
				updates on the Epic Games Store.
			</p>
		),
	},
	{
		id: 4,
		question: 'What is the Epic Developer Portal?',
		answer: (
			<p>
				The Developer Portal is the central hub to distribute games on the Epic
				Games Store and enhance games with Epic Online Services. The Developer
				Portal is used to update product information, configure back-end
				services, support players, and view game financial data, usage reports,
				and other statistical data. Learn more by reading the{' '}
				<a
					href="https://dev.epicgames.com/docs/dev-portal"
					target="_blank"
					rel="noreferrer"
				>
					Developer Portal documentation.
				</a>
			</p>
		),
	},
	{
		id: 5,
		question: 'What other developer tools does Epic offer?',
		answer: (
			<p>
				Epic offers an ecosystem of tools, services, and communities to help
				anyone create, power, and distribute software. With a single Epic Games
				account, anyone can create with Unreal Engine, enhance with Epic Online
				Services and Kids Web Services, and distribute PC games on the Epic
				Games Store. Even more tools like Twinmotion, MetaHuman, Quixel, and
				Capturing Reality bring your project to the next level. And the Epic
				Developer Community is here to connect creators alike to share and
				learn. Learn more about{' '}
				<a
					href="https://dev.epicgames.com/en-US/home"
					target="_blank"
					rel="noreferrer"
				>
					Epic`s ecosystem of tools, services, and communities.
				</a>
			</p>
		),
	},
	{
		id: 6,
		question: 'How do I distribute games on the Epic Games Store?',
		answer: (
			<p>
				Getting started is easy, just log in or create an account at{' '}
				<a
					href="https://dev.epicgames.com/portal/en-US/"
					target="_blank"
					rel="noreferrer"
				>
					dev.epicgames.com/portal
				</a>
				. From there the sign up wizard will help guide registration of your
				company and the build of your first game. Be sure to have business
				information (contact info and tax/payout information) on hand. Important
				to note there is a recoupable $100 USD submission fee per game which
				will need to paid before releasing on the store. Read our
				<a
					href="https://store.epicgames.com/en-US/news/epic-games-store-launches-self-publishing-tools-for-game-developers-and-publishers"
					target="_blank"
					rel="noreferrer"
				>
					announcement blog
				</a>{' '}
				for an overview of the self-publishing process.
			</p>
		),
	},
	{
		id: 7,
		question: 'Are there any requirements for a game to launch on the Store?',
		answer: (
			<p>
				All products published on the Epic Games Store adhere to our content
				guidelines. In addition, they must launch, run, and be consistent with
				the product description presented to users via their Product Details
				Page (PDP). Multiplayer games must support crossplay across all PC
				stores. This is to make sure players who purchase a multiplayer game on
				any store can easily connect with other players, regardless of where the
				game was purchased. To achieve this, you can implement crossplay
				yourself, use a third-party SDK, or use Epic Online Services for free.
				Achievements - All games onboarded to the Epic Games Store publishing
				tools after March 9, 2023 are required to enable Epic Games Store
				achievements if the game has achievements on other PC stores. This helps
				standardize the player experience regardless of where the game was
				purchased. Visit the{' '}
				<a
					href="https://dev.epicgames.com/docs/epic-games-store/requirements-guidelines/distribution-requirements/requirements-overview"
					target="_blank"
					rel="noreferrer"
				>
					Epic Games Store Requirements documentation
				</a>{' '}
				for more information.
			</p>
		),
	},
	{
		id: 8,
		question: 'Any prohibited content that the Store may decline?',
		answer: (
			<p>
				Products that contain prohibited content (hateful or discriminatory
				content, pornography, and illegal content) are not eligible for
				distribution on the Epic Games Store. Content that infringes on
				intellectual property you do not own or have rights to use scams,
				frauds, or deceptive practices, such as fake games or malware are also
				prohibited. Published products receiving complaints about content that
				does not meet the criteria may be subject to re-review and removal from
				the Epic Games Store. Visit the{' '}
				<a
					href="https://dev.epicgames.com/docs/epic-games-store/requirements-guidelines/content-ratings"
					target="_blank"
					rel="noreferrer"
				>
					Epic Games Store Ratings & Content Guidelines documentation
				</a>{' '}
				for more information.
			</p>
		),
	},
	{
		id: 9,
		question: 'Does the Epic Games store have regional pricing?',
		answer: (
			<p>
				Yes, we do support regional pricing. We also have a set of suggested
				regional discounts based on local norms.
			</p>
		),
	},
	{
		id: 10,
		question: 'How do refunds work on the Epic Games store?',
		answer: (
			<p>
				Games and products purchased through the Epic Games Store are generally
				eligible for a refund. These products are marked “refundable”. If a game
				or product is marked as `non-refundable`, then it is not eligible for a
				refund. Products that include virtual currency or other consumables are
				marked “non-refundable” and are not eligible for refund. Also, most
				in-app purchases are non-refundable. Epic cannot provide refunds for
				purchases made outside of the Epic Games Store. Visit the{' '}
				<a
					href="https://www.epicgames.com/site/pl/store-refund-policy"
					target="_blank"
					rel="noreferrer"
				>
					Epic Games Store Refund Policy
				</a>{' '}
				for more information.
			</p>
		),
	},
];

const DistributionPage = () => {
	const is1024px = useMediaQuery('(width >= 1024px)');

	const [activeItems, setActiveItems] = useState({});

	const toggleActiveClassHandler = (itemId) => {
		setActiveItems((prevState) => ({
			...prevState,
			[itemId]: !prevState[itemId],
		}));
	};

	return (
		<>
			<section>
				<div className={`${classes.signUpCard} ${classes.card}`}>
					{is1024px && (
						<div className={classes.animation}>
							<img
								src="/assets/distributionImages/development.webp"
								alt="icon"
								className={classes.image}
							></img>
						</div>
					)}
					<div className={classes.content}>
						<div>
							<img
								src="/assets/distributionImages/egs logo.webp"
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
				</div>
			</section>

			<section className={classes.features}>
				<div className={classes.featuresCards}>
					{cardData.map((card) => (
						<div
							className={`${classes.featuresCard} ${classes.card}`}
							key={card.id}
						>
							<div>
								<img
									src={card.src}
									alt="icon"
								></img>
							</div>
							<div className={classes.desc}>
								<h3 className={classes.cardTitle}>{card.title}</h3>
								<p className={classes.text}>{card.text}</p>
							</div>
						</div>
					))}
				</div>

				<div
					className={`${classes.communityCard} ${classes.card} ${classes.backgroundFirst}`}
				>
					<div>
						<img
							src="/assets/distributionImages/epic-community-logo.svg"
							alt="logo"
							className={classes.cardLogo}
						></img>
					</div>
					<div className={classes.cardContent}>
						<p className={classes.text}>
							Join the discuss or create topics for community support around
							distribution
						</p>
						<a
							href="https://dev.epicgames.com/community/epic-games-store"
							className={classes.link}
						>
							Go to the community
						</a>
					</div>
				</div>
				<div className={classes.servicesCards}>
					<div
						className={`${classes.card} ${classes.communityCard} ${classes.backgroundSecond}`}
					>
						<div>
							<img
								src="/assets/distributionImages/epic-online-services-logo.svg"
								alt="logo"
								className={classes.cardLogo}
							></img>
						</div>
						<div className={classes.cardContent}>
							<p className={classes.text}>
								A modular set of online services to connect your community
								across all platforms
							</p>
							<a
								href="https://dev.epicgames.com/en-US/services"
								className={classes.link}
							>
								Explore our services
							</a>
						</div>
					</div>
					<div
						className={`${classes.card} ${classes.communityCard} ${classes.backgroundThird}`}
					>
						<div>
							<img
								src="/assets/distributionImages/unreal-engine-logo.svg"
								alt="logo"
								className={classes.cardLogo}
							></img>
						</div>
						<div className={classes.cardContent}>
							<p className={classes.text}>
								The world`s most open and advanced real-time 3D creation tool
							</p>
							<a
								href="https://www.unrealengine.com/en-US"
								className={classes.link}
							>
								Learn more
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className={classes.faq}>
				<h2 className={classes.title}>Frequenly Asked Questions</h2>
				<ul className={classes.questionList}>
					{questionItems.map((item) => (
						<li
							key={item.id}
							className={classes.questionItem}
						>
							<button
								className={`${classes.accordion} ${
									activeItems[item.id] ? classes.active : ''
								}`}
								onClick={() => toggleActiveClassHandler(item.id)}
							>
								{item.question}
							</button>
							<div className={classes.panel}>{item.answer}</div>
						</li>
					))}
				</ul>
			</section>
		</>
	);
};

export default DistributionPage;
