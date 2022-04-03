import React, { Component } from "react";
import { Galleria } from "primereact/galleria";
import { Card } from "primereact/card";

import image1 from "../assets/img/carouselImages/img1.jpeg";
import image2 from "../assets/img/carouselImages/img2.jpeg";
import image3 from "../assets/img/carouselImages/img3.jpeg";
import image4 from "../assets/img/carouselImages/img4.jpeg";
import image5 from "../assets/img/carouselImages/img5.jpeg";
import image6 from "../assets/img/carouselImages/img6.jpeg";
import image7 from "../assets/img/carouselImages/img7.jpeg";
import image8 from "../assets/img/carouselImages/img8.jpeg";
import image9 from "../assets/img/carouselImages/img9.jpeg";

import styles from "./HomeDetails.module.css";

export default class HomeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: null,
    };

    this.images = [
      {
        itemImageSrc: image1,
        thumbnailImageSrc: image1,
        title: "Ingresso",
      },
      {
        itemImageSrc: image2,
        thumbnailImageSrc: image2,
      },
      {
        itemImageSrc: image3,
        thumbnailImageSrc: image3,
      },
      {
        itemImageSrc: image4,
        thumbnailImageSrc: image4,
      },
      {
        itemImageSrc: image5,
        thumbnailImageSrc: image5,
      },
      {
        itemImageSrc: image6,
        thumbnailImageSrc: image6,
      },
      {
        itemImageSrc: image7,
        thumbnailImageSrc: image7,
      },
      {
        itemImageSrc: image8,
        thumbnailImageSrc: image8,
      },
      {
        itemImageSrc: image9,
        thumbnailImageSrc: image9,
      },
    ];

    this.responsiveOptions = [
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

    this.itemTemplate = this.itemTemplate.bind(this);
    this.thumbnailTemplate = this.thumbnailTemplate.bind(this);
  }

  componentDidMount() {
    this.setState({ images: this.images });
  }

  itemTemplate(item) {
    return (
      <img src={item.itemImageSrc} alt={item.alt} style={{ width: "100%" }} />
    );
  }

  thumbnailTemplate(item) {
    return (
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        className={styles.thumbnailTemplate}
      />
    );
  }

  caption(item) {
    return (
      <React.Fragment>
        <h4 className="mb-2">{item.title}</h4>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <div className="card">
          <Card title="Red House in dettaglio" className={`shadow-8`}>
            <Galleria
              value={this.state.images}
              responsiveOptions={this.responsiveOptions}
              numVisible={5}
              style={{ maxWidth: "640px" }}
              item={this.itemTemplate}
              thumbnail={this.thumbnailTemplate}
              caption={this.caption}
              showIndicatorsOnItem={true}
            />
          </Card>
          ;
        </div>
      </div>
    );
  }
}
