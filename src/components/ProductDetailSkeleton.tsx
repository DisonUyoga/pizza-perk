"use client";
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
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

const ProductDetailSkeleton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    OpenModal();
  }, []);
  function OpenModal() {
    onOpen();
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Skeleton height="20px" w={"20vw"} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box flex={1} minHeight="100vh">
            <SimpleGrid
              spacing={10}
              minChildWidth="300px"
              p="10px"
              py={"20px"}
              gap={4}
            >
              <Skeleton height="300px" />
              <Flex direction={"column"} p={2} gap={[2, 4]}>
                <Skeleton height="30px" />
                <Skeleton height="20px" w={"50vw"} />
                <Skeleton height="10px" w={"30vw"} />
                <Skeleton height="20px" w={"20vw"} />
              </Flex>
            </SimpleGrid>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductDetailSkeleton;
