import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const Carousel = () => {
  const images = [
    {
      id: "1",
      url: "https://www.sunshineluxuryrooms.it/wp-content/uploads/sites/258/2021/03/sunshine_luxury_rooms_ostuni_slide_04.jpg",
      postion: 'center'
    },
    {
      id: "2",
      url: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/156000/156816-Ostuni-Cathedral.jpg",
      postion: 'top'
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
