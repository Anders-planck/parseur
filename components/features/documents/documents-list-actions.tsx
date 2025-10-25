"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function DocumentsListActions() {
  const tNav = useTranslations("nav");

  return (
    <div className="flex justify-end">
      <Link href="/dashboard/upload">
        <Button>{tNav("upload")}</Button>
      </Link>
    </div>
  );
}
