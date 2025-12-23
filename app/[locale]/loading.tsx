import { MainLayout } from "@/components/templates";

export default function Loading() {
  return (
    <MainLayout>
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    </MainLayout>
  );
}
