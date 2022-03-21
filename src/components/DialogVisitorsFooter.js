import { Button } from "primereact/button";

const DialogVisitorsFooter = (props) => {
  return (
    <div>
      <Button
        label="Chiudi"
        icon="pi pi-times"
        onClick={props.onHide}
        className="p-button-text"
      />
      <Button
        label="Conferma"
        icon="pi pi-check"
        onClick={props.confirmVisitors}
        autoFocus
      />
    </div>
  );
};

export default DialogVisitorsFooter;
