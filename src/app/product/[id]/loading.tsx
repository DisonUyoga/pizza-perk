"use client";
import { Box, Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box flex={1} minHeight="100vh">
      <SimpleGrid
        spacing={10}
        minChildWidth="300px"
        bg="#161622"
        p="10px"
        py={"20px"}
        gap={4}
      >
        <Skeleton height="400px" />
        <Flex direction={"column"} p={2} gap={[2, 4]}>
          <Skeleton height="30px" />
          <Skeleton height="20px" w={["50vw", "150px"]} />
          <Skeleton height="10px" w={["30vw", "100px"]} />
        </Flex>
      </SimpleGrid>
    </Box>
  );
};
export default Loading;
