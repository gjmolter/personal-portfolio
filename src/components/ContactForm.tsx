"use client";

import { useState } from "react";
import { useLang } from "./hooks/LangProvider";
import Button from "./Button";
import Input from "./Input";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface AlertState {
  message: string;
  type: "success" | "error";
}

const dictionary = {
  en: {
    name: "Name",
    email: "Email",
    message: "Message",
    typeName: "Please type your name.",
    typeEmail: "Please enter a valid e-mail address.",
    typeMessage: "Please type a message.",
    placeholderMessage: "We need you to code our new Hoth defense system. Payment: 10,000 imperial credits.",
    success: "Thanks! I will get back to you soon.",
    error: "Something went wrong. Please try again.",
    send: "Send",
    sending: "Sending…",
  },
  pt: {
    name: "Nome",
    email: "E-mail",
    message: "Mensagem",
    typeName: "Digite seu nome.",
    typeEmail: "Digite um e-mail válido.",
    typeMessage: "Digite uma mensagem.",
    placeholderMessage:
      "Nós precisamos que você desenvolva o novo sistema de defesa de Hoth. Pagamento: 10.000 creditos imperiais.",
    success: "Obrigado! Responderei em breve.",
    error: "Algo deu errado. Tente novamente.",
    send: "Enviar",
    sending: "Enviando…",
  },
} as const;

// Simple email pattern – same used in the original snippet
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function ContactForm() {
  const { lang } = useLang();
  const t = dictionary[lang];

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [alert, setAlert] = useState<AlertState>({ message: "", type: "success" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const newErrors: Partial<FormValues> = {};
    if (!values.name.trim()) newErrors.name = t.typeName;
    if (!EMAIL_PATTERN.test(values.email)) newErrors.email = t.typeEmail;
    if (!values.message.trim()) newErrors.message = t.typeMessage;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = async () => {
    setSubmitting(true);
    setAlert({ message: "", type: "success" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || data.error !== false) throw new Error("Request failed");
      setAlert({ message: t.success, type: "success" });
      setValues({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setAlert({ message: t.error, type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    void sendEmail();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <label htmlFor="name" className="font-semibold">
        {t.name}
      </label>
      {errors.name && <span className="text-sm text-error">{errors.name}</span>}
      <Input
        id="name"
        name="name"
        type="text"
        placeholder="Luke Skywalker"
        value={values.name}
        onChange={handleChange("name")}
        className={errors.name ? "border-error" : undefined}
      />

      <label htmlFor="email" className="font-semibold">
        {t.email}
      </label>
      {errors.email && <span className="text-sm text-error">{errors.email}</span>}
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="luke@rebelalliance.com"
        value={values.email}
        onChange={handleChange("email")}
        className={errors.email ? "border-error" : undefined}
      />

      <label htmlFor="message" className="font-semibold">
        {t.message}
      </label>
      {errors.message && <span className="text-sm text-error">{errors.message}</span>}
      <Input
        id="message"
        name="message"
        placeholder={t.placeholderMessage}
        value={values.message}
        onChange={handleChange("message")}
        textarea
        className={`min-h-32 ${errors.message ? "border-error" : ""}`}
      />

      {alert.message && (
        <div className={`text-sm ${alert.type === "success" ? "text-green-400" : "text-error"}`}>{alert.message}</div>
      )}

      <Button type="submit" disabled={submitting} className="mt-2 self-start" loading={submitting}>
        {submitting ? t.sending : t.send}
      </Button>
    </form>
  );
}
