import { PageBreadcrumb } from "@/components/breadcrumb";
import { Orders } from "@/features/orders";

export default function Page() {
  return (
    <section className="w-full h-full flex flex-col gap-4 p-8">
      <PageBreadcrumb />
      <Orders />
    </section>
  );
}
