import { Card } from "primereact/card";
import { Galleria } from "primereact/galleria";

import image1 from "../assets/img/carouselImages/img1.jpeg";
import image2 from "../assets/img/carouselImages/img2.jpeg";
import image3 from "../assets/img/carouselImages/img3.jpeg";
import image4 from "../assets/img/carouselImages/img4.jpeg";
import image5 from "../assets/img/carouselImages/img5.jpeg";
import image6 from "../assets/img/carouselImages/img6.jpeg";
import image7 from "../assets/img/carouselImages/img7.jpeg";
import image8 from "../assets/img/carouselImages/img8.jpeg";
import image9 from "../assets/img/carouselImages/img9.jpeg";

const HomeDetails = () => {
  const images = [
    {
      id: "1",
      url: image1,
      postion: "center",
    },
    {
      id: "2",
      url: image2,
      postion: "center",
    },
    {
      id: "3",
      url: image3,
      postion: "center",
    },
    {
      id: "4",
      url: image4,
      postion: "center",
    },
    {
      id: "5",
      url: image5,
      postion: "center",
    },
    {
      id: "6",
      url: image6,
      postion: "center",
    },
    {
      id: "7",
      url: image7,
      postion: "center",
    },
    {
      id: "8",
      url: image8,
      postion: "center",
    },
    {
      id: "9",
      url: image9,
      postion: "center",
    },
  ];

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  const itemTemplate = (item) => {
    <img
      src={item.url}
      alt={item.alt}
      style={{ width: "100%", display: "block" }}
    />;
  };

  const thumbnailTemplate = (item) => {
    <img src={item.url} alt={item.alt} style={{ display: "block" }} />;
  };

  const caption = (item) => {
    <div>
      <h4 className="mb-2">{item.url}</h4>
      <p>{item.alt}</p>
    </div>;
  };

  return (
    <Card title="Red House in dettaglio" className={`shadow-8`}>
      <div>
        <Galleria
          value={images}
          responsiveOptions={responsiveOptions}
          numVisible={5}
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
          caption={caption}
          style={{ maxWidth: "640px" }}
        />
      </div>
    </Card>
  );
};

export default HomeDetails;
