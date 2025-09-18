"use client";

import Generate from "@/components/Generate/Generate";
import { AngleDownIcon } from "@/components/icons";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const slides = [products[products.length - 1], ...products, products[0]];
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemWidth, setItemWidth] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (itemRef.current) {
        setItemWidth(itemRef.current.offsetWidth + 12);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === 0) {
      setCurrentIndex(products.length);
    } else if (currentIndex === slides.length - 1) {
      setCurrentIndex(1);
    }
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
  };

  return (
    <div className="font-sans my-10 md:my-14">
      <div>
        <div
          className="relative w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex ${
              isTransitioning
                ? "transition-transform duration-500 ease-in-out"
                : ""
            }`}
            style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((product, index) => (
              <div
                key={index}
                ref={itemRef}
                className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full md:w-[600px] lg:w-[800px] rounded-[16px] text-white flex-shrink-0 mr-3 lg:mr-8 overflow-hidden"
              >
                <div className="grid grid-cols-3 w-full h-full">
                  {product.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt=""
                      width={400}
                      height={400}
                      className="object-cover h-full w-full"
                    />
                  ))}
                </div>

                <div className="absolute rounded-[16px] inset-0 flex flex-col p-5 md:p-8 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <h6 className="text-[8px] sm:text-[10px] md:text-xs">
                    {product.title}
                  </h6>
                  <h1 className="text-[35px] sm:text-[60px] md:text-[70px] lg:text-[80px] font-bold text-center mt-8 sm:mt-10 md:mt-16">
                    {product.name}
                  </h1>
                  <div className="mt-auto flex flex-col sm:flex-row justify-between items-end">
                    <div className="w-full sm:w-[60%] lg:w-[50%]">
                      <h2 className="text-[16px] sm:text-xl md:text-[22px] lg:text-2xl font-medium">
                        {product.descriptionTitle}
                      </h2>
                      <p className="text-[10px] text-xs md:text-[13px] lg:text-sm mt-1 lg:mt-2">
                        {product.description}
                      </p>
                    </div>
                    <button className="bg-white h-fit font-semibold text-[10px] sm:text-xs md:text-[13px] lg:text-sm text-gray-900 hover:bg-white/80 px-4 py-2 rounded-4xl mt-1 sm:mt-0">
                      {product.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Carousel Controls */}
        <div className="flex items-center mt-3 relative">
          <div className="flex gap-2 absolute bottom-[50%] translate-y-[50%] left-[12%] translate-x-[12%] sm:left-[30%] sm:translate-x-[30%] md:left-[35%] md:translate-x-[35%]  lg:left-[40%] lg:translate-x-[40%] ">
            {products.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-[7px] h-[7px] rounded-full cursor-pointer ${
                  index === currentIndex ? "bg-gray-800" : "bg-gray-400"
                }`}
              ></div>
            ))}
          </div>

          <div className="flex gap-4 ml-auto">
            <button
              onClick={prevSlide}
              className="bg-[#eeeeee] hover:bg-[#e9e9e9] h-8 w-8 rounded-full flex items-center justify-center"
            >
              <AngleDownIcon className="rotate-90 w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-[#eeeeee] hover:bg-[#e9e9e9] h-8 w-8 rounded-full flex items-center justify-center"
            >
              <AngleDownIcon className="rotate-270 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <Generate />
    </div>
  );
}

const products = [
  {
    id: 1,
    images: [
      "/assets/images/model2.jpg",
      "/assets/images/mount.jpg",
      "/assets/images/model1.jpg",
    ],
    title: "NEW IMAGE MODEL",
    name: "WAN 2.2",
    descriptionTitle: "WAN 2.2 Image generation",
    description:
      "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultrarealistic textures.",
    buttonText: "Try WAN 2.2",
  },
  {
    id: 2,
    images: [
      "/assets/images/anime1.jpg",
      "/assets/images/mount.jpg",
      "/assets/images/model5.jpg",
    ],
    title: "Open Source MODEL",
    name: "Open Source",
    descriptionTitle: "Flux.1 Krea",
    description:
      "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultrarealistic textures.",
    buttonText: "Try Open Source",
  },
  {
    id: 3,
    images: [
      "/assets/images/model2.jpg",
      "/assets/images/mount.jpg",
      "/assets/images/model1.jpg",
    ],
    title: "NEW IMAGE MODEL",
    name: "WAN 2.2",
    descriptionTitle: "WAN 2.2 Image generation",
    description:
      "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultrarealistic textures.",
    buttonText: "Try WAN 2.2",
  },
  {
    id: 4,
    images: [
      "/assets/images/anime1.jpg",
      "/assets/images/mount.jpg",
      "/assets/images/model5.jpg",
    ],
    title: "Open Source MODEL",
    name: "Open Source",
    descriptionTitle: "Flux.1 Krea",
    description:
      "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultrarealistic textures.",
    buttonText: "Try Open Source",
  },
  {
    id: 5,
    images: [
      "/assets/images/model2.jpg",
      "/assets/images/mount.jpg",
      "/assets/images/model1.jpg",
    ],
    title: "NEW IMAGE MODEL",
    name: "WAN 2.2",
    descriptionTitle: "WAN 2.2 Image generation",
    description:
      "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultrarealistic textures.",
    buttonText: "Try WAN 2.2",
  },
  {
    id: 6,
    images: [
      "/assets/images/anime1.jpg",
      "/assets/images/mount.jpg",
      "/assets/images/model5.jpg",
    ],
    title: "NEW IMAGE MODEL",
    name: "WAN 2.2",
    descriptionTitle: "WAN 2.2 Image generation",
    description:
      "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultrarealistic textures.",
    buttonText: "Try WAN 2.2",
  },
  {
    id: 7,
    images: [
      "/assets/images/model2.jpg",
      "/assets/images/mount.jpg",
      "/assets/images/model1.jpg",
    ],
    title: "Open Source MODEL",
    name: "Open Source",
    descriptionTitle: "Flux.1 Krea",
    description:
      "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultrarealistic textures.",
    buttonText: "Try Open Source",
  },
  {
    id: 8,
    images: [
      "/assets/images/anime1.jpg",
      "/assets/images/mount.jpg",
      "/assets/images/model5.jpg",
    ],
    title: "NEW IMAGE MODEL",
    name: "WAN 2.2",
    descriptionTitle: "WAN 2.2 Image generation",
    description:
      "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultrarealistic textures.",
    buttonText: "Try WAN 2.2",
  },
  {
    id: 9,
    images: [
      "/assets/images/model2.jpg",
      "/assets/images/mount.jpg",
      "/assets/images/model1.jpg",
    ],
    title: "Open Source MODEL",
    name: "Open Source",
    descriptionTitle: "Flux.1 Krea",
    description:
      "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultrarealistic textures.",
    buttonText: "Try Open Source",
  },
  {
    id: 10,
    images: [
      "/assets/images/anime1.jpg",
      "/assets/images/mount.jpg",
      "/assets/images/model5.jpg",
    ],
    title: "NEW IMAGE MODEL",
    name: "WAN 2.2",
    descriptionTitle: "WAN 2.2 Image generation",
    description:
      "Generate complex images with the brand new and powerful WAN 2.2 model. Exceptional prompt adherence and ultrarealistic textures.",
    buttonText: "Try WAN 2.2",
  },
];
