import styles from "./index.module.scss";
import BrandImage from "./images/brand.png";
import { Timeline } from "./components/Timeline/Timeline";
// import { BillingForm } from "./components/BillingForm/BillingForm";
import { useState } from "react";
import { ContactForm } from "./components/Form/ContactForm/ContactForm";
import { BillingForm } from "./components/Form/BillingForm/BillingForm";

const TimeLineItems = [
  { id: 1, index: 1, name: "Shipping" },
  { id: 2, index: 2, name: "Billing" },
  { id: 3, index: 3, name: "Confirmation" },
];

export const DesignDay1 = () => {
  const [activeTimeline, setActiveTimeline] = useState(1);

  return (
    <div className={styles.d1Wrapper}>
      <div className={styles.d1PageContent}>
        <div className={styles.d1form}>
          <Timeline items={TimeLineItems} activeIndex={activeTimeline} />
          <ContactForm
            onNext={() => setActiveTimeline(2)}
            show={activeTimeline === 1}
          />
          <BillingForm
            show={activeTimeline === 2}
            onNext={() => {}}
            onBack={() => setActiveTimeline(1)}
          />
        </div>
        <div className={styles.d1brand}>
          <div className={styles.productInfo}>
            <div className={styles.name}>
              Balence Bem Oil Control Moisturiez
            </div>
            <div className={styles.price}>$14.88</div>
          </div>
          <div className={styles.imageWrap}>
            <div className={styles.wrap}>
              <img src={BrandImage} alt="brand" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
