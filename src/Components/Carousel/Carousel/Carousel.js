//testing comment for push
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleUp,
  faAngleRight,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useTransitionStyle, useSetCurrent, actions } from "./CarouselHooks";
import styles from "./Carousel.module.scss";
import VeritcalNav from "../VerticalNav/VerticalNav";
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
  const [timeOutId, setTimeoutId] = useState(null);
  // const [interpolatedNav, setInterpolatedNav] = useState([1, 0, 0]);
  const [activeNav, setActiveNav] = useState("");
  const [current, setCurrent, rowPosition] = useSetCurrent(
    items.length,
    slidesToMove
  );

  const [transition, setTransition] = useState({});

  const pauseSlides = () => {};

  const runTransition = ([stageTransition, transition]) => {
    setTransition(stageTransition);
    window.requestAnimationFrame(() => {
      setTransition(transition);
    });
  };

  useEffect(() => {
    const _intervalId = setInterval(() => {
      slideNext(current);
    }, 10000);

    return () => {
      clearInterval(_intervalId);
    };
  }, [current]);

  const sliderWidth = `${((totalSlides / slidesToShow) * 100).toFixed(0)}%`;
  const transformX = `${((slidesToMove / totalSlides) * 100).toFixed(0)}%`;
  const transitions = useTransitionStyle(transformX, sliderWidth);

  const revealNav = () => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    const newTimeOutId = setTimeout(() => {
      setTimeoutId(null);
    }, 2000);
    setTimeoutId(newTimeOutId);
  };

  const verticalNavDown = (_current) => {
    revealNav();
    setActiveNav(_current.y + 1);
  };

  const verticalNavUp = (_current) => {
    revealNav();
    setActiveNav(current.y - 1);
  };

  const slideNext = (_current) => {
    if (_current.x >= items[_current.y].length - slidesToShow) {
      if (_current.y === items.length - slidesToShow) {
        setSlides(() => {
          let count = 0;
          const result = [...Array(totalSlides).keys()].map((i) => {
            if (i < slidesToShow) {
              count++;
              return items[_current.y][_current.x + i];
            }
            return items[0][i - count];
          });

          return result;
        });
        setCurrent(_current, actions.RESTART);
        runTransition(transitions.down);
        return;
      }
      setSlides(() => {
        let count = 0;
        const result = [...Array(totalSlides).keys()].map((i) => {
          if (i < slidesToShow) {
            count++;
            return items[_current.y][_current.x + i];
          }
          return items[_current.y + 1][i - count];
        });
        console.log("result:", result);

        return result;
      });
      setCurrent(_current, actions.END);
      verticalNavDown(_current);
      runTransition(transitions.down);
      return;
    }
    setSlides(() =>
      [...Array(totalSlides).keys()].map(
        (i) => items[_current.y][_current.x + i]
      )
    );
    setCurrent(_current, actions.NEXT);
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

    verticalNavDown(current);
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
    verticalNavUp(current);
    runTransition(transitions.up);
  };

  const setCurrentRow = (index) => {
    const coord = { x: 0, y: index };
  };

  return (
    <div className={wrapper}>
      <div className={styles.container}>
        <VeritcalNav
          activeNav={activeNav}
          isVisible={!!timeOutId}
          sendIndex={setCurrentRow}
        />
        <div className={styles.glow}></div>
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

        <div className={styles.wrapper}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            onClick={() => slidePrev()}
            className={_style(styles.btn, styles.btnPrev)}
          />

          <FontAwesomeIcon
            icon={faAngleRight}
            onClick={() => slideNext(current)}
            className={_style(styles.btn, styles.btnNext)}
          />

          <FontAwesomeIcon
            icon={faAngleDown}
            onClick={() => {
              slideDown();
              pauseSlides();
            }}
            className={_style(styles.btn, styles.btnDown)}
          />
          <FontAwesomeIcon
            icon={faAngleUp}
            onClick={() => slideUp()}
            className={_style(styles.btn, styles.btnUp)}
          />
        </div>
      </div>
    </div>
  );
};
export default Carousel;
