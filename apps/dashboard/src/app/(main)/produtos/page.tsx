import { PageBreadcrumb } from "@/components/breadcrumb";
import { Products } from "@/features/products";

export default function Page() {
  return (
    <section className="w-full h-full flex flex-col gap-4 p-8">
      <PageBreadcrumb />
      <Products />
    </section>
  );
}
