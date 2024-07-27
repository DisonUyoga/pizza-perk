import React, { Suspense } from "react";

import { menu } from "@/data";

import toast from "react-hot-toast";

import { useAppSelector } from "@/lib/hook";
import { redirect, useRouter } from "next/navigation";
import CategoryCard from "@/components/CategoryCard";
import NextLink from "next/link";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Skeleton,
} from "@chakra-ui/react";
import ProductImage from "@/components/ProductImage";
import { createClient } from "@/lib/supabase";
import Loading from "../loading";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";
import { Tables } from "@/database.types";
import { currentUser } from "@clerk/nextjs/server";

const MenuPage = async () => {
  const user = await currentUser();
  const { data: session, error: sessionError } =
    await createClient().auth.getSession();
  // check whether clerk user is logged in
  if (!user) {
    return redirect("/sign-in");
  }
  if (!session.session) {
    return redirect("/sign-in");
  }
  const { data: categories, error } = await createClient()
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });
  const { data, error: productError } = await createClient()
    .from("products")
    .select("*, categories(*)");

  function checkIfCategoryHasProduct(
    categories: Tables<"categories">,
    products: Tables<"products">[]
  ) {
    const validateCategory = products.map((p: any) => {
      if (p.categories.id === categories.id) {
        return true;
      }
      return false;
    });
    return validateCategory;
  }
  return (
    <ErrorBoundary
      fallback={
        <Error
          name={error?.code}
          message={error?.message || productError?.message}
        />
      }
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
          <SimpleGrid
            p="10px"
            spacing={10}
            minChildWidth="300px"
            bg="#161622"
            position={"relative"}
            py={"20px"}
          >
            {categories &&
              data &&
              categories.map((item) => {
                const c = checkIfCategoryHasProduct(item, data);
                if (c.includes(true)) {
                  return (
                    <Card key={item.id} borderTop="4px" borderColor="#FF9C01">
                      <CardHeader>
                        <Heading
                          as="h3"
                          size="sm"
                          position={"absolute"}
                          zIndex={50}
                          color={"white"}
                        >
                          {item.category}
                        </Heading>
                      </CardHeader>
                      <Link
                        as={NextLink}
                        href={`/menu/${item.id}?category=${item.category}`}
                      >
                        <CardBody>
                          {item.image && menu[0].img && (
                            <ProductImage
                              fallback={menu[0].img}
                              path={item.image}
                            />
                          )}
                        </CardBody>
                      </Link>
                    </Card>
                  );
                }
              })}
          </SimpleGrid>
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};

export default MenuPage;
