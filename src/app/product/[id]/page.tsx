import { createClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "../../@modal/(.)product/[id]/loading";
import ProductDetails from "@/components/ProductDetail";
import { Stack } from "@chakra-ui/react";

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
      <Stack minHeight="100vh">
        {product && <ProductDetails product={product} />}
      </Stack>
    </Suspense>
  );
};

export default ProductDetail;
