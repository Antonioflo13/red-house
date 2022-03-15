import { GMap } from "primereact/gmap";

const LocationMap = () => {
  const options = {
    center: { lat: 40.733614, lng: 17.579342 },
    zoom: 17,
  };


  return (
    <GMap options={options} style={{ width: "100%", minHeight: "320px" }} />
  );
};

export default LocationMap;
