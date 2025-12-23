"use client";

import { useEffect } from "react";
import { MainLayout } from "@/components/templates";
import { Button } from "@/components/atoms";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MainLayout>
      <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-6xl font-bold text-muted-foreground">500</h1>
        <h2 className="mb-4 text-2xl font-semibold">Something went wrong!</h2>
        <p className="mb-8 text-muted-foreground">
          An error occurred while processing your request.
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </MainLayout>
  );
}
