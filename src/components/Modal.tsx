"use client";

import { type ElementRef, ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Center,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Tables } from "@/database.types";
import { pizzas, sizes } from "@/data";
import ProductImage from "./ProductImage";
import NextLink from "next/link";
import Link from "next/link";
import { priceTag } from "@/lib/priceTage";
import { discountCalculator } from "@/lib/discountCalculator";
import AddToCartBtn from "./AddToCartBtn";
import { AddIcon } from "@chakra-ui/icons";
import PriceComponent from "../../PriceComponent";
import { PizzaSize } from "@/type";
import toast from "react-hot-toast";
import {
  addToCart,
  CartItems,
  selectSize,
  updateCartTotalAfterSizeChange,
} from "@/features/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import SelectSize from "./SelectSize";
import { motion } from "framer-motion";

interface ModalProps {
  product: Tables<"products">;
}

export default function ModalComponent({ product }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [selectionLoader, setSelectionLoader] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    totalAmount,
    totalQuantity,
    sizes: selected,
  } = useAppSelector((state) => state.cart);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [cartProduct, setCartProduct] = useState<CartItems | undefined>();
  const [openZoom, setOpenZoom] = useState(false);
  const [priceSize, setPriceSize] = useState<number | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const determineIfItemIsPizza = !!(
    product?.size_large ||
    product?.size_medium ||
    product?.size_small
  );
  useEffect(() => {
    OpenModal();
  }, []);

  function OpenModal() {
    onOpen();
  }

  function onDismiss() {
    router.back();
  }

  const handleSelected = (size: PizzaSize) => {
    toast.success(
      `You have picked ${
        size === "S"
          ? "small"
          : size === "M"
          ? "medium"
          : size === "L"
          ? "large"
          : "extra large"
      }`
    );
    setSelectionLoader(true);

    try {
      if (!product) return;
      dispatch(selectSize({ size, product }));

      updateSize();

      togglePriceDependingOnTheSize(product, size);
    } catch (error) {
    } finally {
      setSelectionLoader(false);
    }
  };
  function checkIfItemIsAlreadyInTheCart(c: CartItems[]) {
    const cartItem = cartItems.find((p) => p.id === product?.id) as CartItems;

    if (!cartItem || !product) return;

    setCartProduct(cartItem);
  }

  function togglePriceDependingOnTheSize(
    product: Tables<"products">,
    selectedSize: PizzaSize
  ) {
    switch (selectedSize) {
      case "S":
        setPriceSize(product.size_small);

        break;
      case "M":
        setPriceSize(product.size_medium);

        break;
      case "L":
        setPriceSize(product.size_large);
        setSelectionLoader(false);

        break;
      default:
        setPriceSize(product.price);
    }
  }
  function changeCartTotalWhenSizeIsChanged(c: CartItems[]) {
    setSelectionLoader(true);
    const item = c.find((p) => p.id === product?.id);

    if (!item) return;

    if (priceSize && item?.price) {
      const newTotal =
        totalAmount - item?.quantity * item.price + item.quantity * priceSize;

      dispatch(
        updateCartTotalAfterSizeChange({
          newTotal,
          changedItem: product,
          price: priceSize,
        })
      );
    }
    setSelectionLoader(false);
  }
  function updateSize() {
    if (cartItems && cartProduct) {
      changeCartTotalWhenSizeIsChanged(cartItems);
      toast.success("item updated");
      // router.back();
    }
  }
  function addProductToCart(product: Tables<"products">) {
    if (!product) return;
    try {
      setLoading(true);
      dispatch(addToCart({ product, size: selected }));
      setLoading(false);
      toast.success("item added to cart");

      router.back();
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  }
  const MotionText = motion(Text);
  const MotionButton = motion(Button);
  const MotionBox = motion(Box);
  return createPortal(
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product.name}</ModalHeader>
        <ModalCloseButton onClick={() => router.back()} />
        <ModalBody>
          {product && (
            <Center>
              {pizzas[0].img && product.image && (
                <Box
                  position={"relative"}
                  width={["100vw", "50vw"]}
                  h={"50vh"}
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                >
                  <ProductImage fallback={pizzas[0].img} path={product.image} />
                </Box>
              )}
            </Center>
          )}
          <Flex mt={4} alignContent={"center"} justify={"space-between"}>
            <PriceComponent product={product} />
            {product.discount && product.discount > product.price && (
              <MotionText
                color={"#FF9C01"}
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
              >
                -{discountCalculator(product.price, product.discount)}
              </MotionText>
            )}
          </Flex>
          <Text
            fontSize={"10px"}
            fontWeight={600}
            mt={2}
            color={"#050152"}
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            The offer only applies to Extra Large
          </Text>
          <Flex
            flex={1}
            mt={4}
            alignContent={"center"}
            justify={"space-between"}
          >
            {determineIfItemIsPizza &&
              sizes.map((s) => (
                <SelectSize
                  sizes={s}
                  selected={selected}
                  handleSelected={handleSelected}
                  product={product}
                />
              ))}
          </Flex>

          {product.description && (
            <Text
              mt={10}
              fontSize={["xs", "md"]}
              data-aos="zoom-in"
              data-aos-duration="1500"
            >
              {product.description}
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <MotionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            size={["sm", "md"]}
            fontSize={["xs", "md"]}
            colorScheme="blue"
            mr={3}
            onClick={() => {
              router.back();
              onClose();
            }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "#319795",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Back
          </MotionButton>
          <MotionBox
            justifyContent={"center"}
            alignContent={"center"}
            p={2}
            minWidth={"30vw"}
            cursor={"pointer"}
            bg={"#088d25"}
            _hover={{ opacity: 0.7 }}
            _active={{ opacity: 0.5 }}
            borderRadius={5}
            onClick={() => addProductToCart(product)}
          >
            <Text fontSize={["xs", "md"]} textAlign={"center"} color={"#fff"}>
              Add to Cart
            </Text>
          </MotionBox>
        </ModalFooter>
      </ModalContent>
    </Modal>,
    document.getElementById("modal-root")!
  );
}
