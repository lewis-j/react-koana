import {
  bag_icon,
  chocolate_icon,
  coffee_icon,
  tea_icon,
} from "../../../assets/images/icons";
import styles from "./VerticalNav.module.scss";

const icons = [
  { title: "Gifts", icon: bag_icon },
  { title: "Coffee", icon: coffee_icon },
  { title: "Tea", icon: tea_icon },
  { title: "Chocolate", icon: chocolate_icon },
];

const VeritcalNav = ({ activeNav, isVisible, sendIndex }) => {
  const renderVerticalNavItems = () => {
    return (
      <>
        {icons.map(({ icon, title }, i) => {
          let _style = { opacity: 0 };
          if (activeNav === i) {
            _style = { opacity: 1 };
          } else if (isVisible) {
            const dif = Math.abs(i - activeNav);
            _style = { opacity: 1 - dif * 2 * 0.23 };
          }

          return (
            <div
              key={`${i}${new Date()}CatNav`}
              className={styles.navItem}
              onClick={() => sendIndex(i)}
              style={_style}
            >
              <img className={styles.img} src={icon} alt="menu icon" />
              <h1 className={styles.title}>{title}</h1>
            </div>
          );
        })}
        {/* <div
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
        </div> */}
      </>
    );
  };

  return (
    <div
      className={styles.verticalNav}
      style={{ transform: `translateY(-${activeNav * 0.25 * 100}%)` }}
    >
      {renderVerticalNavItems()}
    </div>
  );
};
export default VeritcalNav;
