import React from "react";
import { Carousel } from "@material-tailwind/react";

function CarouselProduct({ images, imageCover }) {
  return (
    <Carousel
      className="rounded-none col-span-3"
      autoplay={true}
      loop={true}
      autoplayDelay={4000}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-4 cursor-pointer  rounded-none transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}>
      <img
        src={"http://localhost:8000/products/" + imageCover}
        alt="image 2"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}

export default CarouselProduct;
