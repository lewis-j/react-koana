//testing comment for push
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleUp,
  faAngleRight,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useTransitionStyle, useSetCurrent, actions } from "./CarouselHooks";
import styles from "./Carousel.module.scss";
const _style = (...styles) => styles.join(" ");
const Carousel = ({
  children: items = ["1", "2"],
  className: wrapper = {},
  slidesToShow = 1,
  slidesToMove = 1,
}) => {
  const totalSlides = slidesToShow + slidesToMove;
  const initialSlideContent = items[0].slice(0, totalSlides);
  const [slides, setSlides] = useState(initialSlideContent);
  const [current, setCurrent, rowPosition] = useSetCurrent(
    items.length,
    slidesToMove
  );

  const [transition, setTransition] = useState({});

  const runTransition = ([stageTransition, transition]) => {
    setTransition(stageTransition);
    setTimeout(() => {
      setTransition(transition);
    }, 1);
  };

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     slideNext();
  //   }, 2000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // });
  const sliderWidth = `${((totalSlides / slidesToShow) * 100).toFixed(0)}%`;
  const transformX = `${((slidesToMove / totalSlides) * 100).toFixed(0)}%`;
  const transitions = useTransitionStyle(transformX, sliderWidth);
  const slideNext = () => {
    if (current.x >= items[current.y].length - slidesToShow) {
      if (current.y === items.length - slidesToShow) {
        setSlides(() => [...Array(totalSlides).keys()].map((i) => items[0][i]));
        setCurrent(current, actions.RESTART);
        runTransition(transitions.down);
        return;
      }
      setSlides(() =>
        [...Array(totalSlides).keys()].map((i) => {
          if (i < slidesToShow) {
            console.log("items1::", items[current.y][current.x + i]);
            return items[current.y][current.x + i];
          }
          console.log("items2::", items[current.y + 1][i]);
          return items[current.y + 1][0];
        })
      );
      setCurrent(current, actions.END);
      runTransition(transitions.down);
      return;
    }
    setSlides(() =>
      [...Array(totalSlides).keys()].map((i) => items[current.y][current.x + i])
    );
    setCurrent(current, actions.NEXT);
    const [end] = transitions.next;
    runTransition([{}, end]);
  };
  const slidePrev = () => {
    if (current.x !== 0) {
      setSlides(() =>
        [...Array(totalSlides).keys()].map(
          (i) => items[current.y][current.x + i - slidesToMove]
        )
      );
      setCurrent(current, actions.PREV);
      runTransition(transitions.prev);
    }
  };
  const slideDown = () => {
    if (current.y === items.length - slidesToShow) return;

    setSlides(() =>
      [...Array(totalSlides).keys()].map(
        (i) => items[current.y + i][rowPosition[current.y + i]]
      )
    );
    setCurrent(current, actions.DOWN);
    runTransition(transitions.down);
  };
  const slideUp = () => {
    if (current.y === 0) return;
    setSlides(() =>
      [...Array(totalSlides).keys()].map(
        (i) =>
          items[current.y + i - slidesToMove][
            rowPosition[current.y + i - slidesToMove]
          ]
      )
    );
    setCurrent(current, actions.UP);
    runTransition(transitions.up);
  };
  return (
    <div className={wrapper}>
      <div className={styles.container}>
        <div
          className={styles.slider}
          style={{
            ...transition,
          }}
        >
          {slides.map((slide, i) => (
            <div key={`#slide${i}`} className={styles.slides}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.wrapper}>
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={() => slidePrev()}
          className={_style(styles.btn, styles.btnPrev)}
        />

        <FontAwesomeIcon
          icon={faAngleRight}
          onClick={() => slideNext()}
          className={_style(styles.btn, styles.btnNext)}
        />

        <FontAwesomeIcon
          icon={faAngleDown}
          onClick={() => slideDown()}
          className={_style(styles.btn, styles.btnDown)}
        />
        <FontAwesomeIcon
          icon={faAngleUp}
          onClick={() => slideUp()}
          className={_style(styles.btn, styles.btnUp)}
        />
      </div>
    </div>
  );
};
export default Carousel;
