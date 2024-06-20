import styles from "./BillingForm.module.scss";
import CardImage from "../../../images/card.png";
import PaypalImage from "../../../images/paypal.png";
import baseStyles from "../index.module.scss";
import { Field } from "../Field/Field";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../Button/Button";
interface Props {
  show: boolean;
  onNext: () => void;
  onBack: () => void;
}

export const BillingForm = ({ show, onNext, onBack }: Props) => {
  return (
    <div
      className={baseStyles.form}
      style={{ display: show ? "block" : "none" }}
    >
      <div style={{ marginBottom: "32px" }}>
        <h3 className={baseStyles.formTitle}>Payment Method</h3>
        <div className={styles.payment}>
          <span className={styles.paymentField}>
            <input
              type="radio"
              id="card"
              name="payment_method"
              value="card"
              checked
            />
            <label className={styles.paymentLabel} htmlFor="card">
              <img className={styles.icon} src={CardImage} alt="card" />
              {/* <span>Card</span> */}
            </label>
          </span>
          <span className={styles.paymentField}>
            <input type="radio" id="visa" name="payment_method" value="visa" />
            <label className={styles.paymentLabel} htmlFor="visa">
              <img
                className={`${styles.icon} ${styles.paypal}`}
                src={PaypalImage}
                alt="paypal"
              />
              {/* <span>Paypal</span> */}
            </label>
          </span>
        </div>
      </div>
      <div>
        <h3 className={styles.formTitle}>Payment Detail</h3>
        <div className={baseStyles.formGrid}>
          <Field
            className={baseStyles.fullField}
            name="cardName"
            placeholder="Enter Name On Card"
          />
          <Field
            className={baseStyles.fullField}
            name="cardNumber"
            placeholder="Card Number"
          />
          <Field
            className={baseStyles.halfField}
            name="expiration"
            placeholder="Expiration"
          />
          <Field
            className={baseStyles.halfField}
            name="cardNumber"
            placeholder="CVV Code"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
          gap: "1rem",
        }}
      >
        <Button variant="secondary" onClick={onBack}>
          <ChevronLeft />
          <span style={{ marginLeft: "8px" }}>Back</span>
        </Button>
        <Button variant="primary" onClick={onNext}>
          <span style={{ marginRight: "8px" }}>Next</span>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
