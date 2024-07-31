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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

const Loading = () => {
  return (
    <>
      <ProductDetailSkeleton />
    </>
  );
};

export default Loading;
