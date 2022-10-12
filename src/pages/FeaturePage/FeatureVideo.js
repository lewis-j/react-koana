import { Cloudinary } from "@cloudinary/url-gen";
import { stylesFeatureVideo } from "./styles";

export const FeatureVideo = () => {
    // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
        cloud: {
            cloudName: "thejourneyville",
        },
    });

    // creating an accessable instance of the video
    const koanaIntroVid = cld.video("koana/koana_intro_vid1");
    // adding an 'auto-quality' filter to adjust dependent on network performance
    koanaIntroVid.quality("auto");

    // creating a URL from the instance
    const koanaIntroVidURL = koanaIntroVid.toURL();

    // adding to JSX surrounded with the styling CSS class 'introVidContainer'
    return (
        <div className={stylesFeatureVideo.introVidContainer}>
            <video src={koanaIntroVidURL} controls autoPlay loop muted />
        </div>
    );
};
