"use client";
import { testRedux } from "@/features/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import React from "react";

const Test = () => {
  const dispatch = useAppDispatch();
  const { test } = useAppSelector((state) => state.cart);
  return (
    <div onClick={() => dispatch(testRedux())}>
      <p className="">Testing redux {test}</p>
    </div>
  );
};

export default Test;
