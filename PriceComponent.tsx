"use client";
import { Tables } from "@/database.types";
import { priceTag } from "@/lib/priceTage";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
interface PriceProps {
  product: Tables<"products">;
}
const PriceComponent = ({ product }: PriceProps) => {
  return (
    <Flex direction={"column"} gap={0}>
      {product.discount && (
        <Text
          bg="#050152"
          color={"#f80c0c"}
          textDecoration={"line-through"}
          borderTopRadius={5}
          px={2}
          fontSize={"xs"}
          fontWeight={500}
        >
          {priceTag(product.discount)}
        </Text>
      )}
      <Text
        borderTopRadius={product.discount ? 0 : 5}
        bg={"#FF9C01"}
        color={"#ffff"}
        borderBottomRadius={5}
        fontSize={"xs"}
        fontWeight={500}
        px={2}
      >
        {priceTag(product.price)}
      </Text>
    </Flex>
  );
};

export default PriceComponent;
