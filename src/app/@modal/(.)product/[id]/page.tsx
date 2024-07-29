import { createClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import { Box, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { pizzas } from "@/data";
import ProductImage from "@/components/ProductImage";
import { priceTag } from "@/lib/priceTage";
import AddToCartBtn from "@/components/AddToCartBtn";
import BackButton from "@/components/BackButton";
import ModalComponent from "@/components/Modal";
import ProductDetails from "@/components/ProductDetail";

interface ProductProps {
  params: {
    id: any;
  };
}

const ProductDetail = async ({ params: { id } }: ProductProps) => {
  const { data: product, error } = await createClient()
    .from("products")
    .select("*")
    .eq("id", parseFloat(id))
    .single();
  if (!product) return notFound();

  return (
    <Suspense fallback={<Loading />}>
      <ModalComponent product={product} />
    </Suspense>
  );
};

export default ProductDetail;
