"use client";
import React from "react";
import Slider from "react-slick";
import { Box, Image } from "@chakra-ui/react";
import { Tables } from "@/database.types";
import ProductImage from "./ProductImage";
import { pizzas } from "@/data";
import PriceCard from "./PriceCard";
import Link from "next/link";

interface CarouselProps {
  products: Tables<"products">[];
}
const HeroSlider = ({ products }: CarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Box width="100%" height={["310px", "410px"]} overflow="hidden">
      <Slider {...settings}>
        {products.map((src, index) => (
          <Link
            key={index}
            href={`/product/${src.id}`}
            data-aos="zoom-in-up"
            data-aos-duration="2000"
          >
            <Box height={["300px", "400px"]} position="relative">
              <ProductImage
                fallback={pizzas[0].img as string}
                path={src.image as string}
              />
              <Box position={"absolute"} left={2} top={0} w={"90%"}>
                <PriceCard product={src} />
              </Box>
            </Box>
          </Link>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroSlider;
