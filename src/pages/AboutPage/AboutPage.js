import React from "react";
import "./aboutPage.css";
import koanaVid from "../../assets/videos/koana_insta_mp4.mp4";
import { aboutPageText } from "../../assets/text/aboutPageText";

const AboutPage = () => {
    const video = () => {
        return (
            <>
                <div className="videoTextContainer">
                    <div className="videoContainer">
                        <video src={koanaVid} autoPlay loop muted />
                    </div>
                    <div className="textContent">
                        <div>
                            <h2 className="header">Our Aloha Story</h2>
                            <h4 className="header">Aloha from Brian and Jan,</h4>
                            <p>{aboutPageText}</p>
                            <h4>Aloha A Hui Hou~ Sincerely,</h4>
                            <h4>Brian and Jan</h4>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return <div>{video()}</div>;
};

export default AboutPage;
