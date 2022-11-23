import React from "react";
import "./styles/aboutPage.css";
import { aboutPageText } from "../../assets/text/aboutPageText";
import styles from "./styles/AboutPage.module.scss";
import { MapsOL } from "../../components/MapsOL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faPhone } from "@fortawesome/free-solid-svg-icons";
import { AboutVideo } from "./AboutVideo";
// import { CloudinaryVideo } from "../../components/CloudinaryVideo/CloudinaryVideo";

const AboutPage = () => {
  const IndentText = () => {
    const makeTextArray = aboutPageText.replaceAll("\n", "").split(".  ");
    const formattedText = makeTextArray.map((sentence, idx) => {
      return (
        <div key={idx} className={styles.lineHeight}>
          <p>{sentence.concat(".").concat(" ")}</p>
          <br />
        </div>
      );
    });
    return formattedText;
  };

  return (
    <>
      <div className={styles.aboutBackground}>
        <div className={styles.videoTextContainer}>
          {/* Cloudinary component for About page video */}
          {/* <AboutVideo /> */}
          <div className={styles.textContent}>
            <div>
              <AboutVideo />
              <h2 className={styles.header}>Our Aloha Story</h2>
              <h4 className={styles.header}>Aloha from Brian and Jan</h4>
              <br />
              <IndentText />
              <h4>Aloha A Hui Hou~ Sincerely,</h4>
              <h4>Brian and Jan</h4>
            </div>
            <div className={styles.container}>
              <div className={styles.mapContainer}>
                <MapsOL className={styles.map} />
              </div>
              <div className={styles.contentContainer}>
                <div className={styles.content}>
                  <h3 className={styles.title}>Driving to Koana</h3>
                  <h1 className={styles.jumboTitle}>Mountain View Village</h1>
                  <p className={styles.message}>
                    We are located at the heart of old Mountain View Village,
                    about 20 mins outside of Hilo, and 20 mins away from the
                    national park. Come by for a coffee break.
                  </p>
                  <div className={styles.detailsContainer}>
                    <div
                      className={styles.address}
                      onClick={() => {
                        window.open(
                          "https://www.google.com/maps/dir//Koana,+18-1325+Old+Volcano+Rd,+Mountain+View,+HI+96771/@19.551059,-155.1118996,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x7953cdbce39b4f45:0xe9a9b13d06b4489d!2m2!1d-155.1075018!2d19.5510317",
                          "_blank"
                        );
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faMap}
                        className={styles.circleBtn}
                      />
                      <p>18-1325 Old Volcano Rd Mountain View, HI 96771</p>
                    </div>
                    <div className={styles.phoneNumber}>
                      <a href="tel:8082094432">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className={styles.circleBtn}
                        />
                        <div className={styles.numberContainer}>
                          <p>808-209-4432</p>
                        </div>
                      </a>
                    </div>
                  </div>
                  {/* not sure if we need this button now */}
                  {/* <button className={stylesLocation.submit}>
                                        Learn More
                                    </button> */}
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
