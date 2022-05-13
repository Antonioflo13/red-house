import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

import axios from "axios";

import moment from "moment";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Sidebar } from "primereact/sidebar";

import styles from "./styles/Dashboard.module.scss";

import ReservationsManagment from "../components/ReservationsManagment";
import PricesManagment from "../components/PricesManagment";

const Dasboard = () => {
  const [reservationsInfo, setReservationsInfo] = useState([]);
  const [prices, setPrices] = useState(null);
  const [isPM, setisPM] = useState(false);
  const [totalReservationThisMonth, setTotalReservationThisMonth] = useState(0);
  const [showPricesManagment, setShowPricesManagment] = useState(false);
  const [showReservationsManagment, setShowReservationsManagment] =
    useState(true);
  const [visibleLeft, setVisibleLeft] = useState(false);

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

  const getPrices = () => {
    axios.get("http://localhost:3001/searchProductPrices").then((response) => {
      setPrices(response.data);
    });
  };

  const searchReservationsInfo = () => {
    setReservationsInfo([]);
    getReservationsInfo();
    setTotalReservationThisMonth(0);
  };

  const getHour = () => {
    if (moment().format("LT").includes("PM")) setisPM(true);
  };

  const showPage = (page) => {
    switch (page) {
      case "PricesManagment":
        setShowPricesManagment(true);
        setShowReservationsManagment(false);
        getPrices();
        break;
      case "ProductManagment":
        setShowPricesManagment(false);
        setShowReservationsManagment(true);
        searchReservationsInfo();
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.bgMain}>
      <Sidebar
        className={styles.sidebar}
        visible={visibleLeft}
        onHide={() => setVisibleLeft(false)}
      ></Sidebar>
      <div className={styles.container}>
        <div className={styles.sideMenu}>
          <Button
            icon="pi pi-arrow-right"
            onClick={() => setVisibleLeft(true)}
            className={`mr-2 ${styles.sidebarButton}`}
          />
          <Card className={styles.cardSideMenu}>
            <div className={styles.sideMenuProfile}>
              {!isPM ? "Buongiorno" : "Buonasera"}, {fullName}
            </div>
            <div className={styles.sideMenuReservationInfo}>
              Le prenotazioni per {thisMonth}{" "}
              <span>{totalReservationThisMonth}</span>
            </div>
            <div className={styles.sideMenuButton}>
              <Button
                type="button"
                label="Reservations"
                className="p-button-md p-button-danger p-button-text pl-0 py-1 w-full"
                onClick={() => showPage("ProductManagment")}
              />
              <Button
                type="button"
                label="Edit prices"
                className="p-button-md p-button-danger p-button-text pl-0 py-1 w-full"
                onClick={() => showPage("PricesManagment")}
              />
              <Button
                type="button"
                label="Edit product"
                className="p-button-md p-button-danger p-button-text pl-0 py-1 w-full"
                onClick={() => showPage("PricesManagment")}
              />
            </div>
          </Card>
        </div>
        <div className={styles.main}>
          <Card className={styles.cardMain}>
            {showReservationsManagment && (
              <ReservationsManagment
                getReservationsInfo={searchReservationsInfo}
                reservationsInfo={reservationsInfo}
              />
            )}
            {showPricesManagment && (
              <PricesManagment getPrices={getPrices} prices={prices} />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
