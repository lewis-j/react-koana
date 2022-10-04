import { styles, stylesCarousel, stylesLocation, stylesHero } from "./styles";
import { Carousel } from "../../components/Carousel";
import imagesData from "../../data/itemDefaults";
import { useEffect, useRef, useState } from "react";
import { MapsOL } from "../../components/MapsOL";
import logoIcon from "../../assets/images/icons/koana_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

const featuredItems = imagesData
  .slice(0, 6)
  .map((data) => ({ url: data.image, name: data.name, price: data.price }));

const renderProducts = () =>
  [...Array(4).keys()].map((j) => {
    return imagesData.map(({ image, name, id }, i) => {
      return (
        <div
          key={`${id}`}
          className={stylesCarousel.imgContainer}
          productid={id}
        >
          <img src={image} alt={name} className={stylesCarousel.img} />
        </div>
      );
    });
  });

const FeaturePage = () => {
  const galleryRef = useRef();
  const carouselRef = useRef();
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [carouselAnimEnd, setCarouselAnimEnd] = useState(0);
  const animationNames = { GALLERY: "GALLERY", CAROUSEL: "CAROUESEL" };
  useEffect(() => {
    const gallery = galleryRef.current;
    const carousel = carouselRef.current;

    if (gallery && carousel) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const { isIntersecting, target, intersectionRatio } = entry;
            if (isIntersecting) {
              observer.unobserve(entry.target);
              if (target.dataset.anim === animationNames.GALLERY) {
                setIsGalleryVisible(true);
              }
              if (target.dataset.anim === animationNames.CAROUSEL) {
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
  const addStyleClass =
    (current) =>
    (style = "") =>
      `${current} ${style}`;
  const containerStyle = addStyleClass(stylesCarousel.container);
  const logoOverlayStyle = addStyleClass(stylesCarousel.logoOverlay);

  const getAnimStyles = () => {
    const { container, logoOverlay, carousel } = stylesCarousel;
    const style = { container, logoOverlay, carousel };
    if (isCarouselVisible) {
      style.container = `${container} ${stylesCarousel.rise}`;
    }
    if (carouselAnimEnd > 0) {
      return {
        ...style,
        carousel: `${carousel} ${stylesCarousel.fadeIn}`,
        logoOverlay: `${logoOverlay} ${stylesCarousel.fadeOut}`,
      };
    }
    return style;
  };

  const animStyles = getAnimStyles();

  // const animContiainerStyle = isCarouselVisible
  //   ? containerStyle(stylesCarousel.rise)
  //   : containerStyle();

  // const animLogoOverlayStyle = carouselAnimEnd
  //   ? logoOverlayStyle(stylesCarousel.fadeOut)
  //   : logoOverlayStyle();
  const carouselProps = {
    slidesToShow: 1,
    slidesToMove: 1,
    className: animStyles.carousel,
    navDelay: 200,
    showNav: (func) => {
      if (carouselAnimEnd > 1) func();
    },
  };
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        {/* <div className={stylesHero.container}>
          <div className={stylesHero.overlay}>
            <div className={stylesHero.contentWrapper}>
              <div className={stylesHero.content}>
                <h1 className={stylesHero.title}>
                  Best Coffee Shop in the State of Hawaii 2022 by FOOD & WINE
                </h1>
                <h3 className={stylesHero.subtitle}>
                  Hawaii Speciality Coffee and Chocolate
                </h3>
                <div className={styles.btnWrapper}>
                  <button
                    className={stylesHero.btn}
                    onClick={() => navigate("/shop")}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className={stylesHero.viewport}>
          <div className={stylesHero.outerContainer}>
            <div
              className={stylesHero.hoop}
              // id="feature-hoop"
              onClick={() => navigate(`/shop`)}
            >
              <div
                className={stylesHero.koana}
              >{`K\xa0\xa0\xa0\xa0a\xa0n\xa0a`}</div>
              {
                <div className={stylesHero.ohBox}>
                  <div className={stylesHero.koanaOh}></div>
                </div>
              }
              <div className={stylesHero.desc}>
                Hawaii Speciality Coffee & Chocolate
              </div>
            </div>
            <div className={stylesHero.best}>
              Best Coffee Shop in the State of Hawaii 2022 by FOOD & WINE
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
            className={animStyles.container}
            ref={carouselRef}
            data-anim={animationNames.CAROUSEL}
            onAnimationEnd={() => {
              setCarouselAnimEnd((stage) => stage + 1);
            }}
          >
            <div
              className={animStyles.logoOverlay}
              onAnimationEnd={() => {
                setCarouselAnimEnd((stage) => stage + 1);
              }}
            >
              <img src={logoIcon} alt={"Koana Brand Icon"} />
            </div>
            <Carousel
              clickHandler={(item) => {
                console.log("item and current", item);
              }}
              {...carouselProps}
            >
              {renderProducts()}
            </Carousel>
          </div>
        </div>
        <div className={stylesLocation.container}>
          <div className={stylesLocation.mapContainer}>
            <MapsOL className={stylesLocation.map} />
          </div>
          <div className={stylesLocation.contentContainer}>
            <div className={stylesLocation.content}>
              <h3 className={stylesLocation.title}>Driving to Koana</h3>
              <h1 className={stylesLocation.jumboTitle}>
                Mountain View Village
              </h1>
              <p className={stylesLocation.message}>
                We are located at the heart of old Mountain View Village, about
                20 mins outside of Hilo, and 20 mins away from the national
                park. Come by for a coffee break.
              </p>
              <div
                className={stylesLocation.address}
                onClick={() => {
                  window.open(
                    "https://www.google.com/maps/dir//Koana,+18-1325+Old+Volcano+Rd,+Mountain+View,+HI+96771/@19.551059,-155.1118996,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x7953cdbce39b4f45:0xe9a9b13d06b4489d!2m2!1d-155.1075018!2d19.5510317",
                    "_blank"
                  );
                }}
              >
                <FontAwesomeIcon
                  icon={faMap}
                  className={stylesLocation.circleBtn}
                />
                <p>18-1325 Old Volcano Rd Mountain View, HI 96771</p>
              </div>
              <div className={stylesLocation.phoneNumber}>
                <a href="tel:8082094432">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className={stylesLocation.circleBtn}
                  />
                  <div className={styles.numberContainer}>
                    <p>808-209-4432</p>
                  </div>
                </a>
              </div>
              <button className={stylesLocation.submit}>Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturePage;
