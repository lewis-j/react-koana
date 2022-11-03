import React from "react";
import "./aboutPage.css";
import { AboutVideo } from "./AboutVideo";
import { aboutPageText } from "../../assets/text/aboutPageText";
import { styles, stylesLocation } from "../FeaturePage/styles";
import { MapsOL } from "../../components/MapsOL";
import logoIcon from "../../assets/images/icons/koana_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faPhone } from "@fortawesome/free-solid-svg-icons";

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
                        <div className={stylesLocation.container}>
                            <div className={stylesLocation.mapContainer}>
                                <MapsOL className={stylesLocation.map} />
                            </div>
                            <div className={stylesLocation.contentContainer}>
                                <div className={stylesLocation.content}>
                                    <h3 className={stylesLocation.title}>
                                        Driving to Koana
                                    </h3>
                                    <h1 className={stylesLocation.jumboTitle}>
                                        Mountain View Village
                                    </h1>
                                    <p className={stylesLocation.message}>
                                        We are located at the heart of old
                                        Mountain View Village, about 20 mins
                                        outside of Hilo, and 20 mins away from
                                        the national park. Come by for a coffee
                                        break.
                                    </p>
                                    <div
                                        className={stylesLocation.address}
                                        onClick={() => {
                                            window.open(
                                                "https://www.google.com/maps/dir//Koana,+18-1325+Old+Volcano+Rd,+Mountain+View,+HI+96771/@19.551059,-155.1118996,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x7953cdbce39b4f45:0xe9a9b13d06b4489d!2m2!1d-155.1075018!2d19.5510317",
                                                "_blank"
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faMap}
                                            className={stylesLocation.circleBtn}
                                        />
                                        <p>
                                            18-1325 Old Volcano Rd Mountain
                                            View, HI 96771
                                        </p>
                                    </div>
                                    <div className={stylesLocation.phoneNumber}>
                                        <a href="tel:8082094432">
                                            <FontAwesomeIcon
                                                icon={faPhone}
                                                className={
                                                    stylesLocation.circleBtn
                                                }
                                            />
                                            <div
                                                className={
                                                    styles.numberContainer
                                                }
                                            >
                                                <p>808-209-4432</p>
                                            </div>
                                        </a>
                                    </div>
                                    <button className={stylesLocation.submit}>
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
