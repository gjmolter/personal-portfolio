import { Resume } from "@/lib/consts";

const resume: Resume = {
  summary: [
    "Desenvolvedor Full-stack, criativo, proativo e de rápido aprendizado.",
    "Mais de 9 anos de experiência em Desenvolvimento de Software.",
    "Publiquei 2 apps de sucesso na iOS App Store, um deles alcançando o Top 10 Educação no Brasil em 2014.",
    "Desenvolvi e mantive vários sites de sucesso para grandes empresas como bancos e universidades.",
  ],
  work: [
    {
      title: "Desenvolvedor Web",
      period: "2014 - Presente",
      company: "Freelancer",
      place: "Remoto",
      description:
        "Trabalhei em projetos para diferentes empresas, no Brasil e no Canadá. Alguns desses projetos estão disponíveis na minha página de portfólio.",
    },
    {
      title: "Desenvolvedor Web",
      period: "2021 - Presente",
      company: "Ballistic Arts",
      place: "Vancouver, Canadá / Remoto",
      description:
        "Trabalhei como Desenvolvedor Web Full-stack na Ballistic Arts, desenvolvendo sites e aplicações web, gerenciando servidores e bancos de dados, e criando e mantendo APIs.",
    },
    {
      title: "Estagiário de Desenvolvimento Web",
      period: "Novembro de 2015 - Junho de 2016",
      company: "Ápia Consultoria & Sistemas",
      place: "Petrópolis, Brasil",
      description:
        "Aqui eu criei sites de e-commerce usando o framework da CiaShop, HTML, CSS e JS. Eu também ajudava outros times com tecnologias diferentes quando necessário (Desenvolvimento iOS, normalmente) O principal objetivo do meu time era criar front-ends orientados para a conversão que fossem fáceis de manter com código limpo e legível.",
    },
  ],
  education: [
    {
      title: "Ciência da Computação",
      period: "Janeiro de 2021 - Dezembro de 2023",
      institution: "Langara College",
      place: "Vancouver, Canadá",
    },
    {
      title: "Tecnologia da Informação",
      period: "Outubro de 2017 - Dezembro de 2019",
      institution: "Canadian College",
      place: "Vancouver, Canadá",
    },
    {
      title: "Advanced Business Management",
      period: "Agosto de 2016 - Agosto de 2017",
      institution: "Sprott Shaw",
      place: "Vancouver, Canadá",
    },
    {
      title: "Web Front-End",
      period: "Maio de 2014 - Novembro de 2014",
      institution: "Instituto Infnet",
      place: "Rio de Janeiro, Brasil",
    },
  ],
  languages: [
    { flag: "canada", name: "Inglês", level: "Fluente" },
    { flag: "brazil", name: "Português", level: "Nativo" },
  ],
  skills: ["HTML & CSS", "JavaScript", "ReactJS & NextJS", "NodeJS", "Git", "UI & UX", "Design Gráfico"],
  certifications: [
    {
      name: "Microsoft 70-480: Programming in HTML5 with JavaScript and CSS3",
      logo: "/img/company-logos/microsoft.svg",
      link: "https://learn.microsoft.com/en-us/credentials/certifications/exams/70-480/",
    },
  ],
};

export default resume;
