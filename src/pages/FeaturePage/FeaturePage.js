import styles from "./FeaturePage.module.scss";
import Carousel from "../../components/Carousel/Carousel";
import { imagesData } from "../../data/imagesData";
import { useEffect, useState } from "react";
import { default as KoanaMtns } from "../../assets/images/icons/koana_mtns.svg";

// const products = [
//   "coffee",
//   "teas",
//   "art",
//   "gift bags",
//   "mugs",
//   "coffee",
//   "teas",
//   "art",
//   "gift bags",
//   "mugs",
// ];

const renderProducts = () =>
  [...Array(3).keys()].map((j) => {
    return imagesData.map(({ image, name }, i) => (
      <div key={`productId#${i}${j}`} className={styles.imgContainer}>
        <img src={image} alt={name} className={styles.img} />
      </div>
    ));
  });

const FeaturePage = () => {
  const [animDone, setAnimDone] = useState(false);
  const [animStart, setAnimStart] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAnimStart(true);
    }, 3000);

    return () => clearTimeout(timeOut);
  }, []);

  const carouselProps = {
    slidesToShow: 1,
    slidesToMove: 1,
    className: styles.carousel,
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          {animStart && (
            <Carousel {...carouselProps}>{renderProducts()}</Carousel>
          )}
          {!animDone && (
            <div
              className={styles.mtnIcon}
              onAnimationEnd={() => {
                console.log("animation is done");
                setAnimDone(true);
              }}
            >
              <img src={KoanaMtns} alt="Koana Mountains" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FeaturePage;
