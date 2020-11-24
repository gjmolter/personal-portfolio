import { useRouter } from "next/router";
import Head from "next/head";

//Images
import imgRocket from "../img/rocket.svg";
import imgWork from "../img/work-experience.svg";
import imgEducation from "../img/education.svg";
import imgLanguages from "../img/languages.svg";
import imgCanada from "../img/canada-flag.svg";
import imgBrazil from "../img/brazil-flag.svg";
import imgSkills from "../img/skills.svg";
import imgCertifications from "../img/certifications.svg";
import imgMicrosoft from "../img/microsoft-brands.svg";

//Translations
import translations from "../languages/translations";

export default function Resume() {
  const router = useRouter();
  const t = translations[router.locale];

  return (
    <section>
      <Head>
        <title>{t.resume} - Gabriel Molter</title>
      </Head>
      <h1>{t.resume}</h1>
      <div className="subtitleContainer">
        <h2>{t.summary}</h2>
        <img src={imgRocket} alt={t.rocket} aria-hidden="true" />
      </div>
      <ul className="listResume">
        <li>{t.fullstackDev}</li>
        <li>{t.experienceYears}</li>
        <li>{t.successfullApps}</li>
      </ul>
      <div className="subtitleContainer">
        <h2>{t.workExperience}</h2>
        <img src={imgWork} alt={t.manWithTie} aria-hidden="true" />
      </div>
      <ul className="listResume">
        <li>
          <strong>{t.webDev}</strong> | 2014 - {t.present}
          <br />
          <strong>Freelancer</strong>
        </li>
        <p>{t.freelancerDesc}</p>
        <li>
          <strong>{t.webDevTrainee}</strong> | {t.webDevTraineeTimeframe}
          <br />
          <strong>Ápia Consultoria &amp; Sistemas</strong> | {t.petropolis}
        </li>
        <p>{t.apiaDesc}</p>
      </ul>
      <div className="subtitleContainer">
        <h2>{t.education}</h2>
        <img src={imgEducation} alt={t.mortarboard} aria-hidden="true" />
      </div>
      <ul className="listResume">
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
        <img src={imgLanguages} alt={t.talkingBubble} aria-hidden="true" />
      </div>
      <div className="iconAndText">
        <div>
          <img src={imgCanada} alt={t.canadianFlag} aria-hidden="true" />
          <span>{t.english}</span>
        </div>
        <div>
          <img src={imgBrazil} alt={t.brazilFlag} aria-hidden="true" />
          <span>{t.portuguese}</span>
        </div>
      </div>
      <div className="subtitleContainer">
        <h2>{t.itskills}</h2>
        <img src={imgSkills} alt={t.laptopWCode} aria-hidden="true" />
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
        <img src={imgCertifications} alt={t.badge} aria-hidden="true" />
      </div>
      <div className="iconAndText">
        <a
          href="https://www.youracclaim.com/badges/73c5d0e8-9412-427f-86dc-a155cc276c20/public_url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={imgMicrosoft} alt="Microsoft logo" aria-hidden="true" />
          <span>
            Microsoft 70-480: Programming in HTML5 with JavaScript and CSS3
          </span>
        </a>
      </div>
    </section>
  );
}
