import classes from './BrowsePageCard.module.scss';

const BrowsePageCard = () => {
	return (
		<li className={classes.browseCard}>
			<div className={classes.link}>
                <div className={classes.imageSection}>
                    <picture className={classes.image}>
                        <source
                            media="(min-width: 0px)"
                            // srcSet={img}
                            srcSet="https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360"
                            alt="Game picture"
                        />
                        <img
                            // src={img}
                            src="https://cdn1.epicgames.com/offer/236c74b4cd2e4e3099cbe2ebdc9686fd/EGS_DeadIsland2_DeepSilverDambusterStudios_S2_1200x1600-efc5201842cf642eb45f73227cd0789b?h=480&quality=medium&resize=1&w=360"
                            alt="Game picture"
                        />
                    </picture>
                </div>
            </div>
			<div className={classes.info}>
				<div>Dead Island 2</div>
				<div>$ 89</div>
			</div>
		</li>
	);
};

export default BrowsePageCard;
