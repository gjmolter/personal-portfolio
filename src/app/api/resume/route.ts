import { generateResumePdf } from "@/lib/resume-pdf";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  return generateResumePdf(searchParams.get("lang"));
}
