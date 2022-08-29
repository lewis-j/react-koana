import styles from "./FeaturePage.module.scss";
import { Carousel } from "../../components/Carousel";
import { imagesData } from "../../data/imagesData";

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
  [...Array(4).keys()].map((j) => {
    return imagesData.map(({ image, name }, i) => (
      <div key={`productId#${i}${j}`} className={styles.imgContainer}>
        <img src={image} alt={name} className={styles.img} />
      </div>
    ));
  });

const FeaturePage = () => {
  const carouselProps = {
    slidesToShow: 1,
    slidesToMove: 1,
    className: styles.carousel,
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          <Carousel {...carouselProps}>{renderProducts()}</Carousel>
        </div>
      </div>
    </>
  );
};

export default FeaturePage;
