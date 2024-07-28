"use client";
import { Center } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";

export default async function Page() {
  return (
    <Center bg="#161622" color="white" px={4} py={6} mb={4} flex={1}>
      <SignIn fallbackRedirectUrl="/supabaseauth" />
    </Center>
  );
}
