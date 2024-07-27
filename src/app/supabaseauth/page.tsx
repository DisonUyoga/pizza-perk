import React, { Suspense } from "react";
import { currentUser, auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import Error from "../error";
import { Box } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import Loading from "../loading";

const SupabaseAuth = async () => {
  const user = await currentUser();

  if (user?.emailAddresses[0].emailAddress && user?.fullName) {
    const { data, error } = await createClient().auth.signUp({
      email: user?.emailAddresses[0].emailAddress,
      password: user.fullName,
    });
    if (data || "User already registered") {
      const { data, error } = await createClient().auth.signInWithPassword({
        email: user?.emailAddresses[0].emailAddress,
        password: user.fullName,
      });

      if (error)
        return (
          <Box minHeight="100vh" className="h-screen">
            <Error
              name={"Something went wrong please try again"}
              message={error.message}
            />
          </Box>
        );
      return redirect("/");
    }
  }

  return (
    <ErrorBoundary
      fallback={
        <Error name={"Something went wrong please try again"} message="" />
      }
    >
      <Suspense fallback={<Loading />}>
        <Box minHeight="100vh" className="h-screen"></Box>
      </Suspense>
    </ErrorBoundary>
  );
};

export default SupabaseAuth;
