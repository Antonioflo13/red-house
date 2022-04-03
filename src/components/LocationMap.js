import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { GMap } from "primereact/gmap";
import { loadGoogleMaps, removeGoogleMaps } from "../js/GoogleMaps";

const LocationMap = () => {
  const [googleMapsReady, setGoogleMapsReady] = useState(false);
  const [overlays, setOverlays] = useState(null);
  const google = window.google;
  const options = {
    center: { lat: 40.733614, lng: 17.579342 },
    zoom: 17,
  };
  const onMapReady = (event) => {
    setOverlays([
      new google.maps.Marker({
        position: { lat: 40.734186, lng: 17.579608 },
        title: "Red house",
        icon: "https://img.icons8.com/flat-round/40/000000/home--v1.png",
      }),
    ]);
  };
  useEffect(() => {
    loadGoogleMaps(() => {
      setGoogleMapsReady(true);
    });

    return () => {
      removeGoogleMaps();
    };
  }, []);

  return (
    <Card title="Dove ti troverai" className={`shadow-8`}>
      <div>
        {googleMapsReady && (
          <GMap
            overlays={overlays}
            onMapReady={onMapReady}
            options={options}
            style={{ width: "100%", minHeight: "320px" }}
          />
        )}
      </div>
      <div className="font-bold mt-4">Ostuni, Puglia, Italia</div>
    </Card>
  );
};

export default LocationMap;
