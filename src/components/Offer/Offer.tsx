"use client";
// import Image from "next/image";
import { useEffect, useState } from "react";

import ProductImage from "@/components/ProductImage";
import { calcDis } from "@/lib/calcDis";
import { Tables } from "@/type";
import { Box, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import s from "./Offer.module.css";

interface OfferProps {
  delivery: Tables<"delivery">[];
  products: Tables<"products">[];
}
const Offer = ({ delivery, products }: OfferProps) => {
  const [prodctOnOffer, setProductOnOffer] =
    useState<Tables<"products"> | null>();
  const router = useRouter();

  useEffect(() => {
    function checkProductWithHighestDiscount(Text: Tables<"products">[]) {
      if (!Text) return;
      const item = Text.map((i) => {
        const percDisc = [];
        if (i.discount && i.discount > i.price) {
          const dis = calcDis(i.price, i.discount);
          if (dis) {
            percDisc.push({ id: i.id, percentage: dis });
          }
        }
        return percDisc;
      });
      if (!item) return;
      objectWithHighestPercentage(item.flat());
      return item;
    }
    checkProductWithHighestDiscount(products);
  }, [products]);

  function objectWithHighestPercentage(
    d: { id: number; percentage: number }[]
  ) {
    if (!d) return;
    const percentages = d.map((obj) => obj.percentage);
    const maxPercentage = Math.max(...percentages);
    const objectsWithMaxPercentage = d.filter(
      (obj) => obj.percentage === maxPercentage
    );
    const productWithHighestPercentage = products.filter(
      (Text) => Text.id === objectsWithMaxPercentage[0].id
    );
    if (!productWithHighestPercentage) return;
    setProductOnOffer(productWithHighestPercentage[0]);
  }

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      gap={0}
      p={0}
      m="0"
      maxW="1400px"
    >
      <GridItem position={"relative"} w={"100%"}>
        <Image
          src="/offerBg1.jpg"
          alt="Hero Image 1"
          borderRadius="md"
          aspectRatio={1}
          objectFit="cover"
          width="100%"
          height={{ base: "300px", md: "400px" }}
          className="opacity-20"
        />
        <Box
          flexDirection={"column"}
          position="absolute"
          w={"100%"}
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg=""
          p={4}
          borderRadius="md"
          gap={4}
        >
          <Heading
            as={"h1"}
            fontSize={["4xl", "6xl"]}
            color={"#fff"}
            data-aos="zoom-out-up"
            data-aos-duration="2000"
          >
            PizzaPerk
          </Heading>
          <Text
            color={"#f3eeee"}
            textAlign={"center"}
            data-aos="zoom-out-up"
            data-aos-duration="2000"
          >
            &quot;Discover PizzaPerk: Your Crave-Worthy Shortcut to Delicious
            Pizza Bliss!&quot;
          </Text>
        </Box>
      </GridItem>
      <GridItem width={"100%"}>
        <Box
          className={s.hero_img}
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          // width={"100%"}
          aspectRatio={[3 / 2, "auto"]}
        >
          <ProductImage
            fallback="/offerProduct.png"
            path={(prodctOnOffer?.image as string) || "/offerProduct.png"}
          />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Offer;
