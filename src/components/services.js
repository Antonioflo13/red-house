import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Hairdryer } from "../assets/icon/hairdryer.svg";
import { ReactComponent as Fridge } from "../assets/icon/fridge.svg";
import { ReactComponent as Oven } from "../assets/icon/oven.svg";
import { ReactComponent as AirConditioner } from "../assets/icon/air-conditioner.svg";
import { ReactComponent as Tv } from "../assets/icon/tv-screen.svg";
import { ReactComponent as Kitchen } from "../assets/icon/kitchen.svg";

import styles from "./styles/Services.module.scss";

const Services = () => {
  const footer = (
    <span>
      <Button
        label="Mostra altri servizi"
        className="p-button-sm p-button-outlined p-button-secondary"
      />
    </span>
  );

  return (
    <Card title="Cosa troverai" className={`shadow-8`} footer={footer}>
      <div className={`${styles.services} flex`}>
        <div className="m-1">
          <div className="m-2">
            <Kitchen className="mr-2" />
            <span>Cucina</span>
          </div>
          <div className="flex align-items-center m-2">
            <Hairdryer className="mr-2" />
            <span>Asciugacapelli</span>
          </div>
          <div className="flex align-items-center m-2">
            <Oven className="mr-2" />
            <span>Forno</span>
          </div>
          <div className="m-2">
            <FontAwesomeIcon icon={faWifi} className="mr-2" />
            <span>Wi-fi</span>
          </div>
          <div className="m-2">
            <Tv className="mr-2" />
            <span>TV</span>
          </div>
        </div>
        <div className="m-1">
          <div className="flex align-items-center m-2">
            <Fridge className="mr-2" />
            <span>Frigorifero</span>
          </div>
          <div className="flex align-items-center m-2">
            <AirConditioner className="mr-2" />
            <span>Aria condizionata</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Services;
