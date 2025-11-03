"use client";

import Button from "@/components/Button";
import { Lang } from "@/lib/consts";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type DownloadStatus = "idle" | "loading" | "error";

const dictionary = {
  en: {
    download: "Download PDF Resume",
  },
  pt: {
    download: "Baixar currículo em PDF",
  },
};

const downloadPDF = async (lang: string) => {
  const res = await fetch(`/api/resume?lang=${lang}`);
  if (!res.ok) throw new Error("Failed to generate PDF");

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `gabriel-molter-${lang}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
};

const DownloadResume = ({ lang }: { lang: Lang }) => {
  const [status, setStatus] = useState<DownloadStatus>("idle");
  const dict = dictionary[lang];

  const handleDownload = async () => {
  if (status === "loading") return;
  setStatus("loading");

  try {
    await downloadPDF(lang);
    setStatus("idle");
  } catch (e) {
    console.error("Failed to download PDF", e);
    setStatus("error");
  }
};

  return <Button
  onClick={handleDownload}
  className="translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange"
  variant="icon"
  aria-label={dict.download}
  loading={status === "loading"}
  disabled={status === "loading"}
>
  {status === "error" ? "Error. Try again" : (
    <ArrowDownTrayIcon className="w-5 h-5" aria-hidden="true" />
  )}
</Button>
};

export default DownloadResume;