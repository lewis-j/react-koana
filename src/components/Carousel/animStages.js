const useStyleStage = (_translate) => {
  const verticalSlide = {
    width: "100%",
    height: "200%",
    flexDirection: "column",
  };
  return (
    {
      NEXT: { transform: `translateX(-${_translate})`, transition: "0.5s" },
      PREV_STAGE: { transform: `translateX(-${_translate})` },
      PREV: { transition: "0.5s" },
      DOWN_STAGE: { ...verticalSlide },
      DOWN: {
        ...verticalSlide,
        transition: "0.5s",
        transform: `translateY(-${_translate})`,
      },
      UP_STAGE: {
        ...verticalSlide,
        transform: `translateY(-${_translate})`,
      },
      UP: {
        ...verticalSlide,
        transition: "0.5s",
      },
    } || {}
  );
};

export default useStyleStage;
