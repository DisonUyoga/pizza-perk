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
import { pizzas } from "@/data";
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

interface ModalProps {
  product: Tables<"products">;
}
export default async function ModalComponent({ product }: ModalProps) {
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
      router.back();
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
                <Box position={"relative"} width={["100vw", "50vw"]} h={"50vh"}>
                  <ProductImage fallback={pizzas[0].img} path={product.image} />
                </Box>
              )}
            </Center>
          )}
          <Flex mt={4} alignContent={"center"} justify={"space-between"}>
            <PriceComponent product={product} />
            {product.discount && product.discount > product.price && (
              <Text color={"#FF9C01"}>
                -{discountCalculator(product.price, product.discount)}
              </Text>
            )}
            <AddToCartBtn product={product}>
              <AddIcon boxSize={[3, 4]} color={"#000"} />
            </AddToCartBtn>
          </Flex>
          {product.description && (
            <Text fontSize={["xs", "md"]}>{product.description}</Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
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
          </Button>
        
        </ModalFooter>
      </ModalContent>
    </Modal>,
    document.getElementById("modal-root")!
  );
}
