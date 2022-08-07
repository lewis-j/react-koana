import { useState } from "react";

export const useTransitionStyle = (_translate) => {
  const verticalSlide = {
    width: "100%",
    height: "200%",
    flexDirection: "column",
  };
  return (
    {
      next: [{ transform: `translateX(-${_translate})`, transition: "0.5s" }],
      prev: [
        { transform: `translateX(-${_translate})` },
        { transition: "0.5s" },
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
    } || {}
  );
};

export const useSetCurrent = (rows, slidesToMove) => {
  const [current, setCurrent] = useState({ x: 0, y: 0 });
  const [rowPosition, setRowPosition] = useState(
    [...Array(rows).keys()].map(() => 0)
  );

  const setNextCurrent = (current, action) => {
    const nextCurrent = {
      next: () => {
        setCurrent({ ...current, x: current.x + slidesToMove });
      },
      prev: () => {
        setCurrent({ ...current, x: current.x - slidesToMove });
      },

      down: () => {
        setCurrent({
          x: rowPosition[current.y + slidesToMove],
          y: current.y + slidesToMove,
        });
      },
      up: () => {
        setCurrent({
          x: rowPosition[current.y - slidesToMove],
          y: current.y - slidesToMove,
        });
      },
    };

    nextCurrent[action]();
  };

  return [current, setNextCurrent];
};
