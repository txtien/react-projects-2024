/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight } from "lucide-react";
import { Button } from "../../Button/Button";
import { Field } from "../Field/Field";
import baseStyle from "../index.module.scss";
import { useState } from "react";

interface Props {
  show: boolean;
  onNext: () => void;
}

export const ContactForm = ({ show, onNext }: Props) => {
  const [formData, setFormdata] = useState<any>({
    name: "",
    phone: "",
    street: "",
    streetNo: "",
    houseNo: "",
    city: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (element: HTMLInputElement) => {
    setFormdata({ ...formData, [element.name]: element.value });
  };

  const handleNext = () => {
    let hasError = false;
    const err: any = {};
    for (const name in formData) {
      const value = formData[name];
      if (!value) {
        hasError = true;
        err[name] = "Vui lòng nhập";
      } else {
        delete err[name];
      }
    }
    setErrors(err);
    if (hasError) {
      return;
    }

    onNext();
  };

  return (
    <div
      className={baseStyle.form}
      style={{ display: show ? "block" : "none" }}
    >
      <div style={{ marginBottom: "32px" }}>
        <h3 className={baseStyle.formTitle}>Contact</h3>
        <div className={baseStyle.formGrid}>
          <Field
            name="name"
            placeholder="Name"
            className={baseStyle.fullField}
            onChange={(e) => {
              handleChange(e.target);
            }}
            error={errors["name"]}
          />
          <Field
            name="phone"
            placeholder="Phone"
            className={baseStyle.fullField}
            onChange={(e) => {
              handleChange(e.target);
            }}
            error={errors["phone"]}
          />
          <Field
            name="street"
            placeholder="Street"
            className={baseStyle.fullField}
            onChange={(e) => {
              handleChange(e.target);
            }}
            error={errors["street"]}
          />
          <Field
            name="streetNo"
            placeholder="Street. No"
            className={baseStyle.halfField}
            onChange={(e) => {
              handleChange(e.target);
            }}
            error={errors["streetNo"]}
          />
          <Field
            name="houseNo"
            placeholder="House. No"
            className={baseStyle.halfField}
            onChange={(e) => {
              handleChange(e.target);
            }}
            error={errors["houseNo"]}
          />
          <Field
            name="city"
            placeholder="City"
            className={baseStyle.fullField}
            onChange={(e) => {
              handleChange(e.target);
            }}
            error={errors["city"]}
          />
          <Field
            name="zipCode"
            placeholder="Zip Code"
            className={baseStyle.fullField}
            onChange={(e) => {
              handleChange(e.target);
            }}
            error={errors["zipCode"]}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "2rem",
          }}
        >
          <Button variant="primary" onClick={handleNext}>
            <span style={{ marginRight: "8px" }}>Next</span>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
