import Link from "next/link";
import { useRouter } from "next/router";

//Translations
import translations from "../languages/translations";

export default function NotFound() {
  const router = useRouter();
  const t = translations[router.locale];

  return (
    <section className="notFound">
      <div className="travolta">
        <img src="/img/johntravolta.gif" alt={t.confusedJohn} />
      </div>
      <h1>{t.thisIsEmbarrassing}</h1>
      <p>
        {t.howUGotHere}{" "}
        <span role="img" aria-hidden="true">
          😬
        </span>
      </p>
      <Link href="/" className="errBack">
        {t.backToHome}
      </Link>
    </section>
  );
}
