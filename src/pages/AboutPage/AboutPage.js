import React from "react";
import "./aboutPage.css";
import { AboutVideo } from "./AboutVideo";
import { aboutPageText } from "../../assets/text/aboutPageText";

const AboutPage = () => {
    return (
        <>
            <div className="aboutBackground">
                <div className="videoTextContainer">
                    {/* Cloudinary component for About page video */}
                    <AboutVideo />
                    <div className="textContent">
                        <div>
                            <h2 className="header">Our Aloha Story</h2>
                            <h4 className="header">
                                Aloha from Brian and Jan,
                            </h4>
                            <p>{aboutPageText}</p>
                            <h4>Aloha A Hui Hou~ Sincerely,</h4>
                            <h4>Brian and Jan</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
