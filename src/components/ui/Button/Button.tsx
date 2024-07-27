"use client";
import {
  processingAuth,
  sessionToken,
  setAdmin,
  setProfileData,
  setUser,
} from "@/features/slices/AuthSlice";
import { useAppDispatch } from "@/lib/hook";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { app } from "@/firebase";
import { supabase } from "@/lib/clientSupabase";

function ButtonComponent() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleGoogleClick = async () => {
    dispatch(processingAuth({ authLoading: true }));
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const name = result.user.displayName;
      const email = result.user.email;

      const photo = result.user.photoURL;

      if (!name || !email) return;

      googleSignIn(email, name);
    } catch (error) {
    } finally {
      dispatch(processingAuth({ authLoading: false }));
    }
  };

  async function googleSignIn(email: string, name: string) {
    dispatch(processingAuth({ authLoading: true }));

    try {
      const { error: supabaseError } = await supabase.auth.signUp({
        email,
        password: name,
      });
      if (!supabaseError?.message || "User already registered") {
        await login(email, name);
      } else {
        if (supabaseError?.message !== "User already registered") {
          toast(supabaseError?.message);
        }
      }
    } catch (error) {
    } finally {
      dispatch(processingAuth({ authLoading: false }));
    }
  }
  async function login(email: string, name: string) {
    const { error: supabaseErrorLogin } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: name,
      });
    if (!supabaseErrorLogin?.message) {
      const { data, error } = await supabase.auth.getSession();

      if (!error) {
        toast.success("login successfull");
        dispatch(
          sessionToken({
            session: {
              email: email,
              name: name,
            },
          })
        );
        dispatch(setUser({ user: data.session }));
        dispatch(processingAuth({ authLoading: false }));
        if (data.session) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.session.user.id)
            .single();

          dispatch(setProfileData({ profile: profileData }));
          dispatch(
            setAdmin({ isAdmin: profileData?.group === "ADMIN" ? true : false })
          );
          dispatch(processingAuth({ authLoading: false }));
        }
        router.push(`/?session=${data.session}`);
      }
      return;
    }
  }

  return (
    <Button
      colorScheme="white"
      variant="outline"
      borderColor={"#FF9C01"}
      onClick={async () => {
        await handleGoogleClick();
      }}
    >
      <Flex
        direction={"row"}
        w={"100%"}
        alignContent={"center"}
        justifyContent={"space-between"}
        columnGap={1}
      >
        <Image
          borderRadius="full"
          boxSize="20px"
          src="/google.png"
          alt="google login"
        />
        <Text fontSize={"xs"} color={"#FF9C01"}>
          Login with Google
        </Text>
      </Flex>
    </Button>
  );
}

export default ButtonComponent;
