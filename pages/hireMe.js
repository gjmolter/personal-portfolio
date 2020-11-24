import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

//Other Libs
import { useForm } from "react-hook-form";
import axios from "axios";

//Translations
import translations from "../languages/translations";

export default function HireMe() {
  const router = useRouter();
  const t = translations[router.locale];

  const [btnText, setBtnText] = useState(t.send);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "success" });

  useEffect(() => {
    setBtnText(t.send);
  }, [router.locale]);

  const { register, handleSubmit, errors, reset } = useForm();

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setAlert({ message: "", type: "success" });
    }
  }, [errors]);

  function sendEmail(data) {
    setBtnText(t.loading);
    setBtnDisabled(true);

    axios
      .post("/api/sendEmail", data)
      .then((res) => {
        if (res.status == 200) {
          setAlert({
            message: t.successMsg,
            type: "success",
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setAlert({
          message: t.errorMsg,
          type: "error",
        });
      })
      .finally(() => {
        setBtnText(t.send);
        setBtnDisabled(false);
        reset();
      });
  }

  function addErrorBorder(bool) {
    return bool ? { border: "1px solid #d22828" } : { border: "none" };
  }

  return (
    <section>
      <Head>
        <title>{t.hireme} - Gabriel Molter</title>
      </Head>
      <h1>Hire Me</h1>
      <form onSubmit={handleSubmit(sendEmail)} className="contactForm">
        <label htmlFor="name">{t.name}</label>
        {errors.name && <span className="alert error">{t.typeName}</span>}
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Luke Skywalker"
          ref={register({ required: true })}
          style={addErrorBorder(errors.name)}
        />
        <label htmlFor="email">e-mail</label>
        {errors.email && <span className="alert error">{t.typeEmail}</span>}
        <input
          id="email"
          name="email"
          type="email"
          placeholder="luke@rebelalliance.com"
          ref={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            },
          })}
          style={addErrorBorder(errors.email)}
        />
        <label htmlFor="message">{t.message}</label>
        {errors.message && <span className="alert error">{t.typeMessage}</span>}
        <textarea
          id="message"
          name="message"
          placeholder={t.placeholderMessage}
          ref={register({ required: true })}
          style={addErrorBorder(errors.message)}
        />
        {alert.message != "" && (
          <div style={{}} className={`formAlert ${alert.type}`}>
            {alert.message}
          </div>
        )}
        <button id="submitBtn" type="submit" disabled={btnDisabled}>
          {btnText}
        </button>
      </form>
    </section>
  );
}
