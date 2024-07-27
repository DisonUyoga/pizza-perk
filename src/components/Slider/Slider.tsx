"use client";

import Image from "next/image";
import cn from "clsx";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import s from "./Slider.module.css";

import img1 from "@/assets/slide1.png";
import img2 from "@/assets/slide2.png";
import img3 from "@/assets/slide2.png";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: img1,
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in NY",
    image: img2,
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: img3,
  },
];

interface Props {
  className?: string;

  variant?: "default" | "slim" | "simple";
}

const Slider: FC<Props> = ({ className, variant }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const sliderClassName = cn(s.slider_container, {});

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      5000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn(s.slider_container)}>
      {/* TEXT CONTAINER */}
      <div className={s.slider_hero_header}>
        <h1
          className={cn(s.slider_header)}
          data-aos="zoom-in-up"
          data-aos-duration="2000"
        >
          {data[currentSlide].title}
        </h1>
        <Button
          as={motion.button}
          variant="solid"
          bg="#FF9C01"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={s.offer_title}
          data-aos="zoom-out-up"
          data-aos-duration="1500"
          onClick={() => router.push("/menu")}
        >
          Menu
        </Button>
        {/* <Button variant="naked">Order Now</Button> */}
      </div>
      {/* IMAGE CONTAINER  */}
      <div
        className="flex-1 w-full relative"
        data-aos="fade-left"
        data-aos-duration="1500"
      >
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Slider;
