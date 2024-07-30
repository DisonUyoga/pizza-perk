import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import toast from "react-hot-toast";

import { Suspense } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Error from "../error";
import BackButton from "@/components/BackButton";
import ProductCard from "@/components/ui/ProductCard";
import Loading from "./loading";

interface CategoryPageProps {
  params: {
    category: string;
  };
}
const CategoryPage = async ({ params: { category } }: CategoryPageProps) => {
  if (!category) redirect("/menu");
  const { data, error } = await createClient()
    .from("products")
    .select("*, categories(*)")
    .eq("category_id", category)
    .order("created_at", { ascending: false });

  if (data?.length === 0) {
    toast.error("menu items are not available at the moment");
    return redirect("/menu");
  }

  return (
    <ErrorBoundary
      fallback={<Error name={error?.code} message={error?.message} />}
    >
      <Suspense fallback={<Loading />}>
        <Box
          p="10px"
          bg="#161622"
          flex={1}
          justifyItems="center"
          alignItems="center"
          minHeight="100vh"
        >
          <BackButton />

          {data && data[0].categories?.category && (
            <Text
              color={"#fff"}
              fontSize={"xl"}
              fontWeight={"600"}
              textAlign={"center"}
              data-aos="zoom-in"
              data-aos-duration="2000"
            >
              {data[0].categories?.category}
            </Text>
          )}
          <SimpleGrid
            spacing={10}
            minChildWidth="300px"
            bg="#161622"
            position={"relative"}
            py={"20px"}
          >
            {data &&
              category &&
              data.map((p) => <ProductCard key={p.id} product={p} />)}
          </SimpleGrid>
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};

export default CategoryPage;
