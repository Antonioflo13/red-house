import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

import moment from "moment";

import { Card } from "primereact/card";

import styles from "./styles/Dashboard.module.scss";

import ReservationsManagment from "../components/ReservationsManagment";

const Dasboard = () => {
  const [reservationsInfo, setReservationsInfo] = useState([]);
  const [isPM, setisPM] = useState(false);
  const [totalReservationThisMonth, setTotalReservationThisMonth] = useState(0);
  useEffect(() => getReservationsInfo(), []);
  useEffect(() => getHour(), []);

  const fullName = localStorage.getItem("fullName");
  const thisMonth = moment().format("MMM");

  const reservationsCollectionRef = collection(db, "reservations");

  const getReservationsInfo = async () => {
    const data = await getDocs(reservationsCollectionRef);
    data.docs.forEach((reservation) => {
      let a = reservation.data();
      a.id = reservation.id;
      setReservationsInfo((oldReservationsInfo) => [...oldReservationsInfo, a]);
      const reservationMonthYear = moment(
        reservation.data().startReservation.seconds,
        "X"
      ).format("M/YYYY");
      const monthYear = moment().format("M/YYYY");
      if (reservationMonthYear === monthYear)
        setTotalReservationThisMonth(
          (oldTotalReservationThisMonth) => oldTotalReservationThisMonth + 1
        );
    });
  };

  const search = () => {
    setReservationsInfo([]);
    getReservationsInfo();
    setTotalReservationThisMonth(0);
  };

  const getHour = () => {
    if (moment().format("LT").includes("PM")) setisPM(true);
  };

  return (
    <div className={styles.bgMain}>
      <div className={styles.container}>
        <div className={styles.sideMenu}>
          <Card className={styles.cardSideMenu}>
            <div className={styles.sideMenuProfile}>
              {!isPM ? "Buongiorno" : "Buonasera"}, {fullName}
            </div>
            <div className={styles.sideMenuReservationInfo}>
              Le prenotazioni per {thisMonth}{" "}
              <span>{totalReservationThisMonth}</span>
            </div>
          </Card>
        </div>
        <div className={styles.main}>
          <Card className={styles.cardMain}>
            <ReservationsManagment
              getReservationsInfo={search}
              reservationsInfo={reservationsInfo}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
