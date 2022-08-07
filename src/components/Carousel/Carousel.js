import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import useStyleStage from "./animStages";
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

  const initialSlideContent = items[0].slice(0, totalSlides);
  const [slides, setSlides] = useState(initialSlideContent);
  const [current, setCurrent] = useState({ x: 0, y: 0 });
  const [rowPosition, setRowPosition] = useState(
    [...Array(items.length).keys()].map(() => 0)
  );
  console.log("rowPosition22", rowPosition);

  const sliderWidth = `${((totalSlides / slidesToShow) * 100).toFixed(0)}%`;
  const transformX = `${((slidesToMove / totalSlides) * 100).toFixed(0)}%`;

  const stages = useStyleStage(transformX);
  const [stage, setStage] = useState(stages.NEXT);

  const slideNext = () => {
    if (current.x < items[current.y].length - slidesToShow) {
      setSlides(() =>
        [...Array(totalSlides).keys()].map(
          (i) => items[current.y][current.x + i]
        )
      );
      setStage(stages.NEXT_STAGE);
      setTimeout(() => {
        setStage(stages.NEXT);
        setCurrent((current) => ({ ...current, x: current.x + slidesToMove }));
      }, 1);
    }
  };
  const slidePrev = () => {
    if (current.x !== 0) {
      setSlides(() =>
        [...Array(totalSlides).keys()].map(
          (i) => items[current.y][current.x + i - slidesToMove]
        )
      );
      setStage(stages.PREV_STAGE);
      setTimeout(() => {
        setStage(stages.PREV);
        setCurrent((current) => ({ ...current, x: current.x - slidesToMove }));
      }, 1);
    }
  };
  const slideDown = () => {
    setSlides(() =>
      [...Array(totalSlides).keys()].map((i) => items[current.y + i][current.x])
    );
    setStage(stages.DOWN_STAGE);
    setTimeout(() => {
      setStage(stages.DOWN);
      setCurrent((current) => ({ ...current, y: current.y + slidesToMove }));
    }, 1);
  };
  const slideUp = () => {
    setSlides(() =>
      [...Array(totalSlides).keys()].map(
        (i) => items[current.y + i - slidesToMove][current.x]
      )
    );
    setStage(stages.UP_STAGE);
    setTimeout(() => {
      setStage(stages.UP);
      setCurrent((current) => ({ ...current, y: current.y - slidesToMove }));
    }, 1);
  };

  return (
    <div className={wrapper}>
      <div className={styles.container}>
        <div
          className={styles.slider}
          style={{
            ...stage,
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
      <button onClick={() => slideDown()}>Down</button>
      <button onClick={() => slideUp()}>Up</button>
    </div>
  );
};

export default Carousel;
