import { SignIn } from "@clerk/nextjs";
import { Center, Square, Circle } from "@chakra-ui/react";
import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();
  const { data: session, error: sessionError } =
    await createClient().auth.getSession();

  if (user) {
    return redirect("/supabaseauth");
  }

  return (
    <Center bg="#161622" color="white" px={4} py={6} mb={4} flex={1}>
      <SignIn fallbackRedirectUrl="/supabaseauth" />
    </Center>
  );
}
