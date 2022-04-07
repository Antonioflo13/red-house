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
  const [notAvaiable, setNotAvaiable] = useState();
  const [selectedDates, setSelectedDates] = useState(null);
  const [prevNewCheckIn, setPrevNewCheckIn] = useState();
  const [prevNewCheckOut, setPrevNewCheckOut] = useState();
  const [nextNewCheckIn, setNextNewCheckIn] = useState();
  const [nextNewCheckOut, setNextNewCheckOut] = useState();
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
    let reservationDays = (checkOut - checkIn) / dayInMilliseconds;
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
        setSelectedDates({
          checkIn: new Date(checkIn).toLocaleDateString(),
          checkOut: new Date(checkOut).toLocaleDateString(),
        });
      }
    });
    if (checkInNotAvaiable) {
      searchAvaiableDate(
        notAvaiableDates,
        checkIn,
        checkOut,
        "before",
        reservationDays
      );
      setNotAvaiable(true);
    }
    if (checkOutNotAvaiable) {
      searchAvaiableDate(
        notAvaiableDates,
        checkIn,
        checkOut,
        "after",
        reservationDays
      );
      setNotAvaiable(true);
    }
  };

  const searchAvaiableDate = (
    notAvaiableDates,
    checkInDate,
    checkOutDate,
    operation,
    reservationDays
  ) => {
    const dayInMilliseconds = 86400000;
    let newCheckInDate = checkInDate;
    let days = reservationDays;
    if (operation === "before") {
      newCheckInDate = newCheckInDate - dayInMilliseconds;
      if (notAvaiableDates.includes(newCheckInDate)) {
        searchAvaiableDate(
          notAvaiableDates,
          newCheckInDate,
          checkOutDate,
          "before",
          days
        );
      } else {
        let newCheckoutDate = newCheckInDate + days * dayInMilliseconds;
        if (notAvaiableDates.includes(newCheckoutDate)) {
          searchAvaiableDate(
            notAvaiableDates,
            newCheckInDate,
            checkOutDate,
            "before",
            days
          );
        } else {
          setPrevNewCheckIn(new Date(newCheckInDate).toLocaleDateString());
          setPrevNewCheckOut(new Date(newCheckoutDate).toLocaleDateString());
        }
      }
    } else {
      newCheckInDate = newCheckInDate + dayInMilliseconds;
      if (notAvaiableDates.includes(newCheckInDate)) {
        searchAvaiableDate(
          notAvaiableDates,
          newCheckInDate,
          checkOutDate,
          "after",
          days
        );
      } else {
        let newCheckoutDate = newCheckInDate + days * dayInMilliseconds;
        if (notAvaiableDates.includes(newCheckoutDate)) {
          searchAvaiableDate(
            notAvaiableDates,
            newCheckInDate,
            checkOutDate,
            "after",
            days
          );
        } else {
          setNextNewCheckIn(new Date(newCheckInDate).toLocaleDateString());
          setNextNewCheckOut(new Date(newCheckoutDate).toLocaleDateString());
        }
      }
    }
  };

  const cleanSearch = () => {
    setVisitors([]);
    setTotalVisitors(null);
    setNotAvaiable(null);
    setPrevNewCheckIn(null);
    setPrevNewCheckOut(null);
    setNextNewCheckIn(null);
    setNextNewCheckOut(null);
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
        onClick={nextNewCheckIn || prevNewCheckIn ? cleanSearch : checkAvaiable}
        disabled={visitors.length === 0}
        label={`${
          nextNewCheckIn || prevNewCheckIn
            ? "Esegui una nuova ricerca"
            : "Controlla la disponibilità"
        }`}
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
        totalVisitors={totalVisitors}
        selectedDates={selectedDates}
        onHide={() => setOpenDialogPayment(false)}
      />
      <Card
        title="Per i prezzi, aggiungi le date"
        className="shadow-8"
        footer={footer}
      >
        <div className={styles.card}>
          <BookingCalendar
            confirmReservation={(reservationDate) =>
              setReservationDates(reservationDate)
            }
          />
          {totalVisitors > 0 && (
            <div className="flex align-items-center py-2">
              <span>{`${
                totalVisitors === 1
                  ? `${totalVisitors} ospite`
                  : `${totalVisitors} ospiti`
              }`}</span>
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
            <div className="flex flex-column align-items-center">
              <div className="text-pink-700">
                Ci dispiace le date selezionate non sono disponibili.
              </div>
              <div>
                <div className="mt-2 ">
                  Abbiamo cercato per te le date disponibili più vicine la tua
                  ricerca.
                </div>
                <div className="flex justify-content-around mt-3">
                  {prevNewCheckIn && prevNewCheckOut && (
                    <Button
                      label={`${prevNewCheckIn} - ${prevNewCheckOut}`}
                      icon="pi pi-calendar"
                      className="p-button-sm p-button-outlined"
                      onClick={() => {
                        setOpenDialogPayment(true);
                        setSelectedDates({
                          checkIn: prevNewCheckIn,
                          checkOut: prevNewCheckOut,
                        });
                      }}
                    />
                  )}
                  {nextNewCheckIn && nextNewCheckOut && (
                    <Button
                      label={`${nextNewCheckIn} - ${nextNewCheckOut}`}
                      icon="pi pi-calendar"
                      className="p-button-sm p-button-outlined"
                      onClick={() => {
                        setOpenDialogPayment(true);
                        setSelectedDates({
                          checkIn: nextNewCheckIn,
                          checkOut: nextNewCheckOut,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CardBooking;
