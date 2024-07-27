"use client";
import { pizzas } from "@/data";
import { Tables } from "@/database.types";
import { discountCalculator } from "@/lib/discountCalculator";
import { useAppDispatch } from "@/lib/hook";
import { isNewProduct } from "@/lib/isNewProduct";
import { priceTag } from "@/lib/priceTage";
import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import ProductImage from "../ProductImage";
import AddToCartBtn from "../AddToCartBtn";
import { addToCart } from "@/features/slices/cartSlice";
import toast from "react-hot-toast";
import NextLink from "next/link";
import { motion } from "framer-motion";
interface ProductCardProps {
  product: Tables<"products">;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const determineIfItemIsPizza = !!(
    product?.size_large ||
    product?.size_medium ||
    product?.size_small
  );

  const description = _.truncate(product?.description as string, {
    separator: " ",
    length: 30,
  });
  const isNew = isNewProduct(product.created_at);
  const MotionBox = motion(Box);
  return (
    <LinkBox
      as={MotionBox}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      data-aos-duration="1500"
    >
      <LinkOverlay as={NextLink} href={`/product/${product.id}`}>
        <Card maxW="sm" bg={"#050152"} borderRadius={5}>
          <CardBody>
            {pizzas[0].img && (
              <Box position={"relative"} w={"100%"} h={"150px"}>
                <ProductImage
                  fallback={pizzas[0].img}
                  path={product.image as string}
                />
                {isNew && (
                  <Badge
                    position={"absolute"}
                    top={2}
                    left={2}
                    ml="1"
                    colorScheme="green"
                    fontSize={"xs"}
                  >
                    New
                  </Badge>
                )}
              </Box>
            )}
            <Flex alignItems={"center"} justifyContent={"space-between"} mt={5}>
              {product.discount && (
                <Text
                  fontSize={"xs"}
                  bg={"#ff0101"}
                  p={"4px"}
                  borderRadius={5}
                  textDecoration={"line-through"}
                  color={"#fff"}
                >
                  {priceTag(product.discount)}
                </Text>
              )}
              <Text
                borderRadius={5}
                fontWeight={700}
                fontSize={"xs"}
                bg={"#FF9C01"}
                p={"4px"}
              >
                {priceTag(product.price)}
              </Text>
              {product.discount && product.discount > product.price && (
                <Text color={"#FF9C01"}>
                  -{discountCalculator(product.price, product.discount)}
                </Text>
              )}
            </Flex>
            {description && (
              <Box>
                <Text pt="2" fontSize="xs" fontWeight={200} color={"#fff"}>
                  {description}
                </Text>
              </Box>
            )}
          </CardBody>
          <Divider />
          <CardFooter alignItems={"center"} justify={"space-between"}>
            <AddToCartBtn product={product}>
              <AddIcon boxSize={[3, 4]} color={"#ffff"} />
            </AddToCartBtn>
          </CardFooter>
        </Card>
      </LinkOverlay>
    </LinkBox>
  );
};

export default ProductCard;
