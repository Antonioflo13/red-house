import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import DialogVisitorsFooter from "./DialogVisitorsFooter";

const DialogPayment = (props) => {
  const [openDialogPayment, setOpenDialogPayment] = useState(false);

  useEffect(
    () => setOpenDialogPayment(props.openDialogPayment),
    [props.openDialogPayment]
  );

  const onHide = () => {
    props.onHide();
    setOpenDialogPayment(false);
  };

  return (
    <Dialog
      header="Conferma e paga"
      visible={openDialogPayment}
      style={{ width: "30vw" }}
      footer={DialogVisitorsFooter}
      onHide={onHide}
    >
      <div className="flex flex-column">Payment</div>
      <div>{props.totalVisitors}</div>
      <div>{props.selectedDates?.checkIn}</div>
      <div>{props.selectedDates?.checkOut}</div>
    </Dialog>
  );
};

export default DialogPayment;
