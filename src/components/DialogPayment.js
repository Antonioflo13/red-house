import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import CheckOutStripe from "./CheckOutStripe";

const DialogPayment = (props) => {
  const [openDialogPayment, setOpenDialogPayment] = useState(false);
  const [price, setPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const pricesCollectionRef = collection(db, "prices");

  useEffect(() => {
    setOpenDialogPayment(props.openDialogPayment);
    getPrice();
  }, [props.openDialogPayment]);

  const getPrice = async () => {
    const data = await getDocs(pricesCollectionRef);
    data.docs.forEach((price) => {
      setPrice(price.data().priceNumber);
    });
    calculateTotalPrice();
  };

  const calculateTotalPrice = async () => {
    setTotalPrice((await price) * props.reservationRange);
  };

  const onHide = () => {
    props.onHide();
    setOpenDialogPayment(false);
  };

  return (
    <Dialog
      header="Conferma e paga"
      visible={openDialogPayment}
      style={{ width: "35vw" }}
      breakpoints={{ "960px": "75vw" }}
      onHide={onHide}
    >
      <div>
        <CheckOutStripe
          selectedDates={props.selectedDates}
          totalVisitors={props.totalVisitors}
          price={price}
          reservationRange={props.reservationRange}
          totalPrice={totalPrice}
        />
      </div>
    </Dialog>
  );
};

export default DialogPayment;
