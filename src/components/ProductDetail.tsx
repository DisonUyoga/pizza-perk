"use client";
import { pizzas } from "@/data";
import { Tables } from "@/database.types";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import ProductImage from "./ProductImage";
import { priceTag } from "@/lib/priceTage";
import AddToCartBtn from "./AddToCartBtn";
import BackButton from "./BackButton";
interface ProductDetailProps {
  product: Tables<"products">;
}
const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <Box
      flex={1}
      bg={"#161622"}
      w={"100vw"}
      h={"100vh"}
      px="10px"
      py="20px"
      minHeight="100vh"
    >
      <Box
        maxW="5xl"
        mx="auto"
        p={4}
        bg={"#050152"}
        borderRadius="lg"
        shadow="md"
        position={"relative"}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={"10px"}
        >
          {pizzas[1].img && product.image && (
            <Box position={"relative"} w={["90vw", "90vw", "60vw"]} h={"50vh"}>
              <ProductImage fallback={pizzas[1].img} path={product.image} />
            </Box>
          )}
          <Box>
            <Heading as="h2" size="xl" mb={4} color={"#ffff"}>
              {product.name}
            </Heading>
            {product.description && (
              <Text fontSize="lg" mb={4} color={"#fff"}>
                {product.description}
              </Text>
            )}
            <Text fontSize="2xl" fontWeight="bold" mb={4} color={"#FF9C01"}>
              {priceTag(product.price)}
            </Text>
            <Stack direction="row" spacing={4}>
              <AddToCartBtn bg="#088d25" product={product}>
                Add to Cart
              </AddToCartBtn>
              <Flex
                position="absolute"
                top={10}
                justify={"center"}
                alignItems={"center"}
                left={4}
                gap={1}
              >
                <BackButton />
              </Flex>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductDetail;
