import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
// import { addLocale } from "primereact/api";

const BookingCalendar = (props) => {
  const { confirmReservation, calendarNotAvaiableDates } = props;
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  console.log(calendarNotAvaiableDates);
  const dayInMilliseconds = 86400000;
  for (const iterator in calendarNotAvaiableDates) {
    console.log(calendarNotAvaiableDates[iterator]);
  }
  let today = new Date();
  let invalidDates = calendarNotAvaiableDates
    ? calendarNotAvaiableDates
    : [today];

  // const dateTemplate = (date) => {
  //   if (calendarNotAvaiableDates?.length > 0) {
  //     for (const calendarNotAvaiableDate of calendarNotAvaiableDates) {
  //       if (
  //         date.day >=
  //           Number(
  //             calendarNotAvaiableDate.toLocaleDateString().split("/")[0]
  //           )
  //          &&
  //         date.month + 1 ===
  //           Number(
  //             calendarNotAvaiableDate.toLocaleDateString().split("/")[1]
  //           ) &&
  //         date.year ===
  //           Number(calendarNotAvaiableDate.toLocaleDateString().split("/")[2])
  //       ) {
  //         return (
  //           <strong
  //             className="p-disabled"
  //             style={{ textDecoration: "line-through" }}
  //           >
  //             {date.day}
  //           </strong>
  //         );
  //       }
  //     }
  //   }
  //   return date.day;
  // };

  useEffect(
    () => confirmReservation({ checkIn, checkOut }),
    [checkIn, checkOut]
  );

  return (
    <div className="flex flex-column">
      <div className="flex mb-3">
        <div className="flex flex-column">
          <label htmlFor="checkIn" style={{ fontWeight: "bold" }}>
            CHECK-IN
          </label>
          <Calendar
            id="checkIn"
            dateFormat="dd/mm/yy"
            placeholder="Aggiungi una data"
            minDate={today}
            readOnlyInput={true}
            value={checkIn}
            showButtonBar
            onChange={(e) => setCheckIn(e.value)}
            numberOfMonths={1}
            />
            {/* disabledDates={invalidDates} */}
        </div>
        <div className="flex flex-column">
          <label htmlFor="checkOut" style={{ fontWeight: "bold" }}>
            CHECK-OUT
          </label>
          <Calendar
            id="checkOut"
            dateFormat="dd/mm/yy"
            placeholder="Aggiungi una data"
            minDate={today && checkIn}
            readOnlyInput={true}
            value={checkOut}
            disabled={!checkIn}
            showButtonBar
            onChange={(e) => setCheckOut(e.value)}
            numberOfMonths={1}
            />
            {/* disabledDates={invalidDates} */}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
