import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const SpinnerLoader = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Spinner size="xl" color="#ffff" />
    </Flex>
  );
};

export default SpinnerLoader;
