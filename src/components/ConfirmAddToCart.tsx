"use client";

import { PizzaSize } from "@/type";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
interface ConfirmAddToCartProps {
  size: PizzaSize | null | undefined;
  isOpen: boolean;
  onClose: () => void;
}
export default function ConfirmAddToCart({
  size,
  isOpen,
  onClose,
}: ConfirmAddToCartProps) {
 
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae,
              tempora! Ducimus sint quisquam repudiandae consequatur porro
              aliquam harum necessitatibus vero!
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
