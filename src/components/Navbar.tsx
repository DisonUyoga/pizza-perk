"use client";
import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  useColorModeValue,
  Link,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";

import NextLink from "next/link";
import { UserButton } from "@clerk/nextjs";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DrawerComponent from "./Drawer";
import { useAppSelector } from "@/lib/hook";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Links = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Menu",
    path: "/menu",
  },
  {
    display: "Orders",
    path: "/orders",
  },
];

const NavLink = ({
  children,
  path,
  toggleClose,
}: {
  children: ReactNode;
  path: string;
  toggleClose: () => void;
}) => (
  <Link
    as={NextLink}
    px={2}
    py={1}
    color={"#fff"}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={path}
    onClick={() => toggleClose()}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const router = useRouter();
  const {
    isOpen: openDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  const MotionBox = motion(Box);
  const toggleClose = () => {
    onClose();
  };

  return (
    <Box
      bg={useColorModeValue("#161622", "#161622")}
      px={4}
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="md"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"} justify={"center"}>
          <Flex
            fontSize={["md", "1.5rem"]}
            fontWeight="bold"
            gap={2}
            alignItems={"center"}
            justify={"center"}
          >
            <Link color={"#fff"} href="/">
              <Image
                src={"/pizzaman.png"}
                alt="logo"
                width={100}
                height={100}
                className={"w-8 h-8 rounded-full"}
              />
            </Link>
          </Flex>
          <Box display={{ base: "block", md: "none" }}>
            <UserButton />
          </Box>
          <Box
            display={{ base: "block", md: "none" }}
            onClick={() => {
              onOpenDrawer();
            }}
          >
            <FontAwesomeIcon icon={faShoppingCart} color="#fff" />
          </Box>
          <HStack
            as={"nav"}
            spacing={4}
            display={{ base: "none", md: "flex" }}
            color={"#fff"}
          >
            {Links.map((link) => (
              <NavLink
                key={link.path}
                path={link.path}
                toggleClose={toggleClose}
              >
                {link.display}
              </NavLink>
            ))}

            <Box
              display={{ base: "none", md: "block" }}
              onClick={() => {
                onOpenDrawer();
              }}
            >
              <FontAwesomeIcon icon={faShoppingCart} color="#fff" />
            </Box>
            <Box display={{ base: "none", md: "block" }} ml={2}>
              <UserButton />
            </Box>
          </HStack>
        </HStack>
        <IconButton
          size={"md"}
          icon={
            isOpen ? (
              <CloseIcon color={"#FF9001"} />
            ) : (
              <HamburgerIcon color={"#FF9001"} boxSize={6} />
            )
          }
          aria-label={"Open Menu"}
          bg={"none"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {isOpen ? (
        <MotionBox
          pb={4}
          display={{ md: "none" }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink
                key={link.path}
                path={link.path}
                toggleClose={toggleClose}
              >
                {link.display}
              </NavLink>
            ))}
          </Stack>
        </MotionBox>
      ) : null}

      <DrawerComponent isOpen={openDrawer} onClose={onCloseDrawer} />
    </Box>
  );
};

export default Navbar;
