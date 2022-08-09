import styles from "./StorePage.module.scss";
import Carousel from "../../components/Carousel/Carousel";
import { imagesData } from "../../assets/images/imagesData";

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
  const carouselProps = {
    slidesToShow: 1,
    slidesToMove: 1,
    className: styles.carousel,
  };
  return (
    <div>
      <Carousel {...carouselProps}>{renderProducts()}</Carousel>
    </div>
  );
};

export default FeaturePage;
