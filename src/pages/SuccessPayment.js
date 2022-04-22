import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";

import Logo from "../assets/img/Logo.png";
import styles from "./SuccessPayment.module.css";

const SuccessPayment = () => {
  const reservationsCollectionRef = collection(db, "reservations");
  const [client, setClient] = useState(null);
  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  let query = useQuery();
  const getInfoClient = async () => {
    let startReservation = Number(query.get("sr")) / 1000;
    let endReservation = Number(query.get("er")) / 1000;

    const data = await getDocs(reservationsCollectionRef);
    const infoClient = data.docs.find((reservation) => {
      return (
        reservation.data().startReservation.seconds === startReservation &&
        reservation.data().endReservation.seconds === endReservation
      );
    });
    setClient(infoClient.data());
  };

  useEffect(() => {
    getInfoClient();
  }, []);
  return (
    <div className={styles.bgMain}>
      <div className={styles.container}>
        <div className={styles.sucessPaymentCard}>
          {!client && (
            <Skeleton
              className={styles.paymentCard}
              width="100%"
              height="40vh"
            ></Skeleton>
          )}
          {client && (
            <Card className={styles.paymentCard}>
              <img src={Logo} alt={Logo} className={styles.imageCard} />
              <div className={styles.titleCard}>
                Ti Auguriamo Buone Vacanze!
              </div>
              <div className={styles.mainCard}>
                <div>
                  Grazie {client.fullName}! Il tuo soggiorno presso la struttura
                  è confermato.
                </div>
                <div>
                  A breve riceverai un'email di conferma all'indirizzo{" "}
                  <span>{client.email}</span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
