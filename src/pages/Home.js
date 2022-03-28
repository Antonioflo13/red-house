import Carousel from "../components/Carousel.js";
import CardBooking from "../components/CardBooking";
import Services from "../components/services";
import Masonry from "../components/Masonry.js";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.bgHome}>
      <div className={styles.container}>
        <div className={styles.carousel}>
          <Carousel />
        </div>
        <div className={styles.cardBookingContainer}>
          <CardBooking />
        </div>
        <div className={styles.services}>
          <Services />
        </div>
        <div className={styles.masonry}>
          <Masonry />
        </div>
      </div>
    </div>
  );
};

export default Home;
