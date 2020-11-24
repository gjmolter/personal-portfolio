import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

//Styles
import "../styles/main.scss";

//Images
import imgDoubleRight from "../img/angle-double-right-solid.svg";
import imgFingerprint from "../img/fingerprint-solid.svg";
import imgIdCard from "../img/id-card-solid.svg";
import imgCode from "../img/code-solid.svg";
import imgEnvelope from "../img/envelope-open-text-solid.svg";
import imgGithub from "../img/github-square-brands.svg";
import imgLinkedin from "../img/linkedin-brands.svg";
import imgBehance from "../img/behance-square-brands.svg";
import imgBrazil from "../img/brazil-flag.svg";
import imgCanada from "../img/canada-flag.svg";

//Translations
import translations from "../languages/translations";

function App({ Component, pageProps }) {
  const router = useRouter();

  const refHome = useRef(null);
  const refResume = useRef(null);
  const refPortfolio = useRef(null);
  const refHireMe = useRef(null);

  const t = translations[router.locale];

  useEffect(() => {
    console.log(t.checkingCode);
    console.log(t.availableOnGit);
    console.log("https://github.com/gjmolter/personal-portfolio");
  }, []);

  useEffect(() => {
    if (
      refHome.current &&
      refResume.current &&
      refPortfolio.current &&
      refHireMe.current
    ) {
      refHome.current.classList.remove("currentPage");
      refResume.current.classList.remove("currentPage");
      refPortfolio.current.classList.remove("currentPage");
      refHireMe.current.classList.remove("currentPage");

      switch (router.pathname) {
        case "/":
          refHome.current.classList.add("currentPage");
          break;
        case "/resume":
          refResume.current.classList.add("currentPage");
          break;
        case "/portfolio":
          refPortfolio.current.classList.add("currentPage");
          break;
        case "/hireme":
          refHireMe.current.classList.add("currentPage");
          break;

        default:
          break;
      }
    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Gabriel Molter</title>
        <meta
          name="description"
          content="Full-Stack Developer currently located in Vancouver, Canada. I am passionate about technology and innovation."
        />
        <meta
          name="keywords"
          content="React,NextJS,Developer,Vancouver,JS,HTML,CSS,JavaScript,NodeJs,jQuery,iOS,Mobile,Apps,Brazilian,Portuguese,Freelancer,English,Canada"
        />
        <meta name="author" content="Gabriel Molter" />
        <meta name="theme-color" content="#070b24" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gjmolter.com" />
      </Head>
      <nav>
        <ul className="navbar">
          <li className="navbarItem" aria-hidden="true">
            <button className="doubleArrows">
              <img src={imgDoubleRight} alt="" />
              <span>Gabriel Molter</span>
            </button>
          </li>
          <li className="navbarItem">
            <Link href="/">
              <a ref={refHome}>
                <img src={imgFingerprint} alt={t.biography} />
                <span>Bio</span>
              </a>
            </Link>
          </li>
          <li className="navbarItem">
            <Link href="/resume" id="resumeLink">
              <a ref={refResume}>
                <img src={imgIdCard} alt={t.resume} />
                <span>{t.resume}</span>
              </a>
            </Link>
          </li>
          <li className="navbarItem">
            <Link href="/portfolio">
              <a ref={refPortfolio}>
                <img src={imgCode} alt="Portfolio" />
                <span>Portfolio</span>
              </a>
            </Link>
          </li>
          <li className="navbarItem">
            <Link href="/hireMe">
              <a ref={refHireMe}>
                <img src={imgEnvelope} alt={t.hireme} />
                <span>{t.hireme}</span>
              </a>
            </Link>
          </li>
          <li className="navbarItem social startSocialMedia">
            <a
              href="https://github.com/gjmolter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={imgGithub} alt="GitHub" />
              <span>GitHub</span>
            </a>
          </li>
          <li className="navbarItem social">
            <a
              href="https://br.linkedin.com/in/gjmolter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={imgLinkedin} alt="LinkedIn" />
              <span>LinkedIn</span>
            </a>
          </li>
          <li className="navbarItem social">
            <a
              href="https://www.behance.net/gjmolter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={imgBehance} alt="Behance" />
              <span>Behance</span>
            </a>
          </li>
        </ul>
      </nav>
      <main>
        <Component {...pageProps} />
        <footer aria-hidden="true">
          <ul className="socialBottom">
            <li className="navbarItem">
              <a
                href="https://github.com/gjmolter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={imgGithub} alt="GitHub" />
              </a>
            </li>
            <li className="navbarItem">
              <a
                href="https://br.linkedin.com/in/gjmolter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={imgLinkedin} alt="LinkedIn" />
              </a>
            </li>
            <li className="navbarItem">
              <a
                href="https://www.behance.net/gjmolter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={imgBehance} alt="Behance" />
              </a>
            </li>
          </ul>
          <p className="fontAwesome">
            {t.iconsFrom}{" "}
            <a
              href="https://fontawesome.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              FontAwesome
            </a>
          </p>
          <p className="languageSwitch">
            <a
              onClick={() => {
                router.push(router.pathname, router.pathname, {
                  locale: router.locale == "en" ? "pt-BR" : "en",
                });
              }}
            >
              <span>{t.seeThisIn} </span>
              <img
                src={router.locale == "en" ? imgBrazil : imgCanada}
                alt={t.getInLang}
              />
              <span> {t.languageName}</span>
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}

export default App;
