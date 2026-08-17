import { generateResumePdf } from "@/lib/resume-pdf";
import { SUPPORTED_LANGS, type Lang } from "@/lib/consts";

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!SUPPORTED_LANGS.includes(lang as Lang)) {
    return new Response("Not Found", { status: 404 });
  }

  return generateResumePdf(lang);
}
