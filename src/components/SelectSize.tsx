"use client";
import { Tables } from "@/database.types";
import { priceTag } from "@/lib/priceTage";
import { PizzaSize } from "@/type";
import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SelectSizeProps {
  sizes: PizzaSize;
  handleSelected: (size: PizzaSize) => void;
  selected: PizzaSize | null;
  product: Tables<"products">;
}
const SelectSize = ({
  sizes,
  handleSelected,
  selected,
  product,
}: SelectSizeProps) => {
  const [price, setPrice] = useState<number | null>();

  useEffect(() => {
    getSizeAndPrice(sizes, product);
  }, [, sizes, product]);

  function getSizeAndPrice(s: PizzaSize, p: Tables<"products">) {
    if (!p) return;
    switch (s) {
      case "S":
        setPrice(p.size_small);
        break;
      case "M":
        setPrice(p.size_medium);
        break;
      case "L":
        setPrice(p.size_large);
        break;
      default:
        setPrice(p.price);
    }
  }
  const MotionFlex = motion(Flex);
  console.log(price);
  return (
    <MotionFlex
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => handleSelected(sizes)}
      direction={"column"}
      borderRadius={5}
      justifyContent={"center"}
      alignContent={"center"}
      w={50}
      _hover={{ bg: "#050152", color: "#fff" }}
      _active={{ bg: "#161622", color: "#fff" }}
      cursor={"pointer"}
      aspectRatio={1}
      p={2}
    >
      {sizes && (
        <Text fontSize={["l", "xl"]} textAlign={"center"} fontWeight={700}>
          {sizes}
        </Text>
      )}
      {price && (
        <Text fontSize={"10px"} textAlign={"center"}>
          {price}
        </Text>
      )}
    </MotionFlex>
  );
};

export default SelectSize;