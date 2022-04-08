import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import SummaryReservation from "./SummaryReservation";
import "./PaymentCheckOut.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51JyJcYL0ESKPzL4unTzgF6RNnbF74kfe3qoF6vDqpZdlivaaXqbpyLjbi49lMpq2P8rQ1TEqBe7EDh3SNHkCZPMy001PZLJZI0"
);

const PaymentCheckOut = (props) => {
  const { selectedDates, totalVisitors, price, reservationRange, totalPrice } =
    props;
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3001/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: totalPrice ? totalPrice * 100 : 1,
        description: `${selectedDates?.checkIn} - ${selectedDates?.checkOut}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice, selectedDates]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <SummaryReservation
            selectedDates={selectedDates}
            totalVisitors={totalVisitors}
            price={price}
            reservationRange={reservationRange}
            totalPrice={totalPrice}
          />
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PaymentCheckOut;
