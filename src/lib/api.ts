"use client";

import { supabase } from "./clientSupabase";

export async function getProduct(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
