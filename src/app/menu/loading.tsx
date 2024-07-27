import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Box flex={1}   minHeight="100vh">
      <SimpleGrid
        spacing={2}
        minChildWidth="300px"
        bg="#161622"
        p="10px"
        py={"20px"}
        gap={4}
      >
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
      </SimpleGrid>
    </Box>
  );
};

export default Loading;
