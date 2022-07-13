import React, { useEffect, useState } from "react";
import styles from "./Carousel.module.scss";
const _style = (...styles) => styles.join(" ");

const Carousel = ({
  children: items = ["1", "2"],
  className: wrapper = {},
  slidesToShow = 1,
  slidesToMove = 1,
  prevBtnStyles,
  nextBtnStyles,
}) => {
  const totalSlides = slidesToShow + slidesToMove;
  const initialSlideContent = items.slice(0, totalSlides);
  const [slides, setSlides] = useState(initialSlideContent);
  const [current, setCurrent] = useState(0);
  const [stage, setStage] = useState("IDLE");
  const sliderWidth = `${((totalSlides / slidesToShow) * 100).toFixed(0)}%`;
  const transformX = `${((slidesToMove / totalSlides) * 100).toFixed(0)}%`;

  useEffect(() => {
    if (stage === "NEXT_STAGE") {
      setStage("NEXT");
      setCurrent((current) => current + slidesToMove);
    }
    if (stage === "PREV_STAGE") {
      setStage("PREV");
      setCurrent((current) => current - slidesToMove);
    }
  }, [stage]);

  const slideNext = () => {
    if (current < items.length - slidesToShow) {
      setSlides(() =>
        [...Array(totalSlides).keys()].map((i) => items[current + i])
      );
      setStage("NEXT_STAGE");
    }
  };
  const slidePrev = () => {
    if (current !== 0) {
      setSlides(() =>
        [...Array(totalSlides).keys()].map(
          (i) => items[current + i - slidesToMove]
        )
      );
      setStage("PREV_STAGE");
    }
  };

  const sliderStyle = (_stage) => {
    return {
      NEXT: { transform: `translateX(-${transformX})`, transition: "0.5s" },
      PREV_STAGE: { transform: `translateX(-${transformX})` },
      PREV: { transition: "0.5s" },
    }[_stage];
  };

  console.log("slider style", sliderStyle(stage));

  return (
    <div className={wrapper}>
      <div className={styles.container}>
        <div
          className={styles.slider}
          style={{
            ...sliderStyle(stage),
            width: sliderWidth,
          }}
        >
          {slides.map((slide, i) => (
            <div key={`#slide${i}`} className={styles.slides}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => slidePrev()}
        className={_style(styles.btn, styles.btnPrev)}
      >
        Prev
      </button>
      <button onClick={() => slideNext(_style(styles.btn, styles.btnNext))}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
