import styles from "./FeaturePage.module.scss";
import { Carousel } from "../../components/Carousel";
import { imagesData } from "../../data/imagesData";
import { useEffect, useRef, useState } from "react";
import { MapsOL } from "../../components/MapsOL";

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

//test values

const featuredItems = imagesData
  .slice(0, 6)
  .map((data) => ({ url: data.image.url, name: data.name, price: data.price }));

const renderProducts = () =>
  [...Array(4).keys()].map((j) => {
    return imagesData.map(({ image, name }, i) => (
      <div key={`productId#${i}${j}`} className={styles.imgContainer}>
        <img src={image.url} alt={name} className={styles.img} />
      </div>
    ));
  });

const FeaturePage = () => {
  const containerRef = useRef();
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      console.log("setting up observer");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            console.log("entry", entry);
            const { isIntersecting, target, intersectionRatio } = entry;

            console.log({
              isIntersecting,
              target,
              intersectionRatio,
            });
            if (isIntersecting) {
              observer.unobserve(entry.target);
              setIsGalleryVisible(true);
            }
          });
        },
        {
          threshold: 0.5,
        }
      );

      observer.observe(container);

      return () => observer.disconnect();
    }
  }, []);

  const renderGallery = () => {
    let _arr = [];
    for (let i = 0; i < featuredItems.length; i += 3) {
      _arr.push(featuredItems.slice(i, i + 3));
    }

    if (_arr.length === 0) return null;

    const _style = isGalleryVisible
      ? { transform: "translateX(0%)", opacity: "1" }
      : null;

    const result = _arr.map((item) => {
      return (
        <div className={styles.featuredSet}>
          {item.map((item, i) => {
            return (
              <div
                className={styles.gallery}
                data-title={item.name.toUpperCase()}
                style={_style}
              >
                <div className={styles.featured_img}>
                  <img src={item.url} alt="galleryImg" />
                </div>
                <div className={styles.itemDesc}>
                  <div className={styles.itemDesc_content}>
                    <h3 className={styles.itemDesc_name}>
                      {item.name.toUpperCase()}
                    </h3>
                    <h4
                      className={styles.itemDesc_price}
                    >{`$${item.price.toFixed(2)}`}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
    return result;
  };

  const carouselProps = {
    slidesToShow: 1,
    slidesToMove: 1,
    className: styles.carousel,
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.heroWrapper}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Best Coffee Shop in the State of Hawaii 2022 by FOOD & WINE
              </h1>
              <h3 className={styles.heroSubtitle}>
                Hawaii Speciality Coffee and Chocolate
              </h3>
              <button>Shop Now</button>
            </div>
          </div>
        </div>
        <div className={styles.featuredWrapper}>
          <div className={styles.header}>
            <h2 className={styles.heading}>Highly Recommended</h2>
            <h3 className={styles.subHeading}>
              Explore our wide selection today
            </h3>
          </div>
          <div className={styles.featuredContainer} ref={containerRef}>
            {renderGallery()}
          </div>
        </div>
        <div className={styles.carouselContainer}>
          <Carousel {...carouselProps}>{renderProducts()}</Carousel>
        </div>
        <div className={styles.location}>
          <div className={styles.locationContent}></div>
          <MapsOL className={styles.map} />
        </div>
      </div>
    </>
  );
};

export default FeaturePage;
