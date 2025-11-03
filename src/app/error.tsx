"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useLang } from "@/components/hooks/LangProvider";
import { ArrowPathIcon, HomeIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import React from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const dictionary = {
  pt: {
    title: "Um erro aconteceu... (provavelmente eu quebrei alguma coisa no código)",
    description: "Tente novamente ou volte para a página inicial.",
    sendLogsMessage: "Quer me ajudar a resolver o problema enviando um relatório de erro?",
    pullRequestMessage: "ou então já envia um pull request logo, por mim tudo bem",
    sendLogs: "Enviar",
    button: "Tentar novamente",
    backToHome: "Voltar",
  },
  en: {
    title: "An error happened... (I probably messed something up in the code)",
    description: "Try again or go back to the home page.",
    sendLogsMessage: "Want to help me fix this by sending an error report?",
    pullRequestMessage: "or just go ahead and send a pull request, I won't mind",
    sendLogs: "Send",
    button: "Try again",
    backToHome: "Back",
  },
};

export default function Error({ error, reset }: ErrorProps) {
  console.error(error);
  const { lang } = useLang();
  const dict = dictionary[lang];

  const errorInfo = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    referrer: document.referrer || null,
    message: error.message,
    stack: error.stack,
    digest: error.digest ?? null,
    cause: error.cause ?? null,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    viewport: `${innerWidth}×${innerHeight}`,
    screen: `${screen.width}×${screen.height}`,
  } as const;

  type RequestStatus = "idle" | "loading" | "success" | "error";
  const [status, setStatus] = React.useState<RequestStatus>("idle");

  const handleSendLogs = async () => {
    if (status === "loading" || status === "success") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/error", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(errorInfo),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch (e) {
      console.error("Failed to send error report", e);
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 max-w-3xl mx-auto px-4 py-12 w-full">
      <div>
        <Image
          src="/img/error.gif"
          alt="Old style computer error windows"
          width={200}
          height={200}
          className="rounded-full bg-orange border-2 border-orange"
          priority
        />
      </div>
      <span className="text-orange font-bold text-center">{dict.title}</span>
      <h1 className="text-xl font-bold text-center text-balance">{dict.description}</h1>
      <div className="flex flex-row gap-4">
        <Button onClick={() => reset()} className="mt-4" variant="secondary">
          <ArrowPathIcon className="size-5" />
          {dict.button}
        </Button>
        <Button href={`/${lang}`} className="mt-4">
          <HomeIcon className="size-5" aria-hidden="true" />
          {dict.backToHome}
        </Button>
      </div>
      <div className="flex flex-col gap-2 bg-darkblue rounded-md mt-8 text-sm max-w-2xl w-full relative ring-1 ring-white/10 has-[details[open]]:ring-orange hover:ring-orange transition-all duration-300">
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br opacity-50 from-white/5 to-white/0 group-hover:opacity-75 transition-all duration-300" />
        {status !== "success" ? (
          <details>
            <summary className="text-lightgray cursor-pointer text-balance p-6 text-center">
              {dict.sendLogsMessage}
            </summary>
            <pre className="text-medgray overflow-x-auto no-scrollbar px-6">
              {Object.entries(errorInfo)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n")}
            </pre>

            <Button
              onClick={handleSendLogs}
              className="mt-8 max-w-fit mx-auto mb-6"
              loading={status === "loading"}
              disabled={status === "loading"}
            >
              {status === "error" ? (
                "Try again"
              ) : (
                <>
                  <PaperAirplaneIcon className="size-5" />
                  {dict.sendLogs}
                </>
              )}
            </Button>
          </details>
        ) : (
          <p className="text-green-400 text-center">✅ Logs sent successfully. Thank you!</p>
        )}
        <p className="text-lightgray text-center text-sm mb-8">({dict.pullRequestMessage})</p>
      </div>
    </div>
  );
}
