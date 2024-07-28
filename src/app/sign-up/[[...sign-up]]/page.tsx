"use client";
import { Center } from "@chakra-ui/react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <Center bg="#161622" color="white" px={4} py={6} mb={4}>
      <SignUp fallbackRedirectUrl="/supabaseauth" />
    </Center>
  );
}
