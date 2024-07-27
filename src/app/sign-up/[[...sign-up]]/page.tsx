import { createClient } from "@/lib/supabase";
import { Center } from "@chakra-ui/react";
import { SignUp } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  const { data: session, error: sessionError } =
    await createClient().auth.getSession();

  if (user) {
    return redirect("/supabaseauth");
  }
  return (
    <Center bg="#161622" color="white" px={4} py={6} mb={4}>
      <SignUp fallbackRedirectUrl="/supabaseauth" />
    </Center>
  );
}
