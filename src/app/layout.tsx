import AosProvider from "@/components/AosProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./custom-slick.css";
import { createClient } from "@/lib/supabase";
import { ChakraProvider, Stack } from "@chakra-ui/react";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import "aos/dist/aos.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import QueryProvider from "@/lib/QueryProvider";
import { ReduxProvider } from "@/components/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PizzaPerk",
  description:
    "Discover PizzaPerk: Your Crave-Worthy Shortcut to Delicious Pizza Bliss!",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const user = await currentUser();
  const { data: session, error: sessionError } =
    await createClient().auth.getSession();
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          <ClerkProvider>
            <QueryProvider>
              <ChakraProvider>
                <AosProvider>
                  <Stack minHeight="100vh" bg={"#161622"}>
                    <Navbar />
                    <Stack>
                      {props.children}
                      {props.modal}
                      <div id="modal-root" />
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
              </ChakraProvider>
            </QueryProvider>
          </ClerkProvider>
        </body>
      </html>
    </ReduxProvider>
  );
}
