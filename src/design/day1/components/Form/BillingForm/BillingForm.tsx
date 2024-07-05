/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./BillingForm.module.scss";
import CardImage from "../../../images/card.png";
import PaypalImage from "../../../images/paypal.png";
import baseStyles from "../index.module.scss";
import { Field } from "../Field/Field";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../Button/Button";
import { useEffect, useState } from "react";

interface Props {
  formData: any;
  show: boolean;
  onNext: (data: any) => void;
  onBack: () => void;
}

export const PaypalPaymentIcon = () => {
  return (
    <img
      className={`${styles.icon} ${styles.paypal}`}
      src={PaypalImage}
      alt="paypal"
    />
  );
};

export const CardPaymentIcon = () => {
  return <img className={styles.icon} src={CardImage} alt="card" />;
};

export const BillingForm = ({ show, onNext, onBack }: Props) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardForm, setCardForm] = useState({
    cardName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });
  const [paypalForm, setPaypalForm] = useState({
    paypalEmail: "",
  });

  const [formErr, setFormErr] = useState<{ [key: string]: string }>({});

  const clearCardForm = () => {
    setCardForm({
      cardName: "",
      cardNumber: "",
      expiration: "",
      cvv: "",
    });
  };

  const clearPaypalForm = () => {
    setPaypalForm({
      paypalEmail: "",
    });
  };

  useEffect(() => {
    if (paymentMethod === "card") {
      clearPaypalForm();
    } else {
      clearCardForm();
    }
    setFormErr({});
  }, [paymentMethod]);

  const handleNext = () => {
    setFormErr({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err: any = {};
    if (paymentMethod === "card") {
      for (const name in cardForm) {
        // const key = name as keyof typeof cardForm;
        const value = cardForm[name as keyof typeof cardForm];
        if (!value) {
          err[name] = "Vui lòng nhập";
        } else if (name === "cardNumber") {
          const isAllNumber = /^\d+$/.test(value);
          if (!isAllNumber) {
            err[name] = "Card number must be number";
          }
        } else if (name === "expiration") {
          const isExpiration = /^\d{2}\/\d{2}$/.test(value);
          if (!isExpiration) {
            err[name] = "Invalid expiration date";
          }
        } else if (name === "cvv") {
          const isCVV = /^\d{3}$/.test(value);
          if (!isCVV) {
            err[name] = "Invalid CVV";
          }
        }
      }
    } else {
      if (paypalForm.paypalEmail === "") {
        err["paypalEmail"] = "vui lòng nhập";
      }
      const isEmail = /\S+@\S+\.\S+/.test(paypalForm.paypalEmail);
      if (!isEmail) {
        err["paypalEmail"] = "Invalid email";
      }
    }

    if (Object.keys(err).length > 0) {
      setFormErr(err);
      return;
    }

    if (paymentMethod === "card") {
      onNext({
        paymentMethod: paymentMethod,
        ...cardForm,
      });
    } else {
      onNext({
        paymentMethod: paymentMethod,
        ...paypalForm,
      });
    }
  };

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
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <label className={styles.paymentLabel} htmlFor="card">
              <CardPaymentIcon />
              {/* <span>Card</span> */}
            </label>
          </span>
          <span className={styles.paymentField}>
            <input
              type="radio"
              id="visa"
              name="payment_method"
              value="visa"
              checked={paymentMethod === "visa"}
              onChange={() => setPaymentMethod("visa")}
            />
            <label className={styles.paymentLabel} htmlFor="visa">
              <PaypalPaymentIcon />
              {/* <span>Paypal</span> */}
            </label>
          </span>
        </div>
      </div>
      <div>
        <h3 className={styles.formTitle}>Payment Detail</h3>
        {paymentMethod === "card" ? (
          <div className={baseStyles.formGrid}>
            <Field
              className={baseStyles.fullField}
              name="cardName"
              placeholder="Enter Name On Card"
              value={cardForm.cardName}
              onChange={(e) =>
                setCardForm({ ...cardForm, cardName: e.target.value })
              }
              error={formErr["cardName"]}
            />
            <Field
              className={baseStyles.fullField}
              name="cardNumber"
              placeholder="Card Number"
              value={cardForm.cardNumber}
              onChange={(e) =>
                setCardForm({ ...cardForm, cardNumber: e.target.value })
              }
              error={formErr["cardNumber"]}
            />
            <Field
              className={baseStyles.halfField}
              name="expiration"
              placeholder="Expiration"
              value={cardForm.expiration}
              onChange={(e) =>
                setCardForm({ ...cardForm, expiration: e.target.value })
              }
              error={formErr["expiration"]}
            />
            <Field
              className={baseStyles.halfField}
              name="cardNumber"
              placeholder="CVV Code"
              value={cardForm.cvv}
              onChange={(e) =>
                setCardForm({ ...cardForm, cvv: e.target.value })
              }
              error={formErr["cvv"]}
            />
          </div>
        ) : (
          <div className={baseStyles.formGrid}>
            <Field
              className={baseStyles.fullField}
              name="paypalEmail"
              placeholder="Enter Paypal Email"
              value={paypalForm.paypalEmail}
              onChange={(e) =>
                setPaypalForm({ ...paypalForm, paypalEmail: e.target.value })
              }
              error={formErr["paypalEmail"]}
            />
          </div>
        )}
      </div>
      <div className={styles.agree}>
        By Click “Confirm Payment” I agree to the companies term of services
      </div>
      <div className={styles.buttonWrap}>
        <Button variant="secondary" onClick={onBack}>
          <ChevronLeft />
          <span style={{ marginLeft: "8px" }}>Back</span>
        </Button>
        <Button variant="primary" onClick={handleNext}>
          <span style={{ marginRight: "8px" }}>Confirm $14.88</span>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
