import Link from "next/link";

import johnTravolta from "../img/johntravolta.gif";

export default function NotFound() {
  return (
    <section className="notFound">
      <div className="travolta">
        <img src={johnTravolta} alt="confused John Travolta" />
      </div>
      <h1>This is embarrassing...</h1>
      <p>
        I have no idea how you got here{" "}
        <span role="img" aria-hidden="true">
          😬
        </span>
      </p>
      <Link href="/" className="errBack">
        back to home
      </Link>
    </section>
  );
}
