import { Carousel } from "../../Components";
import styles from "./StorePage.module.scss";

const products = [
  "coffee",
  "teas",
  "art",
  "gift bags",
  "mugs",
  "coffee",
  "teas",
  "art",
  "gift bags",
  "mugs",
];

const renderProducts = () =>
  products.map((product, i) => (
    <div key={`productId#${i}`}>
      <div>{product}</div>
    </div>
  ));

const FeaturePage = () => {
  const carouselProps = {
    slidesToShow: 2,
    slidesToMove: 2,
    className: styles.carousel,
  };
  return (
    <div>
      <Carousel {...carouselProps}>{renderProducts()}</Carousel>
    </div>
  );
};

export default FeaturePage;
