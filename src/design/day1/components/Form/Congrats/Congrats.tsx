import { ChevronRight } from "lucide-react";
import { Button } from "../../Button/Button";
import Image from "./congrat.png";
import styles from "./Congrats.module.scss";

export const Congratulation = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <img className={styles.image} src={Image} alt="congratulation" />
        <p className={styles.text}>Congratulations!</p>
        <p className={styles.text}>
          Your order is ready and will be delivered to you
        </p>
      </div>
      <div className={styles.bottom}>
        <p className={styles.text}>
          Your order will be delivered on June 20 9:00-13:00, to company. Ho Chi
          Minh City, 51 Kinh Duong Vuong Street
        </p>
        <Button variant="primary" className={styles.button}>
          <span>Continue Shopping</span>
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};
