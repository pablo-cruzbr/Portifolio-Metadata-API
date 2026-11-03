"use client";

import UsFlag from "@/components/Helper/UsFlag";
import { useLang } from "@/context/LanguageContext";

/** "Borderless Labs (EUA)" with the US flag, wherever the blog names the Labs. */
export default function BorderlessLabsBadge() {
  const { lang } = useLang();
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white">
      <UsFlag className="h-3 w-auto rounded-[2px]" />
      Borderless Labs ({lang === "en" ? "USA" : "EUA"})
    </span>
  );
}
