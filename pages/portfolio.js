import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";

//Images
import chooseProject from "../img/chooseProject.png";
import chooseProjectPTBR from "../img/chooseProjectPTBR.png";

//Translations
import translations from "../languages/translations";

export default function Portfolio() {
  const router = useRouter();
  const t = translations[router.locale];

  //LOGOS ARE 150x150 AND SCREENSHOTS ARE 1565x937
  const jobs = [
    {
      name: "RevoCalendar Component",
      tags: [t.all, t.allweb, "open source", "react"],
      link: "https://gjmolter.github.io/revo-calendar/",
      screenshot: "/screenshots/revoScreenshot.png",
      logo: "/portfolioLogos/logoRevoCalendar.png",
      label: "RevoCalendar React Component",
    },
    {
      name: "Dilua Lingerie",
      tags: [t.all, t.allweb, "react", "nextjs", "e-commerce"],
      link: "https://dilualingerie.com.br",
      screenshot: "/screenshots/diluaScreenshot.png",
      logo: "/portfolioLogos/logoDilua.png",
      label: "Dilua Lingerie E-Commerce",
    },
    {
      name: "Pix Charge",
      tags: [t.all, t.allweb, "open source"],
      link: "https://github.com/gjmolter/pix-charge",
      screenshot: "/screenshots/pixchargeScreenshot.png",
      logo: "/portfolioLogos/logoPixCharge.png",
      label: "Pix Charging Library",
    },
    {
      name: "Chilly Capybara",
      tags: [t.all, t.allweb, "react", "nextjs"],
      link: "https://chillycapybara.com",
      screenshot: "/screenshots/chillycapybaraScreenshot.png",
      logo: "/portfolioLogos/logoChilly.png",
      label: "Chilly Capybara Website",
    },
    {
      name: "Petrótica",
      tags: [t.all, t.allweb, "php"],
      link: "http://petrotica.com.br",
      screenshot: "/screenshots/petroticaScreenshot.png",
      logo: "/portfolioLogos/logoPetrotica.png",
      label: "Petrótica Website",
    },
    {
      name: "Tribuna de Petrópolis",
      tags: [t.all, t.allweb, "php"],
      link: "https://tribunadepetropolis.com.br",
      screenshot: "/screenshots/tribunaScreenshot.png",
      logo: "/portfolioLogos/logoTribuna.png",
      label: "Tribuna de Petrópolis Website",
    },
    {
      name: "Gabriela Mussel",
      tags: [t.all, t.allweb, "react", "nextjs"],
      link: "https://gabrielamussel.com.br",
      screenshot: "/screenshots/dragabrielamusselsiteScreenshot.png",
      logo: "/portfolioLogos/logoGabi.png",
      label: "Gabriela Mussel Website",
    },
    {
      name: "PetroByte",
      tags: [t.all, t.allweb, "react", "nextjs"],
      link: "https://petrobyte.com.br",
      screenshot: "/screenshots/petrobyteScreenshot.png",
      logo: "/portfolioLogos/logoPetrobyte.png",
      label: "PetroByte Website",
    },
    {
      name: "PetroByte",
      tags: [t.all, t.socialmedia],
      link: "https://www.instagram.com/petrobyteinformatica/",
      screenshot: "/screenshots/petrobyteInstaScreenshot.png",
      logo: "/portfolioLogos/logoPetrobyte.png",
      label: "PetroByte Social Media",
    },
    {
      name: "Manipulando Saúde",
      tags: [t.all, t.socialmedia],
      link: "https://www.instagram.com/msmanipulandosaude/",
      screenshot: "/screenshots/msInstaScreenshot.png",
      logo: "/portfolioLogos/logoMS.png",
      label: "Manipulando Saúde Social Media",
    },
    {
      name: "CERDO",
      tags: [t.all, t.socialmedia],
      link: "https://www.instagram.com/cerdoradiologia/",
      screenshot: "/screenshots/cerdoInstaScreenshot.png",
      logo: "/portfolioLogos/logoCerdo.png",
      label: "CERDO Social Media",
    },
    {
      name: "WhatsApp Link Generator",
      tags: [t.all, t.allweb, "open source", "nextjs"],
      link: "https://whatsapplinkgenerator.com",
      screenshot: "/screenshots/wppGenScreenshot.png",
      logo: "/portfolioLogos/logoWPPGenerator.png",
      label: "WhatsApp Link Generator",
    },
  ];

  const [tags, setTags] = useState([
    { name: t.all, active: false },
    { name: t.allweb, active: true },
    { name: "open source", active: false },
    { name: "nextjs", active: false },
    { name: "react", active: false },
    { name: "e-commerce", active: false },
    { name: t.socialmedia, active: false },
    { name: "php", active: false },
  ]);

  const [url, setUrl] = useState(t.projectcom);
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotLoaded, setScreenshotLoaded] = useState(false);
  const [link, setLink] = useState(null);

  const titleRef = useRef(null);

  //Get list of active tags
  var activeTags = [];
  tags.forEach((tag) => {
    if (tag.active) {
      activeTags.push(tag.name);
    }
  });

  //Preload images
  useEffect(() => {
    jobs.forEach((job) => {
      new Image().src = job.screenshot;
    });
  }, []);

  useEffect(() => {
    var tempTags = tags;
    var initialTags = [
      t.all,
      t.allweb,
      "open source",
      "nextjs",
      "react",
      "e-commerce",
      t.socialmedia,
      "php",
    ];
    tempTags.forEach((tag, key) => {
      tag.name = initialTags[key];
    });
    setTags(tempTags);
    setUrl(t.projectcom);
  }, [router.locale]);

  return (
    <section ref={titleRef}>
      <Head>
        <title>Portfolio - Gabriel Molter</title>
        <meta property="og:url" content="https://gabrielmolter.com/portfolio" />
      </Head>
      <h1>Portfolio</h1>
      <div className="portfolio">
        <div className="browser" aria-hidden="true">
          {!screenshotLoaded && (
            <img
              src={router.locale == "en" ? chooseProject : chooseProjectPTBR}
              alt={t.screenshotAlt}
            />
          )}
          <a
            href={link}
            target="_blank"
            rel="noopener"
            style={
              screenshotLoaded ? { display: "block" } : { display: "none" }
            }
          >
            <img
              src={screenshot}
              onLoad={() => {
                setScreenshotLoaded(true);
              }}
              alt={t.screenshotAlt}
            />
          </a>
          <span aria-label={t.projectURLAria}>{url}</span>
        </div>
        <p className="pictureSubtitle">{t.clickToRedirect}</p>
        <div className="tags">
          {tags.map((tag, key) => (
            <button
              key={key}
              style={
                tag.active
                  ? { background: "darkblue", color: "white" }
                  : { background: "#333", color: "#eee" }
              }
              onClick={() => {
                var tempTags = tags;
                tempTags[key].active = !tempTags[key].active;
                if (key !== 0 && tempTags[key].active) {
                  tempTags[0].active = false;
                } else if (key === 0 && tempTags[key].active) {
                  for (let i = 1; i < tempTags.length; i++) {
                    tempTags[i].active = false;
                  }
                }
                setTags([...tempTags]);
              }}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <div className="portfolioList" role="list">
          {jobs.map((job, key) => (
            <button
              key={key}
              aria-label={job.label}
              className={
                activeTags.some((r) => job.tags.indexOf(r) >= 0) ? "active" : ""
              }
              onClick={() => {
                setUrl(job.link);
                if (screenshot !== job.screenshot) {
                  setScreenshotLoaded(false);
                  setScreenshot(job.screenshot);
                }
                setLink(job.link);
                titleRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <NextImage
                src={job.logo}
                width={150}
                height={150}
                alt={job.name}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
