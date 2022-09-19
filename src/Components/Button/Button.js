import styles from "./Button.module.scss";

const Button = ({ children, className, variant = "", onClick }) => {
  return (
    <>
      <button
        className={`${className} ${styles[variant]} ${styles.inherent}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
export default Button;
