import Button from "@/components/Button";
import Image from "next/image";
import { HomeIcon } from "@heroicons/react/24/solid";
import { getLang } from "@/lib/cookies";

const dictionary = {
  pt: {
    title: "Como é que você chegou aqui?",
    subtitle: "Página não encontrada",
    description:
      "Talvez você tenha digitado a URL errada ou clicado num link quebrado. Tente voltar para a página inicial.",
    backToHome: "Voltar",
  },
  en: {
    title: "how did you even get here?",
    subtitle: "Page not found",
    description: "The page you are looking for does not exist.",
    backToHome: "Back",
  },
};

export default async function NotFound() {
  const lang = await getLang();
  const notFound = dictionary[lang];

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 max-w-3xl mx-auto px-4 py-12 w-full">
      <div>
        <Image src="/img/not-found.gif" alt="Confused John Travolta from the movie Pulp Fiction" width={200} height={200} className="rounded-full bg-orange border-2 border-orange" priority />
      </div>
      <span className="text-orange font-bold">{notFound.title}</span>
      <h1 className="text-3xl font-bold">{notFound.subtitle}</h1>
      <p className="text-lightgray text-balance text-center">
        {notFound.description}
      </p>
      <Button href={`/${lang}`} className="mt-4">
        <HomeIcon className="size-5" />
        {notFound.backToHome}
      </Button>
    </div>
  );
}
