import ModalComponent from "@/components/Modal";
import { createClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "../../../product/[id]/loading";
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
        <ModalComponent product={product} />
      </Stack>
    </Suspense>
  );
};

export default ProductDetail;
