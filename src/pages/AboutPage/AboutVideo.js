import { Cloudinary } from "@cloudinary/url-gen";
import "./aboutPage.css";

export const AboutVideo = () => {
    // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
        cloud: {
            cloudName: "thejourneyville",
        },
    });

    // creating an accessable instance of the video
    const koanaAboutVid = cld.video("koana/koana_about_vid1");
    // adding an 'auto-quality' filter to adjust dependent on network performance
    koanaAboutVid.quality("auto");

    // creating a URL from the instance
    const koanaAboutVidURL = koanaAboutVid.toURL();

    // adding to JSX surrounded with the styling CSS class 'introVidContainer'
    return (
        <div className="videoContainer">
            <video
                src={koanaAboutVidURL}
                controls
                playsInline
                autoPlay
                loop
                muted
            />
        </div>
    );
};