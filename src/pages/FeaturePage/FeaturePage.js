import styles from "./FeaturePage.module.scss";
import stylesCarousel from "./CarouselContainer.module.scss";
import { Carousel } from "../../components/Carousel";
import { imagesData } from "../../data/imagesData";
import { useEffect, useRef, useState } from "react";
import { MapsOL } from "../../components/MapsOL";

const featuredItems = imagesData
  .slice(0, 6)
  .map((data) => ({ url: data.image.url, name: data.name, price: data.price }));

const renderProducts = () =>
  [...Array(4).keys()].map((j) => {
    return imagesData.map(({ image, name }, i) => (
      <div key={`productId#${i}${j}`} className={stylesCarousel.imgContainer}>
        <img src={image.url} alt={name} className={stylesCarousel.img} />
      </div>
    ));
  });

const FeaturePage = () => {
  const galleryRef = useRef();
  const carouselRef = useRef();
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const animationNames = { GALLERY: "GALLERY", CAROUSEL: "CAROUESEL" };
  useEffect(() => {
    const gallery = galleryRef.current;
    const carousel = carouselRef.current;

    if (gallery && carousel) {
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
              console.log("target", target.dataset.anim);
              if (target.dataset.anim === animationNames.GALLERY) {
                setIsGalleryVisible(true);
              }
              if (target.dataset.anim === animationNames.CAROUSEL) {
                console.log("run carousel anim");
                setIsCarouselVisible(true);
              }
            }
          });
        },
        {
          threshold: 0.5,
        }
      );

      observer.observe(gallery);
      observer.observe(carousel);

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

    const result = _arr.map((item, j) => {
      return (
        <div className={styles.featuredSet} key={`${j}featureset`}>
          {item.map((item, i) => {
            return (
              <div
                key={`${j}${i}gallery`}
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
    className: stylesCarousel.carousel,
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
          <div
            className={styles.featuredContainer}
            ref={galleryRef}
            data-anim={animationNames.GALLERY}
          >
            {renderGallery()}
          </div>
        </div>
        <div className={stylesCarousel.wrapper}>
          <div
            className={stylesCarousel.container}
            ref={carouselRef}
            data-anim={animationNames.CAROUSEL}
          >
            {isCarouselVisible && (
              <Carousel {...carouselProps}>{renderProducts()}</Carousel>
            )}
          </div>
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
