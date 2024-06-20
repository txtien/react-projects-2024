import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({ className, variant, ...rest }: Props) => {
  const variantClass = clsx({
    [styles.primary]: variant === "primary",
    [styles.secondary]: variant === "secondary",
  });

  return (
    <button
      {...rest}
      className={clsx(styles.button, variantClass, className)}
    />
  );
};
