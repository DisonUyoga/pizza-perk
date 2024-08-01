"use client";
import { PizzaSize } from "@/type";
import React from "react";
interface SelectSizeProps {
  sizes: PizzaSize;
  handleSelected: (size: PizzaSize) => void;
  selected: PizzaSize | null;
}
const Size = ({ sizes, handleSelected, selected }: SelectSizeProps) => {
 
  return <div onClick={() => handleSelected(sizes)}>t</div>;
};

export default Size;
