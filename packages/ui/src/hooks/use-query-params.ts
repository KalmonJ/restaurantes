import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const newParams = new URLSearchParams(searchParams.toString());

  return {
    delete(key: string) {
      newParams.delete(key);
      router.push(`${pathname}?${newParams.toString()}`);
    },

    set(key: string, value: unknown) {
      newParams.set(key, String(value));
      router.push(`${pathname}?${newParams.toString()}`);
    },
    get(key: string) {
      return newParams.get(key);
    },
  };
};
