import classes from './Footer.module.scss';
import {
	SiEpicgames,
	SiUnrealengine,
	SiFacebook,
	SiTwitter,
	SiYoutube,
} from 'react-icons/si';
import { BsChevronUp } from 'react-icons/bs';

const Footer = () => {
	const scrollToTopHandler = () => {
		window.scrollTo({
			top: 0,
		});
	};

	return (
		<div className={classes.footer}>
			<div className={classes.social}>
				<ul className={classes.socialLinks}>
					<li>
						<a className={classes.link}>
							<SiFacebook />
						</a>
					</li>
					<li>
						<a className={classes.link}>
							<SiTwitter />
						</a>
					</li>
					<li>
						<a className={classes.link}>
							<SiYoutube />
						</a>
					</li>
				</ul>
				{/* <div className={classes.buttonContainer}> */}

				<button
					type="button"
					className={classes.upButton}
					onClick={scrollToTopHandler}
				>
					<BsChevronUp />
				</button>

				{/* </div> */}
			</div>
			<div className={classes.footerLinks}>
				<div>
					<span className={classes.footerLinksTitle}>Resources</span>
					<div className={classes.listContainer}>
						<ul className={classes.list}>
							<li>
								<a href="">Support-A-Creator</a>
							</li>
							<li>
								<a href="">Distribute on Epic Games</a>
							</li>
							<li>
								<a href="">Careers</a>
							</li>
							<li>
								<a href="">Company</a>
							</li>
						</ul>
						<ul className={classes.list}>
							<li>
								<a href="">Fan art Policy</a>
							</li>
							<li>
								<a href="">UX Researcgh</a>
							</li>
							<li>
								<a href="">Store EULA</a>
							</li>
						</ul>
						<ul className={classes.list}>
							<li>
								<a href="">Online Services</a>
							</li>
							<li>
								<a href="">Comunity Rules</a>
							</li>
							<li>
								<a href="">Epic Newsroom</a>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<span className={classes.footerLinksTitle}>Made By Epic Games</span>
					<div className={classes.listContainer}>
						<ul className={classes.list}>
							<li>
								<a href="">Battle Breakers </a>
							</li>
							<li>
								<a href="">Fortnite </a>
							</li>
							<li>
								<a href="">Infinity Blade </a>
							</li>
						</ul>
						<ul className={classes.list}>
							<li>
								<a href="">Robo Recall </a>
							</li>
							<li>
								<a href="">Shadow Complex </a>
							</li>
							<li>
								<a href="">Unreal Tournament </a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<hr></hr>
			<div className={classes.copyright}>
				<p>
					&#169; 2023, Epic Games, Inc. All rights reserved. Epic, Epic Games,
					the Epic Games logo, Fortnite, the Fortnite logo, Unreal, Unreal
					Engine, the Unreal Engine logo, Unreal Tournament, and the Unreal
					Tournament logo are trademarks or registered trademarks of Epic Games,
					Inc. in the United States of America and elsewhere. Other brands or
					product names are the trademarks of their respective owners.
				</p>
			</div>
			<div className={classes.policyLinks}>
				<ul className={classes.linksList}>
					<li>
						<a href="https://www.epicgames.com/site/en-US/tos">
							Terms of Service
						</a>
					</li>
					<li>
						<a href="https://www.epicgames.com/site/en-US/privacypolicy">
							Privacy Policy
						</a>
					</li>
					<li>
						<a href="https://www.epicgames.com/site/en-US/store-refund-policy">
							Store Refund Policy
						</a>
					</li>
				</ul>
				<ul className={classes.logos}>
					<li>
						<a
							href="https://store.epicgames.com/"
							target="_blank"
							rel="noreferrer"
							className={classes.logoLink}
						>
							<SiEpicgames />
						</a>
					</li>
					<li>
						<a
							href="https://www.unrealengine.com/"
							target="_blank"
							rel="noreferrer"
							className={classes.logoLink}
						>
							<SiUnrealengine />
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Footer;
