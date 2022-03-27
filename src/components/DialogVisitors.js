import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dialog } from "primereact/dialog";

import style from "./DialogVisitors.module.css";

import Counter from "./Counter";
import DialogVisitorsFooter from "./DialogVisitorsFooter";

const DialogVisitors = (props) => {
  const { totalVisitors } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmVisitors, setConfirmVisitors] = useState([]);
  const [children, setChildren] = useState(false);
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

  let visitorsArray = [];

  const checkIfexsist = () => {
    for (const visitorArray of visitorsArray) {
      if (visitorArray.type === "Bambini") {
        console.log(visitorArray.type);
        setChildren(true);
      }
    }
  };

  const handlerVisitors = useCallback(
    (visitorsArray, type, number) => {
      checkIfexsist();
      switch (type) {
        case 1:
          if (visitorsArray.length > 0) {
            for (const visitorArray of visitorsArray) {
              if (visitorArray.type === "Adulti") {
                visitorArray.number = number;
              }
            }
          } else {
            visitorsArray.push({
              type: "Adulti",
              number,
            });
          }
          break;
        case 2:
          console.log(children);
          if (!children) {
            console.log(false);
            visitorsArray.push({
              type: "Bambini",
              number,
            });
          }
          // if (children) {
          //   for (const visitorArray of visitorsArray) {
          //     if (visitorArray.type === "Bambini") {
          //       visitorArray.number = number;
          //     }
          //   }
          // }
          break;
        case 3:
          // if (visitorsArray.length > 0) {
          //   for (const visitorArray of visitorsArray) {
          //     if (visitorArray.type === "Neonati") {
          //       visitorArray.number = number;
          //     } else {
          //       visitorsArray.push({
          //         type: "Neonati",
          //         number,
          //       });
          //     }
          //   }
          // }
          break;
        default:
          console.log("there are no selected");
          break;
      }
    },
    [children, checkIfexsist]
  );

  useEffect(() => setOpenDialog(props.openDialog), [props.openDialog]);

  const visitors = () => {
    setConfirmVisitors(visitorsArray);
    console.log(visitorsArray);
    onHide();
  };

  const onHide = () => {
    props.onHide();
    setOpenDialog(false);
  };

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
              setVisitors={(number) =>
                handlerVisitors(visitorsArray, visitorType.id, number)
              }
              totalVisitors={totalVisitors}
            />
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default DialogVisitors;
