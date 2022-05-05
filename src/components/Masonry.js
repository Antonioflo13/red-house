import { Parallax } from "react-scroll-parallax";

import style from "./styles/masonry.module.scss";

import image1 from "../assets/img/carouselImages/img1.jpeg";
import image2 from "../assets/img/carouselImages/img2.jpeg";
import image3 from "../assets/img/carouselImages/img3.jpeg";
import image4 from "../assets/img/carouselImages/img4.jpeg";
import image5 from "../assets/img/carouselImages/img5.jpeg";
import image6 from "../assets/img/carouselImages/img6.jpeg";
import image7 from "../assets/img/carouselImages/img7.jpeg";
import image8 from "../assets/img/carouselImages/img8.jpeg";
import image9 from "../assets/img/carouselImages/img9.jpeg";

const Masonry = () => {
  const images = [
    {
      id: "1",
      url: image1,
      size: "lg",
    },
    {
      id: "2",
      url: image2,
    },
    {
      id: "3",
      url: image3,
      size: "lg",
    },
    {
      id: "4",
      url: image4,
    },
    {
      id: "5",
      url: image5,
      size: "lg",
    },
    {
      id: "6",
      url: image6,
    },
    {
      id: "7",
      url: image7,
      size: "lg",
    },
    {
      id: "8",
      url: image8,
    },
    {
      id: "9",
      url: image9,
      size: "lg",
    },
  ];
  return (
    <div className={style.container}>
      {images.map((image) => (
        <div
          className={`${style.imageContainer} ${
            image.size === "lg" ? style.span2x : style.span1x
          } `}
          key={image.id}
        >
          <Parallax translateY={[-1, 1]} opacity={[-1, 10]} speed={5}>
            <img
              className={style.img}
              src={`${image.url}`}
              alt={`${image.url}`}
            />
          </Parallax>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
