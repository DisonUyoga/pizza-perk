"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import { ReactNode, useState } from "react";
import React from "react";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient({}));
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {children}
        
      </QueryClientProvider>
    </div>
  );
};

export default QueryProvider;
