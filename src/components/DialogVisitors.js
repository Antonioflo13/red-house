import React, { useCallback, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import style from "./DialogVisitors.module.css";

import Counter from "./Counter";
import DialogVisitorsFooter from "./DialogVisitorsFooter";

const DialogVisitors = (props) => {
  const { totalVisitors } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [adults, setAdults] = useState(null);
  const [children, setChildren] = useState(null);
  const [newborns, setNewbors] = useState(null);
  const [confirmVisitors, setConfirmVisitors] = useState();
  const visitorsTypes = [
    {
      id: 1,
      type: "Adulti",
      description: "Più di 13 anni",
    },
    {
      id: 2,
      type: "Bambini",
      description: "Età 2 - 12 ",
    },
    {
      id: 3,
      type: "Neonati",
      description: "Fino a 2 anni",
    },
  ];

  const handlerVisitors = useCallback((type, number) => {
    switch (type) {
      case 1:
        setAdults({
          type: "Adulti",
          number,
        });
        handlerVisitors();
        break;
      case 2:
        setChildren({
          type: "Bambini",
          number,
        });
        break;
      case 3:
        setNewbors({
          type: "Neonati",
          number,
        });
        break;
      default:
        
        break;
    }
    setConfirmVisitors(adults, children, newborns);
  }, [adults, children, newborns]);
  
  useEffect(() => setOpenDialog(props.openDialog), [props.openDialog]);

  // useEffect(() => console.log(confirmVisitors), [confirmVisitors]);

  const visitors = () => {
    onHide();
  };

  const onHide = () => {
    props.onHide();
    setOpenDialog(false);
  };

  // const setVisitors = (type, number) => {
  //   switch (type) {
  //     case 1:
  //       setAdults({
  //         type: "Adulti",
  //         number,
  //       });
  //       handlerVisitors();
  //       break;
  //     case 2:
  //       setChildren({
  //         type: "Bambini",
  //         number,
  //       });
  //       break;
  //     case 3:
  //       setNewbors({
  //         type: "Neonati",
  //         number,
  //       });
  //       break;
  //     default:
  //       setAdults();
  //       break;
  //   }
  // };

  return (
    <Dialog
      header="Ospiti"
      visible={openDialog}
      style={{ width: "30vw" }}
      footer={DialogVisitorsFooter}
      onHide={onHide}
      confirmVisitors={visitors}
    >
      <div className="flex flex-column">
        {visitorsTypes.map((visitorType) => (
          <div
            key={visitorType.id}
            className="flex align-items-center justify-content-between mb-4"
          >
            <div className="flex flex-column">
              <div className={style.bold}>{visitorType.type}</div>
              <div>{visitorType.description}</div>
            </div>
            <Counter
              setVisitors={(number) => handlerVisitors(visitorType.id, number)}
              totalVisitors={totalVisitors}
            />
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default DialogVisitors;
