import style from "./grid.module.css";

const grid = () => {
  const images = [
    {
      id: 1,
      size: 'lg',
      src: "https://i0.wp.com/www.giacomocusano.com/wp-content/uploads/2016/07/coastal-wash-web.jpg?fit=1024%2C682&ssl=1",
    },
    {
      id: 2,
      size: 'lg',
      src: "https://www.addlance.com/blog/wp-content/uploads/2019/04/immagini-da-scaricare.jpg",
    },
    {
      id: 3,
      size: 'md',
      src: "https://www.artemedialab.it/wp-content/uploads/2019/04/immagini-sfondo-1-700x400.jpg",
    },
    {
      id: 4,
      size: 'md',
      src: "https://www.frasimania.it/wp-content/uploads/2020/11/immagini-mare.jpg",
    },
    {
      id: 5,
      size: 'lg',
      src: "https://www.nonsprecare.it/wp-content/uploads/2013/12/immagini-natura-animali-piu-belle-ultimi-dieci-anni-26.jpg",
    },
  ];
  return (
    <div className={style.container}>
      {images.map((image) => (
        <div className={`${style.imageContainer} ${image.size === 'lg' ? style.span2x : style.span1x} `}>
          <img className={style.img} key={image.id} src={image.src} alt="" />
        </div>
      ))}
    </div>
  );
};

export default grid;
