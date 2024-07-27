"use client";
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.300", "gray.900")}
      color={useColorModeValue("gray.800", "gray.200")}
      py={4}
      mt={8}
    >
      <Container
        maxW="6xl"
        as={Stack}
        spacing={4}
        justify="center"
        align="center"
      >
        <Text>
          &copy; {new Date().getFullYear()} PizzaPerk. All rights reserved.
        </Text>
        <Stack direction="row" spacing={6}>
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="#">Services</Link>
          <Link href="#">Contact</Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
