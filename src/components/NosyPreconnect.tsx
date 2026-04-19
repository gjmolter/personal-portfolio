"use client";

import { preconnect } from "react-dom";

export default function NosyPreconnect() {
  preconnect("https://nosy.cpbr.digital", { crossOrigin: "anonymous" });
  return null;
}
