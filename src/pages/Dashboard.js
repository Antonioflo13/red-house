import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase-config";

import moment from "moment";

import { Card } from "primereact/card";

import styles from "./styles/Dashboard.module.scss";

import ReservationManagment from "../components/ReservationManagment";

const Dasboard = () => {
  const [reservationsInfo, setReservationsInfo] = useState([]);
  useEffect(() => getReservationsInfo(), []);

  const fullName = localStorage.getItem("fullName");
  const thisMonth = moment().format("MMM");

  const reservationsCollectionRef = collection(db, "reservations");

  const getReservationsInfo = async () => {
    const data = await getDocs(reservationsCollectionRef);
    data.docs.forEach((reservation) => {
      setReservationsInfo((oldReservationsInfo) => [
        ...oldReservationsInfo,
        reservation.data(),
      ]);
    });
  };
  return (
    <div className={styles.bgMain}>
      <div className={styles.container}>
        <div className={styles.sideMenu}>
          <Card className={styles.cardSideMenu}>
            <div>Ciao, {fullName}</div>
            <div>
              Le prenotazioni per {thisMonth} {reservationsInfo.length}
            </div>
          </Card>
        </div>
        <div className={styles.main}>
          <Card className={styles.cardMain}>
            <ReservationManagment reservationsInfo={reservationsInfo} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
