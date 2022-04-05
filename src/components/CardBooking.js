import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import styles from "./CardBooking.module.css";

import BookingCalendar from "./BookingCalendar";
import DialogVisitors from "./DialogVisitors";
import DialogPayment from "./DialogPayment";

const CardBooking = () => {
  const [visitors, setVisitors] = useState([]);
  const [totalVisitors, setTotalVisitors] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogPayment, setOpenDialogPayment] = useState(false);
  const [reservationDates, setReservationDates] = useState(null);
  const [notAvaiable, setNotAvaiable] = useState(true);
  const reservationsCollectionRef = collection(db, "reservations");

  const confirmVisitors = useCallback((adult, children, newborn) => {
    setVisitors([
      { type: "adult", number: adult },
      { type: "children", number: children },
      { type: "newborn", number: newborn },
    ]);
  }, []);

  const checkAvaiable = async () => {
    const data = await getDocs(reservationsCollectionRef);
    const checkIn = new Date(reservationDates.checkIn).setHours(0, 0, 0, 0);
    const checkOut = new Date(reservationDates.checkOut).setHours(0, 0, 0, 0);
    const dayInMilliseconds = 86400000;
    let notAvaiableEntryDates = [];
    let notAvaiableExitDates = [];
    let notAvaiableDates = [];
    let reservationDays = (checkOut - checkIn) / dayInMilliseconds
    let checkInNotAvaiable;
    let checkOutNotAvaiable;
    data.docs.forEach((reservation) => {
      notAvaiableEntryDates.push(
        reservation.data().startReservation.seconds * 1000
      );
      notAvaiableExitDates.push(
        reservation.data().endReservation.seconds * 1000
      );
      notAvaiableDates.push(
        reservation.data().startReservation.seconds * 1000,
        reservation.data().endReservation.seconds * 1000
      );

      if (
        checkIn >= reservation.data().startReservation.seconds * 1000 &&
        checkIn <= reservation.data().endReservation.seconds * 1000
      ) {
        checkInNotAvaiable = true;
      }
      if (
        checkOut >= reservation.data().startReservation.seconds * 1000 &&
        checkOut <= reservation.data().endReservation.seconds * 1000
      ) {
        checkOutNotAvaiable = true;
      }
      if (!checkInNotAvaiable && !checkOutNotAvaiable) {
        setOpenDialogPayment(true);
        setNotAvaiable(false);
      }
    });
    if (checkInNotAvaiable) {
      searchAvaiableDate(notAvaiableDates, checkIn, checkOut, "before", reservationDays);
      setNotAvaiable(true);
    }
    if (checkOutNotAvaiable) {
      searchAvaiableDate(notAvaiableDates, checkIn, checkOut, "after", reservationDays);
      setNotAvaiable(true);
    }
  };

  const searchAvaiableDate = (notAvaiableDates, checkInDate, checkOutDate,  operation, reservationDays) => {
    const dayInMilliseconds = 86400000;
    let newCheckInDate = checkInDate
    let days = reservationDays
    if(operation === 'before'){
      newCheckInDate = newCheckInDate - dayInMilliseconds
      if(notAvaiableDates.includes(newCheckInDate)){
        searchAvaiableDate(notAvaiableDates, newCheckInDate, checkOutDate, 'before', days)
      } else {
        let newCheckoutDate = newCheckInDate + days*dayInMilliseconds
        if(notAvaiableDates.includes(newCheckoutDate)){
          searchAvaiableDate(notAvaiableDates, newCheckInDate, checkOutDate, 'before', days)
        } else {
          console.log('1 poss.')
          console.log('NEW CHECKIN: ',  newCheckInDate)
          console.log('NEW CHECKOUT: ', newCheckoutDate)
        }
      }
    } else {
      newCheckInDate = newCheckInDate + dayInMilliseconds
      if(notAvaiableDates.includes(newCheckInDate)){
        searchAvaiableDate(notAvaiableDates, newCheckInDate, checkOutDate, 'after', days)
      } else {
        let newCheckoutDate = newCheckInDate + days*dayInMilliseconds
        if(notAvaiableDates.includes(newCheckoutDate)){
          searchAvaiableDate(notAvaiableDates, newCheckInDate, checkOutDate, 'after', days)
        } else {
          console.log('2 poss.')
          console.log('NEW CHECKIN: ',  newCheckInDate)
          console.log('NEW CHECKOUT: ', newCheckoutDate)
        }
      }
    }
  };

  useEffect(() => {
    let number = 0;
    visitors.forEach((visitor) => {
      number += visitor?.number;
    });
    setTotalVisitors(number);
  }, [visitors, setTotalVisitors]);

  const footer = (
    <span>
      <Button
        style={{ width: "100%" }}
        onClick={checkAvaiable}
        disabled={visitors.length === 0}
        label="Controlla la disponibilità"
      />
    </span>
  );

  return (
    <div>
      <DialogVisitors
        totalVisitors={totalVisitors}
        openDialog={openDialog}
        confirmVisitors={confirmVisitors}
        onHide={() => setOpenDialog(false)}
      />
      <DialogPayment
        openDialogPayment={openDialogPayment}
        onHide={() => setOpenDialogPayment(false)}
      />
      <Card
        title="Per i prezzi, aggiungi le date"
        className={`${styles.card}, shadow-8`}
        footer={footer}
      >
        <BookingCalendar
          confirmReservation={(reservationDate) =>
            setReservationDates(reservationDate)
          }
        />
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
        {notAvaiable && (
          <div className="text-pink-500">
            Ci dispiace le date selezionate non sono disponibili.
          </div>
        )}
      </Card>
    </div>
  );
};

export default CardBooking;
