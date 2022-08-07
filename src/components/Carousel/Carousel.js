import React, { useState } from "react";
import { useTransitionStyle } from "./CarouselHooks";
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
    console.log(items[0]);
    const initialSlideContent = items.slice(0, totalSlides);
    const [slides, setSlides] = useState(initialSlideContent);
    const [currentX, setCurrentX] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [stage, setStage] = useState("IDLE");
    const sliderWidth = `${((totalSlides / slidesToShow) * 100).toFixed(0)}%`;
    const transformX = `${((slidesToMove / totalSlides) * 100).toFixed(0)}%`;

  const initialSlideContent = items[0].slice(0, totalSlides);
  console.log("initialSlideContent:", initialSlideContent);

  const [slides, setSlides] = useState(initialSlideContent);
  const [current, setCurrent] = useState({ x: 0, y: 0 });
  const [rowPosition, setRowPosition] = useState(
    [...Array(items.length).keys()].map(() => 0)
  );
  const [transition, setTransition] = useState({});

  const setNextCurrent = (current, action) => {
    return {
      next: { ...current, x: current.x + slidesToMove },
      prev: { ...current, x: current.x - slidesToMove },
      down: {
        x: rowPosition[current.y + slidesToMove],
        y: current.y + slidesToMove,
      },
      up: {
        x: rowPosition[current.y - slidesToMove],
        y: current.y - slidesToMove,
      },
    };
  };

  const runTransition = ([stageTransition, transition]) => {
    setTransition(stageTransition);
    setTimeout(() => {
      setTransition(transition);
    }, 1);
  };

  const sliderWidth = `${((totalSlides / slidesToShow) * 100).toFixed(0)}%`;
  const transformX = `${((slidesToMove / totalSlides) * 100).toFixed(0)}%`;

  const transitions = useTransitionStyle(transformX);

  const slideNext = () => {
    if (current.x < items[current.y].length - slidesToShow) {
      setSlides(() =>
        [...Array(totalSlides).keys()].map(
          (i) => items[current.y][current.x + i]
        )
      );
      setCurrent((current) => ({ ...current, x: current.x + slidesToMove }));
      const [end] = transitions.next;
      runTransition([{}, end]);
    }
  };
  const slidePrev = () => {
    if (current.x !== 0) {
      setSlides(() =>
        [...Array(totalSlides).keys()].map(
          (i) => items[current.y][current.x + i - slidesToMove]
        )
      );
      setCurrent((current) => ({ ...current, x: current.x - slidesToMove }));
      runTransition(transitions.prev);
    }
  };
  const slideDown = () => {
    setSlides(() =>
      [...Array(totalSlides).keys()].map(
        (i) => items[current.y + i][rowPosition[current.y + i]]
      )
    );
    setRowPosition((rp) => {
      console.log({ rp: rp, "current.x": current.x });

      rp[current.y] = current.x;
      console.log("rp:", rp);

      return rp;
    });
    setCurrent((current) => ({
      x: rowPosition[current.y + slidesToMove],
      y: current.y + slidesToMove,
    }));
    runTransition(transitions.down);
  };
  const slideUp = () => {
    setSlides(() =>
      [...Array(totalSlides).keys()].map(
        (i) =>
          items[current.y + i - slidesToMove][
            rowPosition[current.y + i - slidesToMove]
          ]
      )
    );
    setRowPosition((rp) => {
      console.log({ rp: rp, "current.x": current.x });
      rp[current.y] = current.x;
      return rp;
    });
    setCurrent((current) => ({
      x: rowPosition[current.y - slidesToMove],
      y: current.y - slidesToMove,
    }));
    runTransition(transitions.up);
  };

  return (
    <div className={wrapper}>
      <div className={styles.container}>
        <div
          className={styles.slider}
          style={{
            ...transition,
            width: sliderWidth,
          }}
        >
          {slides.map((slide, i) => (
            <div key={`#slide${i}`} className={styles.slides}>
              {slide}
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
