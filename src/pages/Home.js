import Carousel from "../components/Carousel.js";
import CardBooking from "../components/CardBooking";
import Services from "../components/services";
import HomeDetails from "../components/HomeDetails.js";
import LocationMap from "../components/LocationMap";
import Masonry from "../components/Masonry.js";

import { ParallaxBanner } from "react-scroll-parallax";

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
        <div className={styles.homeDetails}>
          <HomeDetails />
        </div>
        <div className={styles.locationMap}>
          {/* <LocationMap /> */}
        </div>
        <div className={styles.parallax}>
          <ParallaxBanner
            style={{
              height: "100vh",
            }}
            layers={[
              {
                image:
                  "https://www.giovannicarrieri.com/photography/italy/ostuni/ostuni-via-panoramica.jpg",
                speed: -15,
              },
            ]}
            className="aspect-[2/1]"
          ></ParallaxBanner>
        </div>
        <div className={styles.masonry}>
          <Masonry />
        </div>
      </div>
    </div>
  );
};

export default Home;
