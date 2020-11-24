import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

//Translations
import translations from "../languages/translations";

export default function Home() {
  const router = useRouter();
  const t = translations[router.locale];

  function getMyAge() {
    var today = new Date();
    var birthDate = new Date("1997-11-18");
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <section>
      <Head>
        <title>Gabriel Molter</title>
      </Head>
      <div className="faceCircle" />
      <h1>{t.heyMyName}.</h1>
      <p>
        {t.inAHurry}
        <Link href="/portfolio">Portfolio</Link>.
      </p>
      <p>
        {`${t.beforeAge} ${getMyAge()}${t.afterAge} `}
        <a
          href="https://www.google.com.br/maps/place/Petr%C3%B3polis,+RJ/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Petrópolis, Brazil
        </a>
        , {`${t.currentlyLiving} `}
        <a
          href="https://www.google.com.br/maps/place/Vancouver,+BC"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vancouver, Canada
        </a>
        .<br />
        <br />
        {t.startedWorking}
        <br />
        <br />
        {t.alsoIn2011}
        <br />
        <br />
        {`${t.in2015} `}
        <a
          href="https://www.youracclaim.com/badges/73c5d0e8-9412-427f-86dc-a155cc276c20/public_url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.microsoftCertificate}
        </a>
        .<br />
        <br />
        {t.asOfToday}
      </p>
    </section>
  );
}
