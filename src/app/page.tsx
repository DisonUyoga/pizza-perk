import { createClient } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import Loading from "./loading";
import { Suspense } from "react";
import { Stack } from "@chakra-ui/react";
import Offer from "@/components/Offer";
import Featured from "@/components/Featured";
import Slider from "@/components/Slider";
import Error from "./error";
import HeroSlider from "@/components/Carousel";

interface HomeProps {
  searchParams: {
    session: string;
  };
}

export default async function Home() {
  const user = await currentUser();
  const { data: session, error: sessionError } =
    await createClient().auth.getSession();
  // check whether clerk user is logged in

  if (!user) {
    await createClient().auth.signOut();
    return redirect("/sign-in");
  }
  // if (!session.session) {
  //   return redirect("/sign-in");
  // }
  const { data, error } = await createClient()
    .from("products")
    .select("*, categories(*)")
    .order("created_at", { ascending: false });
  const { data: delivery, error: deliveryError } = await createClient()
    .from("delivery")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <ErrorBoundary
      fallback={<Error name={error?.code} message={error?.message} />}
    >
      <Suspense fallback={<Loading />}>
        {data && delivery && data?.length > 0 && delivery?.length > 0 && (
          <Stack bg={"#161622"} flex={1} minHeight="100vh">
            <Offer delivery={delivery as any} products={data} />

            <HeroSlider products={data} />

            <Slider />
          </Stack>
        )}
      </Suspense>
    </ErrorBoundary>
  );
}
