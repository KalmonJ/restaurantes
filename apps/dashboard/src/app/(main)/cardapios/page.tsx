import { PageBreadcrumb } from "@/components/breadcrumb";
import { Menus } from "@/features/menus";

export default function Page() {
  return (
    <section className="w-full h-full flex flex-col gap-4 p-8">
      <PageBreadcrumb />
      <Menus />
    </section>
  );
}
