import Link from "next/link";
import { useTranslations } from "next-intl";
import { MainLayout } from "@/components/templates";
import { Button } from "@/components/atoms";

export default function NotFound() {
  const t = useTranslations("common");

  return (
    <MainLayout>
      <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">{t("notFound")}</h2>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <Button>{t("home")}</Button>
        </Link>
      </div>
    </MainLayout>
  );
}
