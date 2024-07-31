"use client";
import { Center, CircularProgress, Spinner } from "@chakra-ui/react";
import { Container } from "postcss";
import { usePathname } from "next/navigation";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";

const Loading = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/product")) {
    return null;
  }

  return (
    <Center flex={1} minHeight="100vh">
      <CircularProgress mt={"-70px"} isIndeterminate color="#FF9C01" />
    </Center>
  );
};
export default Loading;
