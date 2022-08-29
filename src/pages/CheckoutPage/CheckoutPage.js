import styles from "./CheckoutPage.module.scss";
import PaymentForm from "../../components/PaymentForm/PaymentForm";

const CheckoutPage = () => {
  return (
    <div className={styles.container}>
      {/* <MyPaymentForm /> */}
      <PaymentForm />
    </div>
  );
};
export default CheckoutPage;
