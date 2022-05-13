import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useCallback, useEffect, useState } from "react";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import moment from "moment";

import styles from "./styles/CardBooking.module.scss";

import BookingCalendar from "./BookingCalendar";
import DialogVisitors from "./DialogVisitors";
import DialogPayment from "./DialogPayment";

const CardBooking = () => {
  const [visitors, setVisitors] = useState([]);
  const [totalVisitors, setTotalVisitors] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogPayment, setOpenDialogPayment] = useState(false);
  const [reservationDates, setReservationDates] = useState(null);
  const [notAvaiable, setNotAvaiable] = useState(false);
  const [calendarNotAvaiableDates, setCalendarNotAvaiableDates] =
    useState(null);
  const [selectedDates, setSelectedDates] = useState(null);
  const [reservationRange, setReservationRange] = useState(null);
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

  const checkAvaiableCalendarDate = async () => {
    const data = await getDocs(reservationsCollectionRef);
    const dayInMilliseconds = 86400000;
    let reservations = [];
    data.docs.forEach((reservation) => {
      reservations.push([
        reservation.data().startReservation.seconds * 1000,
        reservation.data().endReservation.seconds * 1000,
      ]);
    });
    let NotAvaible = [];
    for (let key of reservations) {
      for (let index = key[0]; index <= key[1]; index++) {
        NotAvaible.push(
          new Date(key[0]),
          new Date((index += dayInMilliseconds))
        );
      }
    }
    setCalendarNotAvaiableDates(NotAvaible);
  };

  const getDates = async () => {
    const data = await getDocs(reservationsCollectionRef);
    let reservations = [];
    let allNotAvaibleDatesInMs = [];
    const dayInMilliseconds = 86400000;

    data.docs.forEach((reservation) => {
      reservations.push([
        reservation.data().startReservation.seconds * 1000,
        reservation.data().endReservation.seconds * 1000,
      ]);
    });
    for (let reservation of reservations) {
      for (let index = reservation[0]; index <= reservation[1]; index++) {
        allNotAvaibleDatesInMs.push((index += dayInMilliseconds));
      }
    }
    allNotAvaibleDatesInMs.sort((a, b) => a - b);
    checkAvaiable(allNotAvaibleDatesInMs);
  };

  const checkAvaiable = (allNotAvaibleDatesInMs) => {
    const checkIn = new Date(reservationDates.checkIn).setHours(0, 0, 0, 0);
    const checkOut = new Date(reservationDates.checkOut).setHours(0, 0, 0, 0);
    const dayInMilliseconds = 86400000;
    let reservationRange = (checkOut - checkIn) / dayInMilliseconds;
    setReservationRange(reservationRange + 1);

    const check = checkDates(checkIn, checkOut, allNotAvaibleDatesInMs);
    if (check) {
      setNotAvaiable(true);
      let prevDates = searchAvaiableDates(
        "subtract",
        reservationRange + 1,
        allNotAvaibleDatesInMs,
        checkIn
      );
      let nextDates = searchAvaiableDates(
        "add",
        reservationRange + 1,
        allNotAvaibleDatesInMs,
        checkOut
      );
      let highValue = moment(nextDates.newCheckInDate, "DD/MM/YYYY").add(
        2,
        "month"
      );
      let today = moment().format("DD/MM/YYYY");
      console.log(prevDates.newCheckInDate);
      console.log(today);
      if (moment(prevDates.newCheckInDate).isAfter(today)) {
        setPrevNewCheckIn(prevDates.newCheckInDate);
        setPrevNewCheckOut(prevDates.newCheckOutDate);
      }
      if (!moment(nextDates.newCheckInDate).isAfter(highValue)) {
        setNextNewCheckIn(nextDates.newCheckInDate);
        setNextNewCheckOut(nextDates.newCheckOutDate);
      }
    } else {
      setNotAvaiable(false);
      setOpenDialogPayment(true);
      setSelectedDates({
        checkIn: new Date(checkIn).toLocaleDateString(),
        checkInMillisecond: checkIn,
        checkOut: new Date(checkOut).toLocaleDateString(),
        checkOutMillisecond: checkOut,
      });
    }
  };

  const searchAvaiableDates = (
    MathOperation,
    reservationRange,
    allNotAvaibleDatesInMs,
    date
  ) => {
    let newCheckIn;
    let newCheckOut;
    if (MathOperation === "subtract") {
      newCheckIn = moment(date, "x")
        .subtract(reservationRange, "days")
        .format("x");
      newCheckOut = moment(date, "x").subtract(1, "days").format("x");
    }
    if (MathOperation === "add") {
      newCheckOut = moment(date, "x").add(reservationRange, "days").format("x");
      newCheckIn = moment(date, "x").add(1, "days").format("x");
    }
    const check = checkDates(newCheckIn, newCheckOut, allNotAvaibleDatesInMs);
    console.log(date);
    if (check) {
      searchAvaiableDates(
        "subtract",
        reservationRange,
        allNotAvaibleDatesInMs,
        date
      );
      searchAvaiableDates(
        "add",
        reservationRange,
        allNotAvaibleDatesInMs,
        date
      );
    } else {
      const newCheckInDate = moment(newCheckIn, "x").format("DD/MM/YYYY");
      const newCheckOutDate = moment(newCheckOut, "x").format("DD/MM/YYYY");
      return { newCheckInDate, newCheckOutDate };
    }
  };

  const checkDates = (checkIn, checkOut, allNotAvaibleDatesInMs) => {
    for (const allNotAvaibleDateInMs of allNotAvaibleDatesInMs) {
      if (moment(allNotAvaibleDateInMs).isBetween(checkIn, checkOut)) {
        return true;
      }
      if (
        moment(allNotAvaibleDateInMs).isSame(checkIn) ||
        moment(allNotAvaibleDateInMs).isSame(checkOut)
      ) {
        return true;
      }
    }
    return false;
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

  useEffect(() => {
    checkAvaiableCalendarDate();
  }, []);

  const footer = (
    <span>
      <Button
        style={{ width: "100%" }}
        onClick={nextNewCheckIn || prevNewCheckIn ? cleanSearch : getDates}
        disabled={
          !reservationDates?.checkIn ||
          !reservationDates?.checkOut ||
          visitors.length === 0
        }
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
        reservationRange={reservationRange}
        onHide={() => setOpenDialogPayment(false)}
      />
      <Card
        title="Per i prezzi, aggiungi le date"
        className="shadow-8"
        footer={footer}
      >
        <div className={styles.card}>
          <BookingCalendar
            calendarNotAvaiableDates={calendarNotAvaiableDates}
            confirmReservation={(reservationDate) =>
              setReservationDates(reservationDate)
            }
          />
          {totalVisitors > 0 && (
            <div className="flex align-items-center py-2">
              <div className="w-full">{`${
                totalVisitors === 1
                  ? `${totalVisitors} ospite`
                  : `${totalVisitors} ospiti`
              }`}</div>
              <Button
                icon="pi pi-pencil"
                iconPos="right"
                label="Modifica"
                className="ml-2 p-button-sm w-full"
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
                          checkInMillisecond: moment(
                            prevNewCheckIn,
                            "DD/MM/YYYY"
                          ).format("x"),
                          checkOut: prevNewCheckOut,
                          checkOutMillisecond: moment(
                            prevNewCheckOut,
                            "DD/MM/YYYY"
                          ).format("x"),
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
                          checkInMillisecond: moment(
                            nextNewCheckIn,
                            "DD/MM/YYYY"
                          ).format("x"),
                          checkOut: nextNewCheckOut,
                          checkOutMillisecond: moment(
                            nextNewCheckOut,
                            "DD/MM/YYYY"
                          ).format("x"),
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
