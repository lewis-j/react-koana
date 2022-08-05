import Carousel from "../../components/Carousel/Carousel";
import MultiCarousel from "../../components/MultiCarousel/MultiCarousel";
import styles from "./StorePage.module.scss";

const allProducts = [
  "BICR Ka'u Morning Glory",
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

const testData = allProducts.reduce(
  (pre, cur) => {
    return [
      [...pre[0], `Category 1: ${cur}`],
      [...pre[1], `Category 2: ${cur}`],
      [...pre[2], `Category 3: ${cur}`],
    ];
  },
  [[], [], []]
);
console.log("testData", testData);

const renderProducts = () =>
  testData.map((category) =>
    category.map((product, j) => (
      <div key={`productId#${j}`}>
        <div>{product}</div>
      </div>
    ))
  );

console.log("renderProducts()", renderProducts());

const StorePage = () => {
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

export default StorePage;
