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

  const images = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    // Add more images as needed
  ];

  return (
    <Box width="100%" height="500px" overflow="hidden">
      <Slider {...settings}>
        {products.map((src, index) => (
          <Link href={`/product/${src.id}`}>
            <Box key={index} height="400px" position="relative">
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