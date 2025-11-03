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
    title: "Interested in this product?",
    subtitle: "Send me a message and I'll get back to you.",
    name: "Name",
    email: "Email",
    message: "Message",
    typeName: "Please type your name.",
    typeEmail: "Please enter a valid e-mail address.",
    typeMessage: "Please type a message.",
    placeholderMessage: "Sméagol wants it! Yess, he wants the precious item! We needs it! We must have our preciousss!",
    success: "Thanks! I will get back to you soon.",
    error: "Something went wrong. Please try again.",
    send: "Send Message",
    sending: "Sending…",
  },
  pt: {
    title: "Interessado neste produto?",
    subtitle: "Envie uma mensagem e eu responderei em breve.",
    name: "Nome",
    email: "E-mail",
    message: "Mensagem",
    typeName: "Digite seu nome.",
    typeEmail: "Digite um e-mail válido.",
    typeMessage: "Digite uma mensagem.",
    placeholderMessage: "Sméagol quer! Sim, ele quer o item precioso! Nós precisamos dele! Nós precisamos do precioso!",
    success: "Obrigado! Responderei em breve.",
    error: "Algo deu errado. Tente novamente.",
    send: "Enviar Mensagem",
    sending: "Enviando…",
  },
} as const;

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

type ProductInquiryFormProps = {
  productName: string;
};

export default function ProductInquiryForm({ productName }: ProductInquiryFormProps) {
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
      const messageWithProduct = `Someone is interested in buying: ${productName}\n\n${values.message}`;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: messageWithProduct,
        }),
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
    <div className="mt-16 pt-16 border-t border-white/10">
      <h2 className="text-2xl md:text-3xl font-black italic text-orange mb-2">{t.title}</h2>
      <p className="text-gray-300 mb-8">{t.subtitle}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <label htmlFor="product-name" className="font-semibold">
          {t.name}
        </label>
        {errors.name && <span className="text-sm text-error">{errors.name}</span>}
        <Input
          id="product-name"
          name="name"
          type="text"
          placeholder="Gollum"
          value={values.name}
          onChange={handleChange("name")}
          className={errors.name ? "border-error" : undefined}
        />

        <label htmlFor="product-email" className="font-semibold">
          {t.email}
        </label>
        {errors.email && <span className="text-sm text-error">{errors.email}</span>}
        <Input
          id="product-email"
          name="email"
          type="email"
          placeholder="gollum@middleearth.net"
          value={values.email}
          onChange={handleChange("email")}
          className={errors.email ? "border-error" : undefined}
        />

        <label htmlFor="product-message" className="font-semibold">
          {t.message}
        </label>
        {errors.message && <span className="text-sm text-error">{errors.message}</span>}
        <Input
          id="product-message"
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
    </div>
  );
}
