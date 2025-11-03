import { Resume } from "@/lib/consts";

const resume: Resume = {
  summary: [
    "Full-stack developer, creative, fast learner and proactive.",
    "More than 9 years of software development experience.",
    "Published 2 successful apps on iOS App Store, one of them reaching Education Top 10 for Brazil in 2014.",
    "Developed and maintained several successful websites for big companies like banks and universities.",
  ],
  work: [
    {
      title: "Web Developer",
      period: "2014 - Present",
      company: "Freelancer",
      place: "Remote",
      description:
        "I've worked on web and mobile projects for different companies both in Canada and Brazil. Some of these projects are displayed on my portfolio page.",
    },
    {
      title: "Web Developer",
      period: "2021 - Present",
      company: "Ballistic Arts",
      place: "Vancouver, Canada / Remote",
      description:
        "Worked as a Full-stack Web Developer at Ballistic Arts, developing websites and web applications, managing servers and databases, and creating and maintaining APIs.",
    },
    {
      title: "Web Developer Trainee",
      period: "November 2015 - June 2016",
      company: "Ápia Consultoria & Sistemas",
      place: "Petrópolis, Brazil",
      description:
        "Here I've created ecommerce websites using CiaShop framework, HTML, CSS and JS. I was also helping other teams with different technologies when needed (iOS development, mostly). My team's main goal was to develop conversion-oriented front-ends that were easy to maintain, with clean and readable code.",
    },
  ],
  education: [
    {
      title: "Computer Studies",
      period: "January 2021 - December 2023",
      institution: "Langara College",
      place: "Vancouver, Canada",
    },
    {
      title: "Information Technology",
      period: "October 2017 - December 2019",
      institution: "Canadian College",
      place: "Vancouver, Canada",
    },
    {
      title: "Advanced Business Management",
      period: "August 2016 - August 2017",
      institution: "Sprott Shaw",
      place: "Vancouver, Canada",
    },
    {
      title: "Web Front-End",
      period: "May 2014 - November 2014",
      institution: "Instituto Infnet",
      place: "Rio de Janeiro, Brazil",
    },
  ],
  languages: [
    { flag: "canada", name: "English", level: "Fluent" },
    { flag: "brazil", name: "Portuguese", level: "Native" },
  ],
  skills: ["HTML & CSS", "JavaScript", "ReactJS & NextJS", "NodeJS", "Git", "UI & UX", "Graphic Design"],
  certifications: [
    {
      name: "Microsoft 70-480: Programming in HTML5 with JavaScript and CSS3",
      logo: "/img/company-logos/microsoft.svg",
      link: "https://learn.microsoft.com/en-us/credentials/certifications/exams/70-480/",
    },
  ],
};

export default resume;
