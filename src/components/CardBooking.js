import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useState } from "react";

import styles from "./CardBooking.module.css";

import BookingCalendar from "./BookingCalendar";
import DialogVisitors from "./DialogVisitors";

const CardBooking = () => {
  const [visitors, setVisitors] = useState([]);
  const [totalVisitors, setTotalVisitors] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const footer = (
    <span>
      <Button style={{ width: "100%" }} label="Controlla la disponibilità" />
    </span>
  );

  const confirmVisitors = (adults, children, newborns) => {
    setVisitors([adults, children, newborns]);
    console.log(visitors);
    let number = 0;
    visitors.forEach((visitor) => {
      number += visitor?.number;
    });
    setTotalVisitors(number);
  };

  return (
    <div>
      <DialogVisitors
        totalVisitors={totalVisitors}
        openDialog={openDialog}
        onHide={() => setOpenDialog(false)}
      />
      <Card
        title="Per i prezzi, aggiungi le date"
        className={`${styles.card}, shadow-8`}
        footer={footer}
      >
        <BookingCalendar />
        {totalVisitors > 0 && (
          <div className="flex align-items-center py-2">
            <span>{totalVisitors} ospite</span>
            <Button
              icon="pi pi-pencil"
              iconPos="right"
              label="Modifica"
              className="ml-2 p-button-sm p-button-danger p-button-text"
              onClick={() => setOpenDialog(true)}
            />
          </div>
        )}
        {!totalVisitors && (
          <Button
            style={{ width: "100%" }}
            icon="pi pi-plus-circle"
            iconPos="right"
            label="Ospiti"
            className="my-3 p-button-outlined p-button-secondary"
            onClick={() => setOpenDialog(true)}
          />
        )}
      </Card>
    </div>
  );
};

export default CardBooking;
