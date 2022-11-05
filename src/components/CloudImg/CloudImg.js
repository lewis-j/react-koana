import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary, Transformation } from "@cloudinary/url-gen";
import { noise } from "@cloudinary/url-gen/actions/effect";
import { source } from "@cloudinary/url-gen/actions/overlay";
import styles from "./CloudImg.module.scss";

const CloudImg = () => {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dazkdscju",
    },
  });

  const myImage = cld.video("Koana/koana_insta_mp4_j8czec");

  myImage.effect(noise(60));
  return (
    <div className={styles.container}>
      <AdvancedVideo cldVid={myImage} autoPlay />
    </div>
  );
};
export default CloudImg;
