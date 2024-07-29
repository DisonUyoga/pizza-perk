"use client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";
interface ErrorProps {
  name: string | undefined;
  message: string | undefined;
}
const Error = ({ name, message }: ErrorProps) => {
  return (
    <Alert status="error" flex={1}>
      <AlertIcon />
      <AlertTitle textAlign={"center"}>Something went wrong!!</AlertTitle>
      {message && <AlertDescription>{message}</AlertDescription>}
    </Alert>
  );
};

export default Error;
