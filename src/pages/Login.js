import { Card } from "primereact/card";

import LoginPanel from "../components/LoginPanel";

import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.bgMain}>
      <div className={styles.container}>
        <div className={styles.containerLoginCard}>
          <Card className={styles.loginCard}>
            <LoginPanel />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
