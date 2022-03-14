import styles from "./CardBooking.module.css";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import BookingCalendar from "./BookingCalendar";

const CardBooking = () => {
  const footer = (
    <span>
      <Button style={{ width: "100%" }} label="Controlla la disponibilità" />
    </span>
  );

  return (
    <div>
      <Card title="Per i prezzi, aggiungi le date" className={`${styles.card}, shadow-8`} footer={footer}>
        <BookingCalendar />
      </Card>
    </div>
  );
};

export default CardBooking;
