import styles from "./Home.module.css";

import Carousel from "../components/Carousel.js";
import CardBooking from "../components/CardBooking";
import Services from "../components/services";

const Home = () => {
  return (
    <div>
      <Carousel />
      <div style={{ position: "relative" }}>
        <div className={styles.container}>
          <div className={styles.home}>
            <div style={{ position: "absolute", top: -30 }}>
              <CardBooking />
            </div>
            <div>
              <Services />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
