import { Cloudinary } from "@cloudinary/url-gen";
import styles from "./CloudinaryVideo.module.scss";

export const CloudinaryVideo = ({ cloudName, instance }) => {
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  // creating an accessable instance of the video
  const introVid = cld.video(instance);
  // adding an 'auto-quality' filter to adjust dependent on network performance
  introVid.quality("auto");

  // creating a URL from the instance
  const introVidURL = introVid.toURL();

  // adding to JSX surrounded with the styling CSS class 'introVidContainer'
  // 'playsinline' should support background video in mobile platforms, please confirm
  return (
    <div className={styles.introVidContainer}>
      <video src={introVidURL} playsInline controls autoPlay loop muted />
    </div>
  );
};
