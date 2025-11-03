"use server";

import { cookies } from "next/headers"
import { DEFAULT_LANG, Lang, SUPPORTED_LANGS } from "./consts"

export const getLang = async (language?: Lang): Promise<Lang> => {
  const cookie = (await cookies()).get("lang");
  let lang: Lang | undefined = language;

  if (!lang && cookie) lang = cookie.value as Lang;
  if (!lang) lang = DEFAULT_LANG;
  if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;

  return lang;
}