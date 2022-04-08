import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import DialogVisitorsFooter from "./DialogVisitorsFooter";
import PaymentCheckOut from "./PaymentCheckout";

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
      setPrice(price.data().price);
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
      style={{ width: "50vw" }}
      breakpoints={{ "960px": "75vw" }}
      footer={DialogVisitorsFooter}
      onHide={onHide}
    >
      <div className="flex">
        <div className="flex justify-content-between">
          <div>
            <div>
              <div className="font-bold">Date</div>
              <div>
                <span>{props.selectedDates?.checkIn}</span> -{" "}
                <span>{props.selectedDates?.checkOut}</span>
              </div>
            </div>
            <div>
              <div className="font-bold">Ospiti</div>
              <div>
                <span>{`${
                  props.totalVisitors === 1
                    ? `${props.totalVisitors} ospite`
                    : `${props.totalVisitors} ospiti`
                }`}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="font-bold">Dettaglio Prezzo</div>
            <div className="flex justify-content-between">
              <div>
                {price} x {props.reservationRange}
              </div>
              <div>$</div>
            </div>
            <div className="flex justify-content-between">
              <div>tasse e costi di soggiorno</div>
              <div>$</div>
            </div>
            <hr />
            <div className="flex justify-content-between">
              <div>totale(EUR)</div>
              <div>{totalPrice} $</div>
            </div>
          </div>
        </div>
        <PaymentCheckOut />
      </div>
    </Dialog>
  );
};

export default DialogPayment;
