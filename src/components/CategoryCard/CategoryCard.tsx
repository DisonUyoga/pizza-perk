import { Tables } from "@/database.types";
import { useSupabaseImageDownLoader } from "@/lib/useSupabaseImageDownLoader";
import Link from "next/link";
import React from "react";
import { menu } from "@/data";
import ProductImage from "@/components/ProductImage";
import Spinner from "@/components/ui/Spinner";
interface CategoryCardProps {
  category: Tables<"categories">;
}
const CategoryCard = ({ category }: CategoryCardProps) => {
  const image = useSupabaseImageDownLoader(category.image as string);
  return (
    <Link href={`/menu/${category.id}`} key={category.id} className="w-full">
      {category.image && menu[0].img ? (
        <div className="relative md:w-[30vw] md:h-[50vh] bg-transparent">
          <ProductImage fallback={menu[0].img} path={category.image} />
        </div>
      ) : (
        <Spinner />
      )}
    </Link>
  );
};

export default CategoryCard;
