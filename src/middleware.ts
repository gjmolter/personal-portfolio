import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LANG, SUPPORTED_LANGS } from "@/lib/consts";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export async function middleware(req: NextRequest) {
  // Check if the lang is already in the pathname
  const { pathname } = req.nextUrl;
  const pathnameHasLocale = SUPPORTED_LANGS.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  const cookie = req.cookies.get("lang");

  if (pathnameHasLocale) {
    //if lang is not saved in the cookie, save it now
    const res = NextResponse.next();
    if (!cookie || cookie.value !== pathname.split("/")[1])
      res.cookies.set("lang", pathname.split("/")[1]);
    return res;
  } else if (cookie) {
    //if lang is saved in the cookie, add it to the pathname
    req.nextUrl.pathname = `/${cookie.value}${pathname}`;
    return NextResponse.redirect(req.nextUrl);
  } else {
    // No lang in the pathname or cookie, so check the accept-language header and set it from there
    const headers = {
      "accept-language": req.headers.get("accept-language") || DEFAULT_LANG,
    };
    const languages = new Negotiator({ headers }).languages();
    const lang = match(languages, SUPPORTED_LANGS, DEFAULT_LANG);

    req.nextUrl.pathname = `/${lang}${pathname}`;
    req.cookies.set("lang", lang);
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon\\.ico|\\.well-known)(?!.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
