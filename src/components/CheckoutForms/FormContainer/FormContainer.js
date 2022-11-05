import styles from "./FormContainer.module.css";

const FormContainer = ({ children, title }) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formTheme}>
        <h5>CHECKOUT</h5>
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
};
export default FormContainer;
