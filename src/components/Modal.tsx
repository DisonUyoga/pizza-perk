"use client";

import { pizzas, sizes } from "@/data";
import { Tables } from "@/database.types";
import {
  addToCart,
  CartItems,
  selectSize,
  setIsPizza,
  setTogglePriceDependingOnSize,
  updateCartTotalAfterSizeChange,
} from "@/features/slices/cartSlice";
import { setProduct } from "@/features/slices/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { PizzaSize } from "@/type";
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import PriceCard from "./PriceCard";
import ProductImage from "./ProductImage";
import SelectSize from "./SelectSize";

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
    if (determineIfItemIsPizza) {
      dispatch(setIsPizza({ isPizza: determineIfItemIsPizza }));
    }
    if (cartItems) {
      checkIfItemIsAlreadyInTheCart(cartItems);
    }
    if (cartItems && cartProduct) {
      changeCartTotalWhenSizeIsChanged(cartItems);
    }
  }, [cartItems]);
  useEffect(() => {
    dispatch(setTogglePriceDependingOnSize({ price: product.price }));
    dispatch(
      selectSize({
        size: "XL",
        product,
      })
    );
    if (product) {
      dispatch(setProduct({ product }));
    }
  }, [product, determineIfItemIsPizza]);

  function OpenModal() {
    onOpen();
  }

  const handleSelected = (size: PizzaSize | null | undefined) => {
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
          size: size as PizzaSize,
          product,
        })
      );

      updateSize();
      if (!size) return;

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
        dispatch(setTogglePriceDependingOnSize({ price: product.size_small }));

        break;
      case "M":
        dispatch(setTogglePriceDependingOnSize({ price: product.size_medium }));

        break;
      case "L":
        dispatch(setTogglePriceDependingOnSize({ price: product.size_large }));

        break;
      default:
        dispatch(setTogglePriceDependingOnSize({ price: product.price }));
    }
  }
  function changeCartTotalWhenSizeIsChanged(c: CartItems[]) {
    setSelectionLoader(true);
    const item = c.find((p) => p.id === product?.id);

    if (!item) return;
   
    if (item?.price) {
      dispatch(
        updateCartTotalAfterSizeChange({
          product: item,
          currentPrice: item.price,
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
    dispatch(setIsPizza({ isPizza: determineIfItemIsPizza }));
    if (!product) return;

    try {
      setLoading(true);
      dispatch(
        addToCart({
          product,
          size: selected,
        })
      );
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
