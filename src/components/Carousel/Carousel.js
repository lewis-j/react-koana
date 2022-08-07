import React, { useState } from "react";
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

    const slideNext = () => {
        if (currentX < items[currentY].length - slidesToShow) {
            setSlides(() =>
                [...Array(totalSlides).keys()].map(
                    (i) => items[currentY][currentX + i]
                )
            );
            setStage("NEXT_STAGE");
            setTimeout(() => {
                setStage("NEXT");
                setCurrentX((currentX) => currentX + slidesToMove);
            }, 1);
        }
    };
    const slidePrev = () => {
        if (currentX !== 0) {
            setSlides(() =>
                [...Array(totalSlides).keys()].map(
                    (i) => items[currentY][currentX + i - slidesToMove]
                )
            );
            setStage("PREV_STAGE");
            setTimeout(() => {
                setStage("PREV");
                setCurrentX((currentX) => currentX - slidesToMove);
            }, 1);
        }
    };
    const slideDown = () => {
        setSlides(() =>
            [...Array(totalSlides).keys()].map(
                (i) => items[currentY + i][currentX]
            )
        );
        setStage("DOWN_STAGE");
        setTimeout(() => {
            setStage("DOWN");
            setCurrentY((currentY) => currentY + slidesToMove);
        }, 1);
    };
    const slideUp = () => {
        setSlides(() =>
            [...Array(totalSlides).keys()].map(
                (i) => items[currentY + i - slidesToMove][currentX]
            )
        );
        setStage("UP_STAGE");
        setTimeout(() => {
            setStage("UP");
            setCurrentY((currentY) => currentY - slidesToMove);
        }, 1);
    };

    const sliderTransition = (_stage) => {
        return {
            NEXT: {
                transform: `translateX(-${transformX})`,
                transition: "0.5s",
            },
            PREV_STAGE: { transform: `translateX(-${transformX})` },
            PREV: { transition: "0.5s" },
            DOWN_STAGE: {
                flexDirection: "column",
                width: "100%",
                height: "200%",
            },
            DOWN: {
                flexDirection: "column",
                width: "100%",
                height: "200%",
                transition: "0.5s",
                transform: `translateY(-${transformX})`,
            },
            UP_STAGE: {
                flexDirection: "column",
                width: "100%",
                height: "200%",
                transform: `translateY(-${transformX})`,
            },
            UP: {
                flexDirection: "column",
                width: "100%",
                height: "200%",
                transition: "0.5s",
            },
        }[_stage];
    };

    return (
        <div className={wrapper}>
            <div className={styles.container}>
                <div
                    className={styles.slider}
                    style={{
                        ...sliderTransition(stage),
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
