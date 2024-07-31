"use client";

import { type ElementRef, ReactNode, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { setProduct } from "@/features/slices/productSlice";
import PriceCard from "./PriceCard";

interface ModalProps {
  product: Tables<"products">;
}

export default function ModalComponent({ product }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [selectionLoader, setSelectionLoader] = useState(false);
  const searcParams = useSearchParams();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    totalAmount,
    totalQuantity,
    sizes: selected,
  } = useAppSelector((state) => state.cart);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const searchParams = useSearchParams();
  const [cartProduct, setCartProduct] = useState<CartItems | undefined>();
  const [openZoom, setOpenZoom] = useState(false);
  const [priceSize, setPriceSize] = useState<number | null>(null);
  const [itemSize, setItemSize] = useState<PizzaSize | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const determineIfItemIsPizza = !!(
    product?.size_large ||
    product?.size_medium ||
    product?.size_small
  );
  const update = searchParams.get("update");
  useEffect(() => {
    OpenModal();
  }, []);
  useEffect(() => {
    if (cartItems) {
      checkIfItemIsAlreadyInTheCart(cartItems);
    }
    if (cartItems && cartProduct) {
      changeCartTotalWhenSizeIsChanged(cartItems);
    }
  }, [cartItems]);
  useEffect(() => {
    if (product) {
      dispatch(setProduct({ product }));
    }
  }, [product, determineIfItemIsPizza]);

  function OpenModal() {
    onOpen();
  }

  const handleSelected = (size?: PizzaSize | undefined | null) => {
    size != null
      ? toast.success(
          `You have selected ${
            size == "S"
              ? "small"
              : size === "M"
              ? "medium"
              : size === "L"
              ? "large"
              : size === "XL"
              ? "extra large"
              : null
          }`
        )
      : null;
    setSelectionLoader(true);

    try {
      if (!product) return;
      dispatch(
        selectSize({
          size: determineIfItemIsPizza ? (size ? size : "XL") : null,
          product,
        })
      );

      updateSize();
      if (!size) return;
      togglePriceDependingOnTheSize(product, size);
      setItemSize(size);
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
    if (update && cartItems && cartProduct) {
      changeCartTotalWhenSizeIsChanged(cartItems);
      toast.success("item updated");
      router.back();
    }
  }
  function addProductToCart(product: Tables<"products">) {
    if (!product) return;
    handleSelected(itemSize);
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
          <PriceCard product={product} />
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
          {determineIfItemIsPizza && (
            <Flex
              flex={1}
              mt={4}
              alignContent={"center"}
              justify={"space-between"}
            >
              {sizes.map((s, index) => (
                <SelectSize
                  key={index}
                  sizes={s}
                  selected={selected}
                  handleSelected={handleSelected}
                  product={product}
                />
              ))}
            </Flex>
          )}

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
          >
            Back
          </MotionButton>
          <MotionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            size={["sm", "md"]}
            fontSize={["xs", "md"]}
            colorScheme="blue"
            bg={"#088d25"}
            mr={3}
            onClick={() => addProductToCart(product)}
          >
            Add to Cart
          </MotionButton>
        </ModalFooter>
      </ModalContent>
    </Modal>,
    document.getElementById("modal-root")!
  );
}
