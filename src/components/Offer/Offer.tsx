"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CountDown from "../CountDown";

import s from "./Offer.module.css";
import { Tables } from "@/type";
import { calcDis } from "@/lib/calcDis";
import ProductImage from "@/components/ProductImage";
import Aos from "aos";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface OfferProps {
  delivery: Tables<"delivery">[];
  products: Tables<"products">[];
}
const Offer = ({ delivery, products }: OfferProps) => {
  const [prodctOnOffer, setProductOnOffer] =
    useState<Tables<"products"> | null>();
  const router = useRouter();

  useEffect(() => {
    function checkProductWithHighestDiscount(p: Tables<"products">[]) {
      if (!p) return;
      const item = p.map((i) => {
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
      (p) => p.id === objectsWithMaxPercentage[0].id
    );
    if (!productWithHighestPercentage) return;
    setProductOnOffer(productWithHighestPercentage[0]);
  }

  return (
    <div className={s.container}>
      {/* TEXT CONTAINER  */}
      <div className={s.child_container}>
        <h1
          className={s.offer_title}
          data-aos="zoom-out-up"
          data-aos-duration="2000"
        >
          PizzaPerk
        </h1>
        <p
          className={s.offer_hero_title}
          data-aos="zoom-out-up"
          data-aos-duration="2000"
        >
          &quot;Discover PizzaPerk: Your Crave-Worthy Shortcut to Delicious
          Pizza Bliss!&quot;
        </p>

        {delivery[0]?.countdown && <CountDown date={delivery[0]?.countdown} />}

        <Button
          as={motion.button}
          variant="solid"
          bg="#FF9C01"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={s.offer_title}
          data-aos="zoom-out-up"
          data-aos-duration="1500"
          onClick={() => router.push(`/product/${prodctOnOffer?.id}`)}
        >
          Order Now
        </Button>
      </div>
      {/* IMAGE CONTAINER  */}
      <div
        className={s.hero_img}
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
      >
        <ProductImage
          fallback="/offerProduct.png"
          path={(prodctOnOffer?.image as string) || "/offerProduct.png"}
        />
      </div>
    </div>
  );
};

export default Offer;
