"use server";

import { createClient } from "@/lib/supabase";

export async function downloadImage(path: string) {
  if (!path) return;
  let loadedImage: string | ArrayBuffer | null = "";
  const { data, error } = await createClient()
    .storage.from("product-images")
    .download(path);
  if (error) return;
  const imageBuffer = await data.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString("base64");
  const imageSrc = `data:image/jpeg;base64,${base64Image}`;

  return imageSrc;
}
