import { useState, useEffect } from "react";
import { bag_icon, coffee_icon, tea_icon } from "../../../assets/images/icons";
import styles from "./VerticalNav.module.scss";

const VeritcalNav = ({ interpolatedNav, isVisible, sendIndex }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);
  const renderVerticalNavItems = () => {
    return (
      <>
        <div
          className={styles.navItem}
          style={interpolatedNav[0] ? { opacity: 1 } : { opacity: 0.2 }}
          onClick={() => sendIndex(0)}
        >
          <img src={bag_icon} alt="bag icon" />
        </div>
        <div
          className={styles.navItem}
          style={interpolatedNav[1] ? { opacity: 1 } : { opacity: 0.2 }}
          onClick={() => sendIndex(1)}
        >
          <img src={tea_icon} alt="tea icon" />
        </div>
        <div
          className={styles.navItem}
          style={interpolatedNav[2] ? { opacity: 1 } : { opacity: 0.2 }}
          onClick={() => sendIndex(2)}
        >
          <img src={coffee_icon} alt="coffee icon" />
        </div>
      </>
    );
  };

  return (
    <div
      className={styles.container}
      style={isLoaded ? { visibility: "visible" } : { visibility: "hidden" }}
    >
      <div
        className={
          isVisible
            ? `${styles.verticalNav} ${styles.fadeIn}`
            : `${styles.verticalNav} ${styles.fadeOut}`
        }
      >
        {renderVerticalNavItems()}
      </div>
    </div>
  );
};
export default VeritcalNav;
