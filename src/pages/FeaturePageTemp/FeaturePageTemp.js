import "./featurePageTemp.css";
import { useNavigate } from "react-router-dom";

import React from "react";

export const FeaturePageTemp = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="feature-viewport">
                <div className="feature-outerContainer">
                    <div
                        className="feature-hoop"
                        id="feature-hoop"
                        onClick={() => navigate(`/shop`)}
                    >
                        <div className="feature-koana">koana</div>
                        <div className="feature-desc">
                            Hawaii Speciality Coffee and Chocolate
                        </div>
                    </div>
                    <div className="feature-best">
                        Best Coffee Shop in the State of Hawaii 2022 by FOOD &
                        WINE
                    </div>
                </div>
            </div>
        </>
    );
};
