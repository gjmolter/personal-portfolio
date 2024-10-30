import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

//Styles
import "../styles/main.scss";

//Translations
import translations from "../languages/translations";

function App({ Component, pageProps }) {
  const router = useRouter();
  const t = translations[router.locale];

  const refHome = useRef(null);
  const refResume = useRef(null);
  const refPortfolio = useRef(null);
  const refHireMe = useRef(null);

  useEffect(() => {
    console.log(t.checkingCode);
    console.log(t.availableOnGit);
    console.log("https://github.com/gjmolter/personal-portfolio");
  }, []);

  useEffect(() => {
    if (window) {
      window.plausible = window.plausible || function () {
        (window.plausible.q = window.plausible.q || []).push(arguments)
      }
    }

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

      if (router.pathname === "/") {
        refHome.current.classList.add("currentPage");
      }
      if (router.pathname.includes("/resume")) {
        refResume.current.classList.add("currentPage");
      }
      if (router.pathname.includes("/portfolio")) {
        refPortfolio.current.classList.add("currentPage");
      }
      if (router.pathname.includes("/hireMe")) {
        refHireMe.current.classList.add("currentPage");
      }

    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
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

        <meta property="og:title" content="Gabriel Molter" />
        <meta
          property="og:description"
          content="Freelance Experienced Web Developer"
        />
        <meta
          property="og:image"
          content="https://gabrielmolter.com/shareImg.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <nav>
        <ul className="navbar">
          <li className="navbarItem" aria-hidden="true">
            <button className="doubleArrows">
              <img src="/img/angle-double-right-solid.svg" alt="" />
              <span>Gabriel Molter</span>
            </button>
          </li>
          <li className="navbarItem">
            <Link href="/" ref={refHome}>
              <img src="/img/fingerprint-solid.svg" alt={t.biography} />
              <span>Bio</span>
            </Link>
          </li>
          <li className="navbarItem">
            <Link href="/resume" id="resumeLink" ref={refResume}>
              <img src="/img/id-card-solid.svg" alt={t.resume} />
              <span>{t.resume}</span>
            </Link>
          </li>
          <li className="navbarItem">
            <Link href="/portfolio" ref={refPortfolio}>
              <img src="/img/code-solid.svg" alt="Portfolio" />
              <span>Portfolio</span>
            </Link>
          </li>
          <li className="navbarItem">
            <Link href="/hireMe" ref={refHireMe}>
              <img src="/img/envelope-open-text-solid.svg" alt={t.hireme} />
              <span>{t.hireme}</span>
            </Link>
          </li>
          <li className="navbarItem social startSocialMedia">
            <a
              href="https://github.com/gjmolter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/img/github-square-brands.svg" alt="GitHub" />
              <span>GitHub</span>
            </a>
          </li>
          <li className="navbarItem social">
            <a
              href="https://br.linkedin.com/in/gjmolter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/img/linkedin-brands.svg" alt="LinkedIn" />
              <span>LinkedIn</span>
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
                <img src="/img/github-square-brands.svg" alt="GitHub" />
              </a>
            </li>
            <li className="navbarItem">
              <a
                href="https://br.linkedin.com/in/gjmolter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/img/linkedin-brands.svg" alt="LinkedIn" />
              </a>
            </li>
            <li className="navbarItem">
              <a
                href="https://www.behance.net/gjmolter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/img/behance-square-brands.svg" alt="Behance" />
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
                src={router.locale == "en" ? "/img/brazil-flag.svg" : "/img/canada-flag.svg"}
                alt={t.getInLang}
              />
              <span> {t.languageName}</span>
            </a>
          </p>
        </footer>
        <script defer data-domain="gabrielmolter.com" src="https://analytics.chillycapybara.com/js/script.file-downloads.outbound-links.js"></script>
      </main>
    </>
  );
}

export default App;
