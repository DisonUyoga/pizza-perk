"use client";
import { useSupabaseImageDownLoader } from "@/lib/useSupabaseImageDownLoader";
import Image from "next/image";

type RemoteImageProps = {
  path?: string;
  fallback: string;
  radius?: string;
};

const ProductImage = ({ path, fallback, radius }: RemoteImageProps) => {
  const image = useSupabaseImageDownLoader(path);

  if (!image) {
  }

  return (
    <div>
      {image ? (
        <Image src={image} alt="" fill className="object-cover rounded" />
      ) : (
        <Image
          src={fallback}
          alt=""
          fill
          className={`object-cover rounded`}
          style={{
            filter: "blur(20px)",
          }}
        />
      )}
    </div>
  );
};

export default ProductImage;
