import Link from "next/link";

export default function Home() {
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
      <div className="faceCircle" />
      <h1>Hey, my name is Gabriel Molter.</h1>
      <p>
        In a hurry? Go straight to my <Link href="/portfolio">Portfolio</Link>.
      </p>
      <p>
        I am a {getMyAge()}-year-old full stack developer from{" "}
        <a
          href="https://www.google.com.br/maps/place/Petr%C3%B3polis,+RJ/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Petrópolis, Brazil
        </a>
        , currently living in{" "}
        <a
          href="https://www.google.com.br/maps/place/Vancouver,+BC"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vancouver, Canada
        </a>
        .<br />
        <br />
        I've started working with web development back in 2011, when I was about
        14 years old, designing and implementing Flash websites.
        <br />
        <br />
        Also in 2011, I started developing iOS apps. The first app I released on
        the AppStore made it to the Top 10 Educational Apps in Brazil.
        <br />
        <br />
        In 2015 I switched my attention back to web development and started
        studying towards my{" "}
        <a
          href="https://www.youracclaim.com/badges/73c5d0e8-9412-427f-86dc-a155cc276c20/public_url"
          target="_blank"
          rel="noopener noreferrer"
        >
          Microsoft HTML5, CSS3 and JS certification, which I got in 2016
        </a>
        .<br />
        <br />
        As of today, I am an IT student, and a Freelancer for companies both in
        Canada and Brazil.
      </p>
    </section>
  );
}
