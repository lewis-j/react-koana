import { useState } from "react";

export const useTransitionStyle = (_translate, sliderWidth) => {
  const verticalSlide = {
    width: "100%",
    height: sliderWidth,
    flexDirection: "column",
  };
  const horizontalSlide = { width: sliderWidth, height: "100%" };

  return (
    {
      next: [
        {
          ...horizontalSlide,
          transform: `translateX(-${_translate})`,
          transition: "0.5s",
        },
      ],
      prev: [
        { ...horizontalSlide, transform: `translateX(-${_translate})` },
        { ...horizontalSlide, transition: "0.5s" },
      ],
      down: [
        { ...verticalSlide },
        {
          ...verticalSlide,
          transition: "0.5s",
          transform: `translateY(-${_translate})`,
        },
      ],

      up: [
        {
          ...verticalSlide,
          transform: `translateY(-${_translate})`,
        },
        {
          ...verticalSlide,
          transition: "0.5s",
        },
      ],
    } || { ...horizontalSlide }
  );
};

export const actions = {
  NEXT: "NEXT",
  PREV: "PREV",
  DOWN: "DOWN",
  UP: "UP",
  RESTART: "RESTART",
  END: "END",
  SET: "SET",
};

export const useSetCurrent = (rows, slidesToMove) => {
  const [current, setCurrent] = useState({ x: 0, y: 0 });
  const [rowPosition, setRowPosition] = useState(
    [...Array(rows).keys()].map(() => 0)
  );
  const setRow = (current) => {
    setRowPosition((rp) => {
      rp[current.y] = current.x;

      return rp;
    });
  };

  const setNextCurrent = (current, action, coord = null) => {
    const nextCurrent = {
      [actions.SET]: () => {
        setCurrent({ x: coord.x, y: coord.y });
      },
      [actions.RESTART]: () => {
        setCurrent({ x: 0, y: 0 });
      },
      [actions.END]: () => {
        setCurrent({ x: 0, y: current.y + slidesToMove });
      },
      [actions.NEXT]: () => {
        setCurrent({ ...current, x: current.x + slidesToMove });
      },
      [actions.PREV]: () => {
        setCurrent({ ...current, x: current.x - slidesToMove });
      },

      [actions.DOWN]: () => {
        setRow(current);
        const _current = {
          x: rowPosition[current.y + slidesToMove],
          y: current.y + slidesToMove,
        };
        setCurrent(_current);
      },
      [actions.UP]: () => {
        setRow(current);
        const _current = {
          x: rowPosition[current.y - slidesToMove],
          y: current.y - slidesToMove,
        };
        setCurrent(_current);
      },
    };

    return nextCurrent[action]();
  };

  return [current, setNextCurrent, rowPosition];
};
