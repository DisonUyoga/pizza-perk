import { Tables } from "@/database.types";
import { Flex, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import PriceComponent from "../../PriceComponent";
import { motion } from "framer-motion";
import { discountCalculator } from "@/lib/discountCalculator";
import { AddIcon } from "@chakra-ui/icons";
interface PriceCardProps {
  product: Tables<"products">;
  bgStyle?: string;
}
const PriceCard = ({ product, bgStyle }: PriceCardProps) => {
  const MotionText = motion(Text);
  return (
    <Flex mt={4} alignContent={"center"} justify={"space-between"}>
      <PriceComponent product={product} bgStyle={bgStyle} />
      <Tooltip label="Add to Cart">
        <AddIcon boxSize={6} color="#ffff" fontWeight={700} />
      </Tooltip>
      {product.discount && product.discount > product.price && (
        <MotionText
          color={"#f80c0c"}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
          fontWeight={700}
        >
          -{discountCalculator(product.price, product.discount)}
        </MotionText>
      )}
    </Flex>
  );
};

export default PriceCard;
