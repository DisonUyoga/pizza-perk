"use client";
import { Flex } from "@chakra-ui/react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <Flex alignContent={"center"} px={4}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        size={28 as any}
        color="#fff"
        onClick={() => router.back()}
      />
    </Flex>
  );
};

export default BackButton;
