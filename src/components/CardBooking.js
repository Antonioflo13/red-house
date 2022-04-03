import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import styles from "./CardBooking.module.css";

import BookingCalendar from "./BookingCalendar";
import DialogVisitors from "./DialogVisitors";

const CardBooking = () => {
  const [visitors, setVisitors] = useState([]);
  const [startReservation, setStartReservation] = useState();
  const [totalVisitors, setTotalVisitors] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const reservationsCollectionRef = collection(db, "reservations");

  const footer = (
    <span>
      <Button style={{ width: "100%" }} label="Controlla la disponibilità" />
    </span>
  );

  const confirmVisitors = useCallback((adult, children, newborn) => {
    setVisitors([
      { type: "adult", number: adult },
      { type: "children", number: children },
      { type: "newborn", number: newborn },
    ]);
  }, []);

  useEffect(() => {
    let number = 0;
    visitors.forEach((visitor) => {
      number += visitor?.number;
    });
    setTotalVisitors(number);
  }, [visitors, setTotalVisitors]);

  useEffect(() => {
    const checkAvaiable = async () => {
      const data = await getDocs(reservationsCollectionRef);
      console.log(
        data.docs.map((reservation) =>
          console.log(
            reservation.data()["end reservation"].seconds ===
              new Date("2022/04/05 12:00:00").getTime() / 1000
          )
        )
      );
    };
    checkAvaiable();
  }, []);

  return (
    <div>
      <DialogVisitors
        totalVisitors={totalVisitors}
        openDialog={openDialog}
        confirmVisitors={confirmVisitors}
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
