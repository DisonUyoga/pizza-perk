"use client";
import { useUser } from "@clerk/nextjs";
import Loading from "../loading";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { supabase } from "@/lib/clientSupabase";
import { useAppDispatch } from "@/lib/hook";
import {
  processingAuth,
  sessionToken,
  setAdmin,
  setProfileData,
  setUser,
} from "@/features/slices/AuthSlice";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

const SupabaseAuth = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const loginUser = async () => {
      if (user) {
        await googleSignIn(
          user.emailAddresses[0].emailAddress,
          user.fullName as string
        );
      }
    };
    loginUser();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) {
    return <Loading />;
  }

  if (!isSignedIn) {
    toast.error("Your not sign in");
    return router.push("/sign-in");
  }

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
      }
      return router.push("/");
    }
  }
  return (
    <Box minHeight="100vh">
      <p>Welcome, {user.firstName}!</p>
    </Box>
  );
};

export default SupabaseAuth;
