import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";

//Images
import chooseProject from "../img/chooseProject.png";

export default function Portfolio() {
  //LOGOS ARE 150x150 AND SCREENSHOTS ARE 1565x937
  const jobs = [
    {
      name: "RevoCalendar Component",
      tags: ["all", "all web", "open source", "react"],
      link: "https://gjmolter.github.io/revo-calendar/",
      screenshot: "/screenshots/revoScreenshot.png",
      logo: "/portfolioLogos/logoRevoCalendar.png",
      label: "RevoCalendar React Component",
    },
    {
      name: "Chilly Capybara",
      tags: ["all", "all web", "react", "nextjs"],
      link: "https://chillycapybara.com",
      screenshot: "/screenshots/chillycapybaraScreenshot.png",
      logo: "/portfolioLogos/logoChilly.png",
      label: "Chilly Capybara Website",
    },
    {
      name: "Petrótica",
      tags: ["all", "all web", "php"],
      link: "http://petrotica.com.br",
      screenshot: "/screenshots/petroticaScreenshot.png",
      logo: "/portfolioLogos/logoPetrotica.png",
      label: "Petrótica Website",
    },
    {
      name: "Tribuna de Petrópolis",
      tags: ["all", "all web", "php"],
      link: "https://tribunadepetropolis.com.br",
      screenshot: "/screenshots/tribunaScreenshot.png",
      logo: "/portfolioLogos/logoTribuna.png",
      label: "Tribuna de Petrópolis Website",
    },
    {
      name: "Gabriela Mussel",
      tags: ["all", "all web", "react", "nextjs"],
      link: "https://gabrielamussel.com.br",
      screenshot: "/screenshots/dragabrielamusselsiteScreenshot.png",
      logo: "/portfolioLogos/logoGabi.png",
      label: "Gabriela Mussel Website",
    },
    {
      name: "PetroByte",
      tags: ["all", "all web", "react", "nextjs"],
      link: "https://petrobyte.com.br",
      screenshot: "/screenshots/petrobyteScreenshot.png",
      logo: "/portfolioLogos/logoPetrobyte.png",
      label: "PetroByte Website",
    },
    {
      name: "WhatsApp Link Generator",
      tags: ["all", "all web", "open source", "nextjs"],
      link: "https://whatsapplinkgenerator.com",
      screenshot: "/screenshots/wppGenScreenshot.png",
      logo: "/portfolioLogos/logoWPPGenerator.png",
      label: "WhatsApp Link Generator",
    },
  ];

  const [tags, setTags] = useState([
    { name: "all", active: false },
    { name: "all web", active: true },
    { name: "open source", active: false },
    { name: "social media", active: false },
    { name: "php", active: false },
    { name: "nextjs", active: false },
    { name: "react", active: false },
  ]);

  const [url, setUrl] = useState("project.com");
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

  return (
    <section ref={titleRef}>
      <h1>Portfolio</h1>
      <div className="portfolio">
        <div className="browser" aria-hidden="true">
          {!screenshotLoaded && (
            <img src={chooseProject} alt="Portfolio project screenshot" />
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
              alt="Portfolio project screenshot"
            />
          </a>
          <span aria-label="Porfolio project URL">{url}</span>
        </div>
        <p className="pictureSubtitle">
          click above to be redirected to project page
        </p>
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
                setScreenshot(job.screenshot);
                setScreenshotLoaded(false);
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
