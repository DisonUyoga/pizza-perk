import { createClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "../../@modal/(.)product/[id]/loading";
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
      {product && <ProductDetails product={product} />}
    </Suspense>
  );
};

export default ProductDetail;
