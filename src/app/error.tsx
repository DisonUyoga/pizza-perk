"use client"; // Error components must be Client Components

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useEffect } from "react";
interface ErrorProps {
  name: string | undefined;
  message: string | undefined;
}

export default function Error({ name, message }: ErrorProps) {
  return (
    <Alert status="error" flex={1}>
      <AlertIcon />
      <AlertTitle textAlign={"center"}>Something went wrong!!</AlertTitle>
      {message && <AlertDescription>{message}</AlertDescription>}
    </Alert>
  );
}
