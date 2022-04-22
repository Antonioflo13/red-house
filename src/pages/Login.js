import React, { useEffect, useState } from "react";

import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import { Card } from "primereact/card";

import LoginPanel from "../components/LoginPanel";

import Logo from "../assets/img/Logo.png";
import styles from "./Login.module.css";

const Login = () => {
  const reservationsCollectionRef = collection(db, "reservations");
  //   const getInfoClient = async () => {
  //     const data = await getDocs(reservationsCollectionRef);
  //     const infoClient = data.docs.find((reservation) => {
  //       return (
  //         reservation.data().startReservation.seconds
  //       );
  //     });
  //     setClient(infoClient.data());
  //   };

  //   useEffect(() => {
  //     getInfoClient();
  //   }, []);
  return (
    <div className={styles.bgMain}>
      <div className={styles.container}>
        <div className={styles.containerLoginCard}>
          <Card className={styles.loginCard}>
            <img src={Logo} alt={Logo} className={styles.imageCard} />
            <LoginPanel />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
