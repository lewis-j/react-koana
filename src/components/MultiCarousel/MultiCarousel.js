import React, { useEffect, useState } from "react";
import styles from "./MultiCarousel.module.scss";
const _style = (...styles) => styles.join(" ");

const MultiCarousel = ({
  children: items = [
    ["1", "2"],
    ["3", "4"],
    ["5", "6"],
  ],
  className: wrapper = {},
  slidesToShow = 3,
  slidesToMove = 1,
  prevBtnStyles,
  nextBtnStyles,
}) => {
  const totalSlides = slidesToShow + slidesToMove;

  const initialSlideContent = items[0].slice(0, totalSlides);
  const [slides, setSlides] = useState(initialSlideContent);

  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [stage, setStage] = useState("IDLE");
  const sliderWidth = `${((totalSlides / slidesToShow) * 100).toFixed(0)}%`;
  const transformX = `${((slidesToMove / totalSlides) * 100).toFixed(0)}%`;
  useEffect(() => {
    if (stage === "NEXT_STAGE") {
      setStage("NEXT");
      setCurrentX((currentX) => currentX + slidesToMove);
    }
    if (stage === "PREV_STAGE") {
      setStage("PREV");
      setCurrentX((currentX) => currentX - slidesToMove);
    }
  }, [stage, slidesToMove]);

  const slideNext = () => {
    if (currentX < items[currentY].length - slidesToShow) {
      setSlides(() =>
        [...Array(totalSlides).keys()].map((i) => items[currentY][currentX + i])
      );
      setStage("NEXT_STAGE");
    }
  };
  const slidePrev = () => {
    if (currentX !== 0) {
      setSlides(() =>
        [...Array(totalSlides).keys()].map(
          (i) => items[currentY][currentX + i - slidesToMove]
        )
      );
      setStage("PREV_STAGE");
    }
  };

  const slideDown = () => {
    console.log("testing");
  };
  const sliderTransition = (_stage) => {
    return {
      NEXT: { transform: `translateX(-${transformX})`, transition: "0.5s" },
      PREV_STAGE: { transform: `translateX(-${transformX})` },
      PREV: { transition: "0.5s" },
    }[_stage];
  };

  return (
    <div className={wrapper}>
      <div className={styles.container}>
        <div
          className={styles.slider}
          style={{
            ...sliderTransition(stage),
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
      <button
        onClick={() => slideNext()}
        className={_style(styles.btn, styles.btnNext)}
      >
        Next
      </button>
      <button onClick={() => slideDown()}>down</button>
    </div>
  );
};

export default MultiCarousel;
