import { PageBreadcrumb } from "@/components/breadcrumb";
import { Detail } from "@/features/menus/detail";

export default function Page() {
  return (
    <section className="w-full h-full flex flex-col gap-4 p-8">
      <PageBreadcrumb />
      <Detail />
    </section>
  );
}
