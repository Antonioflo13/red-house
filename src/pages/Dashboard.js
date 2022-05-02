import { Card } from "primereact/card";

import styles from "./Dashboard.module.css";

const Dasboard = () => {
  const fullName = localStorage.getItem("fullName");
  return (
    <div className={styles.bgMain}>
      <div className={styles.container}>
        <div className={styles.sideMenu}>
          <Card className={styles.cardSideMenu}>
            <div>Ciao, {fullName}</div>
          </Card>
        </div>
        <div className={styles.main}>
          <Card className={styles.cardMain}></Card>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
