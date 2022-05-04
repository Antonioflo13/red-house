import React from "react";

import Lottie from "lottie-react";
import sessionExpired from "../assets/lottie/session-expired.json";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const Idle = (props) => {
  const { showDialogSessionExpired, hideDialogSessionExpired } = props;
  const dialogHeader = (
    <div className="flex justify-content-center">
      <div className="font-bold">Sessione Scaduta!</div>
    </div>
  );
  const dialogFooter = (
    <Button
      label="Close"
      className="p-button-sm w-full"
      autoFocus
      onClick={() => {
        hideDialogSessionExpired();
      }}
    />
  );
  return (
    <Dialog
      visible={showDialogSessionExpired}
      onHide={() => hideDialogSessionExpired()}
      header={dialogHeader}
      footer={dialogFooter}
      breakpoints={{ "960px": "80vw" }}
      style={{ width: "30vw" }}
    >
      <React.Fragment>
        <div className="flex flex-column justify-content-center align-items-center p-2">
          <div>Esegui nuovamente il Login!</div>
          <Lottie animationData={sessionExpired} />
        </div>
      </React.Fragment>
    </Dialog>
  );
};

export default Idle;
