import styles from "./FeaturePage.module.scss";
import Carousel from "../../components/Carousel/Carousel";
import { imagesData } from "../../assets/images/imagesData";
import { useEffect } from "react";

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
  useEffect(() => {
    const handle = (event) => {
      console.log("scroll event:", event);
    };
    window.addEventListener("scroll", handle);

    return () => {
      window.removeEventListener("scroll", handle);
    };
  }, []);

  const carouselProps = {
    slidesToShow: 1,
    slidesToMove: 1,
    className: styles.carousel,
  };
  return (
    <>
      <div className={styles.container}>
        <Carousel {...carouselProps}>{renderProducts()}</Carousel>
      </div>
      <div className={styles.section}></div>
    </>
  );
};

export default FeaturePage;
