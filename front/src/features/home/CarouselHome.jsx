import { Button, Carousel, Typography } from "@material-tailwind/react";

export default function CarouselHome() {
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
        src="https://img.freepik.com/vecteurs-premium/modele-tete-blog-style-conceptwatercolor-fete-du-travail_75071-2114.jpg?w=1800"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <div className="relative h-full w-full">
        <img
          src="https://img.freepik.com/vecteurs-libre/couverture-facebook-construction-design-plat_23-2149596576.jpg?w=1480"
          alt="image 1"
          className="h-full w-full object-cover"
        />
      </div>
      <img
        src="https://img.freepik.com/vecteurs-premium/modele-tete-blog-style-conceptwatercolor-fete-du-travail_75071-2114.jpg?w=1800"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://img.freepik.com/vecteurs-libre/modele-banniere-horizontale-degradee-pour-celebration-fete-du-travail_23-2150202138.jpg?w=1480"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}

  // <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/35">
  //   <div className="w-3/4 text-center md:w-2/4">
  //     <Typography
  //       variant="h1"
  //       color="white"
  //       className="mb-4 text-3xl md:text-4xl lg:text-5xl">
  //       The Beauty of Nature
  //     </Typography>
  //     <Typography variant="lead" color="white" className="mb-12 opacity-80">
  //       It is not so much for its beauty that the forest makes a claim upon
  //       men&apos;s hearts, as for that subtle something, that quality of air
  //       that emanation from old trees, that so wonderfully changes and renews a
  //       weary spirit.
  //     </Typography>
  //     <div className="flex justify-center gap-2">
  //       <Button size="lg" color="white">
  //         Explore
  //       </Button>
  //       <Button size="lg" color="white" variant="text">
  //         Gallery
  //       </Button>
  //     </div>
  //   </div>
  // </div>;