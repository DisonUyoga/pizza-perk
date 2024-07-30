import { useQuery } from "@tanstack/react-query";
import { getProduct } from "./api";


export function useGetProduct(id: string | undefined) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id as string),
  });

  return { data, isLoading, error };
}

