import React, { useMemo,useCallback, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

import style from "./DialogVisitors.module.css";

import Counter from "./Counter";
import DialogVisitorsFooter from "./DialogVisitorsFooter";

const DialogVisitors = (props) => {
  const { confirmVisitors, totalVisitors } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [isConfirmVisitors, setConfirmVisitors] = useState();
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

  useEffect(() => setOpenDialog(props.openDialog), [props.openDialog]);

  const visitors = () => {
    onHide();
  };

  const onHide = () => {
    props.onHide();
    setOpenDialog(false);
  };

  const a = useMemo(() => [], []);

  const setVisitors = useCallback((type, number) => {
    switch (type) {
      case 1:
        a.push({
          type: "Adulti",
          number,
        });
        break;
      case 2:
        a.push({
          type: "Bambini",
          number,
        });
        break;
      case 3:
        a.push({
          type: "Neonati",
          number,
        });
        break;
      default:
        break;
    }
    if (a?.type === 'Adulti') {
      setConfirmVisitors(a);
    }
  }, [a]);

  useEffect(() => {
    console.log(a);
  }, [a]);

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
              setVisitors={(number) => setVisitors(visitorType.id, number)}
              totalVisitors={totalVisitors}
            />
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default DialogVisitors;
