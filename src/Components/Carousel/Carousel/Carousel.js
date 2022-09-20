//testing comment for push
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleUp,
  faAngleRight,
  faAngleDown,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useTransitionStyle, useSetCurrent, actions } from "./CarouselHooks";
import styles from "./Carousel.module.scss";
import VeritcalNav from "../VerticalNav/VerticalNav";
import { Button } from "../../Button";
import { click } from "@testing-library/user-event/dist/click";
const _style = (...styles) => styles.join(" ");

const Carousel = ({
  children: items = ["1", "2"],
  className: wrapper = {},
  slidesToShow = 1,
  slidesToMove = 1,
  showNav,
  clickHandler,
}) => {
  const totalSlides = slidesToShow + slidesToMove;
  const initialSlideContent = items[0].slice(0, totalSlides);
  const [slides, setSlides] = useState(initialSlideContent);
  const [intervalId, setIntervalId] = useState(null);
  const [timeOutId, setTimeoutId] = useState(null);

  const [activeNav, setActiveNav] = useState("");
  const [current, setCurrent, rowPosition] = useSetCurrent(
    items.length,
    slidesToMove
  );

  console.log("items in carousel", clickHandler);

  const [transition, setTransition] = useState({});

  const pauseSlides = () => {};

  const runTransition = ([stageTransition, transition]) => {
    setTransition(stageTransition);
    window.requestAnimationFrame(() => {
      setTransition(transition);
    });
  };
  useEffect(() => {
    showNav(() => {
      setActiveNav(0);
    });
  }, [showNav]);

  useEffect(() => {
    const _intervalId = setInterval(() => {
      // slideNext(current);
    }, 10000);
    setIntervalId(_intervalId);

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
        verticalNavDown({ y: -1 });
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
      verticalNavDown(current);
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

    console.log("Current", current);
    setSlides(() =>
      [...Array(totalSlides).keys()].map((i) => {
        if (i === 0) return items[current.y][current.x];
        return items[current.y + i][rowPosition[current.y + i]];
      })
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
      <VeritcalNav
        activeNav={activeNav}
        isVisible={!!timeOutId}
        sendIndex={setCurrentRow}
      />
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

        <div className={styles.wrapper}>
          <Button
            variant="light"
            className={styles.btnSubmit}
            onClick={() => {
              clickHandler(items[current.y][current.x].props.productId);
            }}
          >
            Add Item
          </Button>
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
            }}
            className={_style(styles.btn, styles.btnDown)}
          />
          <FontAwesomeIcon
            icon={faAngleUp}
            onClick={() => slideUp()}
            className={_style(styles.btn, styles.btnUp)}
          />
          {/* <FontAwesomeIcon
            icon={faPause}
            onClick={() => console.log("pausing")}
            className={_style(styles.btn, styles.btnPause)}
          /> */}
        </div>
      </div>
    </div>
  );
};
export default Carousel;
