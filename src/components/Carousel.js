import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import image1 from "../assets/img/carouselImages/img1.jpeg";
import image2 from "../assets/img/carouselImages/img2.jpeg";
import image3 from "../assets/img/carouselImages/img3.jpeg";
import image4 from "../assets/img/carouselImages/img4.jpeg";
import image5 from "../assets/img/carouselImages/img5.jpeg";
import image6 from "../assets/img/carouselImages/img6.jpeg";
import image7 from "../assets/img/carouselImages/img7.jpeg";
import image8 from "../assets/img/carouselImages/img8.jpeg";
import image9 from "../assets/img/carouselImages/img9.jpeg";

const Carousel = () => {
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

  return (
    <Splide
      options={{
        type: "fade",
        rewind: true,
        width: "100vw",
        heightRatio: 0.35,
        autoplay: true,
        resetProgress: true,
        pauseOnHover: true,
        interval: 4000,
        arrows: false,
        pagination: false,
      }}
    >
      {images.map((image) => {
        return (
          <SplideSlide key={image.id}>
            <img
              style={{
                width: "100%",
                height: "100vh",
                objectFit: "cover",
                objectPosition: image.postion,
              }}
              src={`${image.url}`}
              alt="image1"
            />
          </SplideSlide>
        );
      })}
    </Splide>
  );
};
export default Carousel;
