import clsx from "clsx";
import styles from "./Timeline.module.scss";

interface Props {
  items: { id: number; index: number; name: string }[];
  activeIndex: number;
}

export const Timeline = ({ items, activeIndex }: Props) => {
  return (
    <ul className={styles.timeline}>
      {items.map((item) => (
        <li className="li">
          <div
            className={clsx(
              styles.timelineItem,
              activeIndex === item.index && styles.active,
              activeIndex > item.index && styles.passed
            )}
          >
            <div className={styles.wrapLine}>
              <span className={styles.timelineCircle}></span>
            </div>
            <span>{item.name}</span>
          </div>
        </li>
      ))}
      {/* <li className="li">
        <div className={`${styles.timelineItem} ${styles.passed}`}>
          <div className={styles.wrapLine}>
            <span className={styles.timelineCircle}></span>
          </div>
          <span>Shipping</span>
        </div>
      </li>
      <li className="li">
        <div className={`${styles.timelineItem} ${styles.active}`}>
          <div className={styles.wrapLine}>
            <span className={styles.timelineCircle}></span>
          </div>
          <span>Billing</span>
        </div>
      </li>
      <li className="li">
        <div className={styles.timelineItem}>
          <div className={styles.wrapLine}>
            <span className={styles.timelineCircle}></span>
          </div>
          <span>Confirmation</span>
        </div>
      </li> */}
    </ul>
  );
};
