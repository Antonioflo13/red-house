import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
// import { addLocale } from "primereact/api";

const BookingCalendar = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  
  let today = new Date();

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
            value={checkIn}
            showButtonBar
            onChange={(e) => setCheckIn(e.value)}
            numberOfMonths={1}
          />
        </div>
        <div className="flex flex-column">
          <label htmlFor="checkOut" style={{ fontWeight: "bold" }}>
            CHECK-OUT
          </label>
          <Calendar
            id="checkOut"
            dateFormat="dd/mm/yy"
            placeholder="Aggiungi una data"
            minDate={today}
            value={checkOut}
            disabled={!checkIn}
            showButtonBar
            onChange={(e) => setCheckOut(e.value)}
            numberOfMonths={1}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
