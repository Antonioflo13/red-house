import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={`${styles.header}, shadow-3`}>
      <div className={styles.container}>
        <div>
          <Link className={styles.link} to="/">
            <h2 className={styles.h1}>Red House</h2>
          </Link>
        </div>
        <div className={styles.links}>
          <Link className={styles.h1} to="/">
            La Struttura
          </Link>
          <Link className={styles.h1} to="/">
            Dove Siamo
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
