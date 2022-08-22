import MyPaymentForm from "../../components/MyPaymentForm/MyPaymentForm";
import styles from "./CheckoutPage.module.scss";

const CheckoutPage = () => {
  return (
    <div className={styles.container}>
      <MyPaymentForm />
    </div>
  );
};
export default CheckoutPage;
