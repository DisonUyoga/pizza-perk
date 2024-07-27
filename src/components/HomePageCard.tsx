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

  function addProductToCart(product: Tables<"products">) {
    if (!product) return;

    if (determineIfItemIsPizza) {
      dispatch(addToCart({ product, size: "XL" }));
    } else {
      dispatch(addToCart({ product, size: null }));
    }

    toast.success("item added to cart");

    // router.push(`/product/${product.id}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }} // Scale up slightly on hover
      transition={{ duration: 0.05 }}
      className={s.card}
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      data-aos-duration="1500"
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
      <div className={s.card_body}>
        <h1 className={s.card_title}>{product.name}</h1>
        <p className={s.card_desc}>{product.description}</p>
        <span className={s.card_price}>{priceTag(product.price)}</span>
        <Button variant="slim" onClick={() => addProductToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default HomePageCard;
