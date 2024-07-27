"use client";
import { Tables } from "@/database.types";
import { addToCart } from "@/features/slices/cartSlice";
import { useAppDispatch } from "@/lib/hook";
import { Button } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import toast from "react-hot-toast";
interface AddtoCartProps {
  product: Tables<"products">;
  bg?: string;
  children: ReactNode;
}
const AddToCartBtn = ({ children, bg, product }: AddtoCartProps) => {
  const dispatch = useAppDispatch();
  const determineIfItemIsPizza = !!(
    product?.size_large ||
    product?.size_medium ||
    product?.size_small
  );
  function addProductToCart(product: Tables<"products">) {
    if (!product) return;

    if (determineIfItemIsPizza) {
      dispatch(addToCart({ product, size: "XL" }));
    } else {
      dispatch(addToCart({ product, size: null }));
    }

    toast.success("item added to cart");

    // router.push(`/product/${product.id}`);
  }
  return (
    <Button
    
      fontSize={["12px", "16px"]}
      variant="solid"
      bg={bg}
      colorScheme="white"
      _hover={{ opacity: 0.7 }}
      onClick={() => addProductToCart(product)}
    >
      {children}
    </Button>
  );
};

export default AddToCartBtn;
