/* eslint-disable @typescript-eslint/no-explicit-any */
import baseStyles from "../index.module.scss";
import styles from "./Confirmation.module.scss";
import { CardPaymentIcon, PaypalPaymentIcon } from "../BillingForm/BillingForm";
import { Button } from "../../Button/Button";

interface Props {
  formData: any;
  show: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

export const Confirmation = ({ formData, show, onSubmit, onBack }: Props) => {
  return (
    <div
      className={baseStyles.form}
      style={{ display: show ? "block" : "none" }}
    >
      <div className={styles.wrap}>
        <h4 className={styles.title}>
          Please confirm the following transaction:
        </h4>
        <div className={styles.innerWrap}>
          <div className={styles.container}>
            <div className={styles.billingInfo}>
              <div className={styles.row}>
                <span>Amount:</span>
                <span>$14.88</span>
              </div>
              <div className={styles.row}>
                <span>Fee:</span>
                <span>$10.00</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.row}>
                <span>Total:</span>
                <span>$24.88</span>
              </div>
            </div>
            <div className={styles.payment}>
              <span className={styles.paymentInfo}>
                Payment Method:{" "}
                {formData.billingData?.paymentMethod === "card" ? (
                  <CardPaymentIcon />
                ) : (
                  <PaypalPaymentIcon />
                )}
              </span>
              <Button className={styles.changeButton} onClick={onBack}>
                Change
              </Button>
            </div>
          </div>
          <Button className={styles.confirmBtn} variant="primary">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};
