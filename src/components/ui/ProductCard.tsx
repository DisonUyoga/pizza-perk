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
import PriceCard from "../PriceCard";
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
        <Card maxW="sm" bg={"#050152"} borderRadius={5} p={0} m={0}>
          <CardBody p={0} m={0}>
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
                <Box position={"absolute"} bottom={0} w={"90%"}>
                  <PriceCard product={product} />
                </Box>
              </Box>
            )}
          </CardBody>
        </Card>
      </LinkOverlay>
    </LinkBox>
  );
};

export default ProductCard;
