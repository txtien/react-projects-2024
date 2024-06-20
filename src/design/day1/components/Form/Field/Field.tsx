import clsx from "clsx";
import style from "./Field.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Field = ({ className, error, ...rest }: Props) => {
  return (
    <input
      {...rest}
      type="text"
      className={clsx(style.input, error && style.error, className)}
    />
  );
};
