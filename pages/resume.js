import { useRouter } from "next/router";
import Head from "next/head";

//Translations
import translations from "../languages/translations";

export default function Resume() {
  const router = useRouter();
  const t = translations[router.locale];

  return (
    <section>
      <Head>
        <title>{t.resume} - Gabriel Molter</title>
        <meta property="og:url" content="https://gabrielmolter.com/resume" />
      </Head>
      <h1>{t.resume}</h1>
      <div className="subtitleContainer">
        <h2>{t.summary}</h2>
        <img src="/img/rocket.svg" alt={t.rocket} aria-hidden="true" />
      </div>
      <ul className="listResume">
        <li>{t.fullstackDev}</li>
        <li>{t.experienceYears}</li>
        <li>{t.successfullApps}</li>
        <li>{t.successfullSites}</li>
      </ul>
      <div className="subtitleContainer">
        <h2>{t.workExperience}</h2>
        <img src="/img/work-experience.svg" alt={t.manWithTie} aria-hidden="true" />
      </div>
      <ul className="listResume">
        <li>
          <strong>{t.webDev}</strong> | 2014 - {t.present}
          <br />
          <strong>Freelancer</strong>
        </li>
        <p>{t.freelancerDesc}</p>
        <li>
          <strong>{t.webDev}</strong> | 2021 - {t.present}
          <br />
          <strong>Ballistic Arts</strong>
        </li>
        <p>{t.baDesc}</p>
        <li>
          <strong>{t.webDevTrainee}</strong> | {t.webDevTraineeTimeframe}
          <br />
          <strong>Ápia Consultoria &amp; Sistemas</strong> | {t.petropolis}
        </li>
        <p>{t.apiaDesc}</p>
      </ul>
      <div className="subtitleContainer">
        <h2>{t.education}</h2>
        <img src="/img/education.svg" alt={t.mortarboard} aria-hidden="true" />
      </div>
      <ul className="listResume">
        <li>
          <strong>{t.computerStudies}</strong> | {t.computerStudiesTimeframe}
          <br />
          <strong>Langara College</strong> | Vancouver, {t.canada}
        </li>
        <li>
          <strong>{t.infoTech}</strong> | {t.infoTechTimeframe}
          <br />
          <strong>Canadian College</strong> | Vancouver, {t.canada}
        </li>
        <li>
          <strong>Advanced Business Management</strong> | {t.abmTimeframe}
          <br />
          <strong>Sprott Shaw</strong> | Vancouver, {t.canada}
        </li>
        <li>
          <strong>Web Front-End</strong> | {t.webFrontendTimeframe}
          <br />
          <strong>Instituto Infnet</strong> | {t.rio}
        </li>
      </ul>
      <div className="subtitleContainer">
        <h2>{t.languages}</h2>
        <img src="/img/languages.svg" alt={t.talkingBubble} aria-hidden="true" />
      </div>
      <div className="iconAndText">
        <div>
          <img src="/img/canada-flag.svg" alt={t.canadianFlag} aria-hidden="true" />
          <span>{t.english}</span>
        </div>
        <div>
          <img src="/img/brazil-flag.svg" alt={t.brazilFlag} aria-hidden="true" />
          <span>{t.portuguese}</span>
        </div>
      </div>
      <div className="subtitleContainer">
        <h2>{t.itskills}</h2>
        <img src="/img/skills.svg" alt={t.laptopWCode} aria-hidden="true" />
      </div>
      <ul className="listResume">
        <li>HTML &amp; CSS</li>
        <li>JavaScript</li>
        <li>ReactJS &amp; NextJS</li>
        <li>NodeJS</li>
        <li>Git</li>
        <li>UI &amp; UX</li>
        <li>{t.graphicDesign}</li>
      </ul>
      <div className="subtitleContainer">
        <h2>{t.certifications}</h2>
        <img src="/img/certifications.svg" alt={t.badge} aria-hidden="true" />
      </div>
      <div className="iconAndText">
        <a
          href="https://www.youracclaim.com/badges/73c5d0e8-9412-427f-86dc-a155cc276c20/public_url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/img/microsoft-brands.svg" alt="Microsoft logo" aria-hidden="true" />
          <span>
            Microsoft 70-480: Programming in HTML5 with JavaScript and CSS3
          </span>
        </a>
      </div>
    </section>
  );
}
