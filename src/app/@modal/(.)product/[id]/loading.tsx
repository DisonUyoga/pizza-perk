"use client";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Skeleton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

const Loading = () => {
  return (
    <Stack minHeight="100vh">
      <ProductDetailSkeleton />
    </Stack>
  );
};

export default Loading;
