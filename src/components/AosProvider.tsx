"use client";
import Aos from "aos";
import React, { ReactNode, useEffect } from "react";

const AosProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    Aos.init();
  }, []);
  return <div>{children}</div>;
};

export default AosProvider;
