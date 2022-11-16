import React, { useEffect, useState } from "react";

export const useTimeoutBuffer = (cart) => {
  const [timerId, setTimerId] = useState(null);
  const [func, setFunc] = useState(() => () => {});

  const createTimeoutBuffer = (customFunction, time) => {
    setFunc(() => customFunction);
    clearTimeout(timerId);
    const updateTimeout = setTimeout(() => {
      setTimerId(null);
    }, time);
    setTimerId(updateTimeout);
  };
  useEffect(() => {
    if (!timerId) {
      func(cart);
    }
  }, [timerId]);

  return createTimeoutBuffer;
};
