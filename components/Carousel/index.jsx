import React from "react";
import { Carousel, Image } from "react-bootstrap";

const HomeCarousel = ({message}) => {
  return (
    <div className="banner">
      <h1 className="bannerHeading">{message}</h1>
    </div>
  );
};

export default HomeCarousel;
