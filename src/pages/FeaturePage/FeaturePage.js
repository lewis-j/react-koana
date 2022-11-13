import { styles, stylesHero } from "./styles";
import { useNavigate } from "react-router-dom";
import { CloudinaryVideo } from "../../components/CloudinaryVideo/CloudinaryVideo";

const FeaturePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={stylesHero.viewport}>
          <div className={stylesHero.outerContainer}>
            <div
              className={stylesHero.hoop}
              // id="feature-hoop"
              onClick={() => navigate(`/shop`)}
            >
              <div
                className={stylesHero.koana}
              >{`K\xa0\xa0\xa0\xa0a\xa0n\xa0a`}</div>
              {
                <>
                  <div className={stylesHero.ohBox}>
                    <div className={stylesHero.koanaOh}></div>
                  </div>
                  <div className={stylesHero.ohBox}>
                    <div className={stylesHero.koanaOhSolar}></div>
                  </div>
                </>
              }
              <div className={stylesHero.desc}>slow black coffee</div>
            </div>
            <div className={stylesHero.best}>
              Best Coffee Shop in the State of Hawaii 2022 by FOOD & WINE
            </div>
          </div>
        </div>
        {/* cloudinary component */}
        <CloudinaryVideo
          cloudName={"thejourneyville"}
          instance={"koana/koana_intro_vid1"}
        />
      </div>
    </>
  );
};

export default FeaturePage;
