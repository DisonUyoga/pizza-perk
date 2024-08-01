"use client";
import { pizzas, sizes } from "@/data";
import { Tables } from "@/database.types";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import { priceTag } from "@/lib/priceTage";
import AddToCartBtn from "./AddToCartBtn";
import BackButton from "./BackButton";
import PriceComponent from "../../PriceComponent";
import { motion } from "framer-motion";
import { discountCalculator } from "@/lib/discountCalculator";
import SelectSize from "./SelectSize";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { PizzaSize } from "@/type";
import toast from "react-hot-toast";
import {
  addToCart,
  CartItems,
  selectSize,
  setIsPizza,
  setTogglePriceDependingOnSize,
  updateCartTotalAfterSizeChange,
} from "@/features/slices/cartSlice";
import { setProduct } from "@/features/slices/productSlice";
import { faTruckField } from "@fortawesome/free-solid-svg-icons";
import PriceCard from "./PriceCard";
import { useRouter, useSearchParams } from "next/navigation";
interface ProductDetailProps {
  product: Tables<"products">;
}
const ProductDetail = ({ product }: ProductDetailProps) => {
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

  const MotionButton = motion(Button);
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
          columnGap={6}
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
            <PriceCard product={product} bgStyle="#fff" />
            <Text
              fontSize={"10px"}
              fontWeight={600}
              mt={2}
              color={"#FF9C01"}
              data-aos="zoom-in"
              data-aos-duration="1500"
            >
              The offer only applies to extra large
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
                    textStyle={"#fff"}
                    bgStyle={true}
                  />
                ))}
              </Flex>
            )}
            {product.description && (
              <Text fontSize="lg" mb={4} color={"#c5bfbf"}>
                {product.description}
              </Text>
            )}

            <Stack direction="row" spacing={4} mt={4}>
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
