import React, { useEffect, useState } from "react";
import styles from "./Carousel.module.scss";
const _style = (...styles) => styles.join(" ");

const Carousel = ({
  children: items = ["1", "2"],
  className: wrapper = {},
  prevBtnStyles,
  nextBtnStyles,
}) => {
  const [slides, setSlides] = useState([items[0], [1]]);
  const [current, setCurrent] = useState(0);
  const [stage, setStage] = useState("IDLE");

  useEffect(() => {
    if (stage === "NEXT_STAGE") {
      setStage("NEXT");
      setCurrent((current) => current + 1);
    }
    if (stage === "PREV_STAGE") {
      setStage("PREV");
      setCurrent((current) => current - 1);
    }
  }, [stage]);

  const slideNext = () => {
    if (current < items.length - 1) {
      setSlides(() => [items[current], items[current + 1]]);
      setStage("NEXT_STAGE");
    }
  };
  const slidePrev = () => {
    if (current !== 0) {
      setSlides(() => [items[current - 1], items[current]]);
      setStage("PREV_STAGE");
    }
  };

  const sliderStyle = (stage) => {
    const _styles = _style(
      {
        NEXT: styles.next,
        PREV_STAGE: styles.prevStage,
        PREV: styles.prev,
      }[stage],
      styles.slider
    );
    return _styles;
  };

  return (
    <div className={wrapper}>
      <div className={styles.container}>
        <div className={sliderStyle(stage)}>
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
