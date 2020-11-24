import imgRocket from "../img/rocket.svg";
import imgWork from "../img/work-experience.svg";
import imgEducation from "../img/education.svg";
import imgLanguages from "../img/languages.svg";
import imgCanada from "../img/canada-flag.svg";
import imgBrazil from "../img/brazil-flag.svg";
import imgSkills from "../img/skills.svg";
import imgCertifications from "../img/certifications.svg";
import imgMicrosoft from "../img/microsoft-brands.svg";

export default function Resume() {
  return (
    <section>
      <h1>Resumé</h1>
      <div className="subtitleContainer">
        <h2>Summary</h2>
        <img src={imgRocket} alt="Rocket" aria-hidden="true" />
      </div>
      <ul className="listResume">
        <li>Full-stack developer, creative, fast learner and proactive.</li>
        <li>More than 6 years of software development experience.</li>
        <li>
          Published 2 successful apps on the  AppStore, one of them reaching
          Education Top 10 for Brazil in 2014.
        </li>
      </ul>
      <div className="subtitleContainer">
        <h2>Work Experience</h2>
        <img src={imgWork} alt="Man with tie" aria-hidden="true" />
      </div>
      <ul className="listResume">
        <li>
          <strong>Web Developer​</strong> | 2014 - Present
          <br />
          <strong>Freelancer</strong>
        </li>
        <p>
          {" "}
          I've worked on web and mobile projects for different companies both in
          Canada and Brazil. Some of these projects are displayed on my
          portfolio page.
        </p>
        <li>
          <strong>Web Developer Trainee</strong> | November 2015 - June 2016
          <br />
          <strong>Ápia Consultoria &amp; Sistemas</strong> | Petrópolis, Brazil
        </li>
        <p>
          {" "}
          Here I've created ecommerce websites using CiaShop framework, HTML,
          CSS and JS. I was also helping other teams with different technologies
          when needed (iOS development, mostly). My team's main goal was to
          develop conversion-oriented front-ends that were easy to maintain,
          with clean and readable code.
        </p>
      </ul>
      <div className="subtitleContainer">
        <h2>Education</h2>
        <img src={imgEducation} alt="Mortarboard" aria-hidden="true" />
      </div>
      <ul className="listResume">
        <li>
          <strong>Information Technology</strong> | October 2017 - Present
          <br />
          <strong>Canadian College</strong> | Vancouver, Canada
        </li>
        <li>
          <strong>Advanced Business Administration</strong> | August 2016 -
          August 2017
          <br />
          <strong>Sprott Shaw</strong> | Vancouver, Canada
        </li>
        <li>
          <strong>Web Front-End</strong> | May 2014 - November 2014
          <br />
          <strong>Instituto Infnet</strong> | Rio de Janeiro, Brazil
        </li>
      </ul>
      <div className="subtitleContainer">
        <h2>Languages</h2>
        <img
          src={imgLanguages}
          alt="Comics talking bubble"
          aria-hidden="true"
        />
      </div>
      <div className="iconAndText">
        <div>
          <img src={imgCanada} alt="Canadian flag" aria-hidden="true" />
          <span>English</span>
        </div>
        <div>
          <img src={imgBrazil} alt="Brazilian flag" aria-hidden="true" />
          <span>Portuguese</span>
        </div>
      </div>
      <div className="subtitleContainer">
        <h2>IT Skills</h2>
        <img src={imgSkills} alt="Laptop with code" aria-hidden="true" />
      </div>
      <ul className="listResume">
        <li>HTML &amp; CSS</li>
        <li>JavaScript</li>
        <li>ReactJS &amp; NextJS</li>
        <li>NodeJS</li>
        <li>Git</li>
        <li>UI &amp; UX</li>
        <li>Graphic Design</li>
      </ul>
      <div className="subtitleContainer">
        <h2>Certifications</h2>
        <img src={imgCertifications} alt="Badge" aria-hidden="true" />
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
