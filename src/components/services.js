import { Card } from "primereact/card";
import LocationMap from "./LocationMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitchenSet, faTv, faWifi } from "@fortawesome/free-solid-svg-icons";

const Services = () => {
  return (
    <Card title="I nostri servizi" className={`shadow-8`}>
      <div>
        <h3>Cosa troverai</h3>
        <div>
          <FontAwesomeIcon icon={faKitchenSet} className="mr-2" />
          Cucina
        </div>
        <div>Asciugacapelli</div>
        <div>
          <FontAwesomeIcon icon="fa-solid fa-air-conditioner" />
          Forno
        </div>
        <div>
          <FontAwesomeIcon icon={faWifi} className="mr-2" />
          Wi-fi
        </div>
        <div>
          <FontAwesomeIcon icon={faTv} className="mr-2" />
          TV
        </div>
        <div>Frigorifero</div>
      </div>
      <LocationMap />
    </Card>
  );
};

export default Services;
