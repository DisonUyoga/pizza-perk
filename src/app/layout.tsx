import AosProvider from "@/components/AosProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReduxProvider from "@/components/ReduxProvider";
import { createClient } from "@/lib/supabase";
import { ChakraProvider, Stack } from "@chakra-ui/react";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import "aos/dist/aos.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PizzaPerk",
  description:
    "Discover PizzaPerk: Your Crave-Worthy Shortcut to Delicious Pizza Bliss!",
};

export default async function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  const user = await currentUser();
  const { data: session, error: sessionError } =
    await createClient().auth.getSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ChakraProvider>
            <ReduxProvider>
              <AosProvider>
                <Stack minHeight="100vh" bg={"#161622"}>
                  <Navbar />
                  <Stack>
                    {children}

                    <Footer />
                  </Stack>
                </Stack>
                <Toaster
                  position="top-center"
                  toastOptions={{
                    duration: 3000,
                    success: {
                      duration: 5000,
                    },
                  }}
                />
              </AosProvider>
            </ReduxProvider>
          </ChakraProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
