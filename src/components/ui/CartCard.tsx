import {
  CartItems,
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "@/features/slices/cartSlice";
import { pizzas } from "@/data";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { priceTag } from "@/lib/priceTage";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Text, Link } from "@chakra-ui/react";
import ProductImage from "@/components/ProductImage";
import NextLink from "next/link";
import CartImage from "../CartImage";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CartCardProps {
  cartItem: CartItems;
}
const CartCard = ({ cartItem }: CartCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const name = _.truncate(cartItem.name as string, {
    separator: " ",
    length: 12,
  });
  function increase() {
    dispatch(increaseQuantity(cartItem));
    setQuantity((prev) => prev + 1);
  }
  function decrease() {
    dispatch(decreaseQuantity(cartItem));
    if (quantity < 0) return;
    setQuantity((prev) => prev - 1);
  }
  return (
    <>
      {quantity > 0 && (
        <Flex
          alignContent={"center"}
          justifyContent={"space-between"}
          borderRadius={5}
          bg={"#050152"}
          p={"10px"}
          columnGap={2}
          h={"90px"}
          w={"100%"}
        >
          <Box position={"relative"} w={"60px"}>
            {pizzas[0].img && cartItem.image && (
              <CartImage fallback={pizzas[0].img} path={cartItem.image} />
            )}
          </Box>
          <Flex
            direction={"column"}
            alignContent={"center"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"xs"} color={"#FF9C01"}>
              {name}
            </Text>
            <Text fontSize={"xs"} color={"#fff"}>
              {priceTag(cartItem.price)}
            </Text>
          </Flex>
          <Flex
            direction={"column"}
            alignContent={"center"}
            justifyContent={"space-between"}
          >
            <HStack spacing={"15px"} p={0} m={0}>
              <AddIcon
                w={[2, 4]}
                h={[2, 4]}
                color={"#ffff"}
                onClick={() => increase()}
              />
              <Text color={"#fff"}>{quantity}</Text>
              <MinusIcon
                w={[2, 4]}
                h={[2, 4]}
                color={"#ffff"}
                onClick={() => decrease()}
              />
            </HStack>
            <Text
              textAlign={"center"}
              fontSize={"xs"}
              color={"#FF9C01"}
              cursor={"pointer"}
              onClick={() =>
                router.push(`/product/${cartItem.id}?update=${true}`)
              }
            >
              update
            </Text>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default CartCard;
