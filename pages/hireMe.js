import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function HireMe() {
  const [btnText, setBtnText] = useState("send");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "success" });

  const { register, handleSubmit, errors, reset } = useForm();

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setAlert({ message: "", type: "success" });
    }
  }, [errors]);

  function sendEmail(data) {
    setBtnText("loading...");
    setBtnDisabled(true);

    axios
      .post("/api/sendEmail", data)
      .then((res) => {
        if (res.status == 200) {
          setAlert({
            message: "Message was sent! Thank you!",
            type: "success",
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setAlert({
          message: "Something went wrong, try again later...",
          type: "error",
        });
      })
      .finally(() => {
        setBtnText("send");
        setBtnDisabled(false);
        reset();
      });
  }

  function addErrorBorder(bool) {
    return bool ? { border: "1px solid #d22828" } : { border: "none" };
  }

  return (
    <section>
      <h1>Hire Me</h1>
      <form onSubmit={handleSubmit(sendEmail)} className="contactForm">
        <label htmlFor="name">name</label>
        {errors.name && <span className="alert error">Type your name</span>}
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Luke Skywalker"
          ref={register({ required: true })}
          style={addErrorBorder(errors.name)}
        />
        <label htmlFor="email">e-mail</label>
        {errors.email && (
          <span className="alert error">Type a valid email address</span>
        )}
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
        <label htmlFor="message">message</label>
        {errors.message && <span className="alert error">Type a message</span>}
        <textarea
          id="message"
          name="message"
          placeholder="We need you to code our new Hoth defense system. Payment: 10,000 imperial credits."
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
