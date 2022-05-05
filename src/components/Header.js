import { Link } from "react-router-dom";

import Logo from "../assets/img/Logo.png";
import styles from "./styles/Header.module.scss";

const Header = () => {
  return (
    <header className={`${styles.header}, shadow-3`}>
      <div className={styles.container}>
        <div>
          <Link to="grid">
            <img src={Logo} alt={Logo} width={100} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
