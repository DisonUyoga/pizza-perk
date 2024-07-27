import { createClient } from "@/lib/supabase";
import { Stack } from "@chakra-ui/react";
import { currentUser } from "@clerk/nextjs/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const { data: session, error: sessionError } =
    await createClient().auth.getSession();
  return <Stack h="100vh">{children}</Stack>;
}
