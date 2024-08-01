"use client";
import { Tables } from "@/database.types";
import { useState } from "react";
import s from "../components/Featured/Featured.module.css";
import { featuredProducts } from "@/data";
import { priceTag } from "@/lib/priceTage";
import Button from "./HomeButton";
import ProductImage from "./ProductImage";
import { addToCart } from "@/features/slices/cartSlice";
import { useAppDispatch } from "@/lib/hook";
import { useRouter } from "next/navigation";
import { isNewProduct } from "@/lib/isNewProduct";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Link from "next/link";
import PriceCard from "./PriceCard";
import { Box } from "@chakra-ui/react";

interface ProoductCardProps {
  product: Tables<"products">;
}
const HomePageCard = ({ product }: ProoductCardProps) => {
  const [image, setImage] = useState<string | null>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isNew = isNewProduct(product.created_at);
  const determineIfItemIsPizza = !!(
    product?.size_large ||
    product?.size_medium ||
    product?.size_small
  );

  return (
    <Link
      href={`/product/${product.id}`}
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      data-aos-duration="1500"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }} // Scale up slightly on hover
        transition={{ duration: 0.05 }}
        className={s.card}
      >
        {/* IMAGE CONTAINER */}
        {product.image && (
          <div className={s.img_container}>
            <ProductImage
              fallback={featuredProducts[0].img as string}
              path={product.image as string}
            />
          </div>
        )}
        {/* TEXT CONTAINER */}

        <Box
          position={"absolute"}
          top={2}
          w={"90%"}
          alignContent={"start"}
          justifyItems={"start"}
        >
          <PriceCard product={product} />
        </Box>
      </motion.div>
    </Link>
  );
};

export default HomePageCard;
