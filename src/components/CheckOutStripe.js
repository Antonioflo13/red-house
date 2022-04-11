import React, { useState, useEffect } from "react";

import SummaryReservation from "./SummaryReservation";

const ProductDisplay = (props) => (
  <section>
    <div className="w-full">
      <SummaryReservation
        selectedDates={props.selectedDates}
        totalVisitors={props.totalVisitors}
        price={props.price}
        reservationRange={props.reservationRange}
        totalPrice={props.totalPrice}
      />
    </div>
    <form
      action={`http://localhost:3001/create-checkout-session?q=${props.reservationRange}&sr=${props.selectedDates?.checkInMillisecond}&er=${props.selectedDates?.checkOutMillisecond}`}
      method="POST"
    >
      <button type="submit">Vai al Checkout</button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

const CheckOutStripe = (props) => {
  const { selectedDates, totalVisitors, price, reservationRange, totalPrice } =
    props;
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
      //   const retrieveSession = await stripe.checkout.sessions.retrieve(
      //     session.id
      //   );
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay
      reservationRange={reservationRange}
      selectedDates={selectedDates}
      totalVisitors={totalVisitors}
      price={price}
      totalPrice={totalPrice}
    />
  );
};

export default CheckOutStripe;
