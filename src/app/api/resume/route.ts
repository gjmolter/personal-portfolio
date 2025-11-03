// app/api/resume/route.ts
import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont } from "pdf-lib";
import { DEFAULT_LANG, SUPPORTED_LANGS, Lang, Resume } from "@/lib/consts";

const dictionary = {
  en: {
    summary: "Summary",
    workExperience: "Work Experience",
    education: "Education",
    languages: "Languages",
    skills: "Skills",
    certifications: "Certifications",
  },
  pt: {
    summary: "Resumo",
    workExperience: "Experiência Profissional",
    education: "Educação",
    languages: "Idiomas",
    skills: "Habilidades",
    certifications: "Certificações",
  },
};

//This is way too simple to need a proper markdown parser,  so I built a very lightweight one.

function buildMarkdown(resume: Resume, lang: Lang) {
  const dict = dictionary[lang];
  return `<center>
# Gabriel Justen Molter
[me@gabrielmolter.com](mailto:me@gabrielmolter.com) | [linkedin.com/in/gjmolter](https://linkedin.com/in/gjmolter) | [github.com/gjmolter](https://github.com/gjmolter)
</center>

## ${dict.summary}
${resume.summary.map((s: string) => "- " + s).join("\n")}

## ${dict.workExperience}
${resume.work
  .map((j) =>
    `-# ${j.title} (${j.period}) | ${j.company} - ${j.place}
   ${j.description}`.trim()
  )
  .join("\n\n")}

## ${dict.education}
${resume.education.map((e) => `- ${e.title} (${e.period}) - ${e.institution}, ${e.place}`).join("\n")}

## ${dict.languages}
${resume.languages.map((l) => `- ${l.name} (${l.level})`).join("\n")}

## ${dict.skills}
${resume.skills.join(", ")}

## ${dict.certifications}
${resume.certifications.map((c) => `- ${c.name}`).join("\n")}
`.trim();
}

type BlockBase = { center?: boolean };
type Block =
  | ({ type: "h1"; text: string } & BlockBase)
  | ({ type: "h2"; text: string } & BlockBase)
  | ({ type: "h3"; text: string } & BlockBase)
  | ({ type: "p"; text: string } & BlockBase)
  | ({ type: "ul"; items: { type: string; text: string }[] } & BlockBase);

interface LayoutCtx {
  page: PDFPage;
  y: number;
  width: number;
  height: number;
}

interface Style {
  font: PDFFont;
  size: number;
  lineGap: number;
  marginTop?: number;
  marginBottom?: number;
  bullet?: boolean;
  indent?: number;
}

const PAGE_MARGINS = { top: 48, right: 36, bottom: 48, left: 36 };

function parseMarkdown(md: string): Block[] {
  const lines = md.replace(/\r/g, "").split("\n");
  const blocks: Block[] = [];
  let pendingList: { type: string; text: string }[] = [];
  let inCenter = false;

  const flushList = () => {
    if (pendingList.length) {
      blocks.push({ type: "ul", items: pendingList.slice(), center: inCenter });
      pendingList = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();

    // Handle <center> markup directives
    if (line === "<center>") {
      flushList();
      inCenter = true;
      continue;
    }
    if (line === "</center>") {
      flushList();
      inCenter = false;
      continue;
    }

    if (!line) {
      // blank line => paragraph/list boundary
      flushList();
      continue;
    }
    if (line.startsWith("# ")) {
      flushList();
      blocks.push({ type: "h1", text: line.slice(2).trim(), center: inCenter });
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      blocks.push({ type: "h2", text: line.slice(3).trim(), center: inCenter });
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      blocks.push({ type: "h3", text: line.slice(4).trim(), center: inCenter });
      continue;
    }
    if (line.startsWith("- ")) {
      pendingList.push({ type: "li", text: line.slice(2).trim() });
      continue;
    }
    if (line.startsWith("-# ")) {
      pendingList.push({ type: "liBold", text: line.slice(3).trim() });
      continue;
    }

    // Accumulate plain paragraph lines; merge with previous paragraph if needed
    flushList();
    const prev = blocks[blocks.length - 1];
    if (prev && prev.type === "p" && prev.center === inCenter) prev.text += " " + line;
    else blocks.push({ type: "p", text: line, center: inCenter });
  }
  flushList();
  return blocks;
}

function newPage(pdfDoc: PDFDocument): LayoutCtx {
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  return {
    page,
    y: height - PAGE_MARGINS.top,
    width,
    height,
  };
}

function wrapLines(text: string, font: PDFFont, size: number, maxWidth: number) {
  const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g; // matches Markdown links
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    const test = current ? current + " " + w : w;
    // Strip link markup before measuring the visual width
    const plainText = test.replace(LINK_RE, "$1");
    const width = font.widthOfTextAtSize(plainText, size);
    if (width > maxWidth && current) {
      lines.push(current);
      current = w;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function ensureSpace(ctx: LayoutCtx, needed: number, pdfDoc: PDFDocument) {
  if (ctx.y - needed < PAGE_MARGINS.bottom) {
    const np = newPage(pdfDoc);
    ctx.page = np.page;
    ctx.y = np.y;
  }
}

function drawTextBlock(pdfDoc: PDFDocument, ctx: LayoutCtx, text: string, style: Style, centerAlign: boolean = false) {
  if (style.marginTop) ctx.y -= style.marginTop;
  const maxWidth = ctx.width - PAGE_MARGINS.left - PAGE_MARGINS.right - (style.indent || 0);
  const lines = wrapLines(text, style.font, style.size, maxWidth);
  const lineHeight = style.size + style.lineGap;
  ensureSpace(ctx, lines.length * lineHeight + (style.marginBottom || 0), pdfDoc);

  const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

  const stripLinks = (s: string) => s.replace(LINK_RE, "$1");

  for (const rawLine of lines) {
    const line = rawLine;
    const xPos = centerAlign
      ? (ctx.width - style.font.widthOfTextAtSize(stripLinks(line), style.size)) / 2
      : PAGE_MARGINS.left + (style.indent || 0);
    let cursorX = xPos;
    let match: RegExpExecArray | null;
    let lastIndex = 0;
    while ((match = LINK_RE.exec(line)) !== null) {
      const [full, label] = match;
      const before = line.slice(lastIndex, match.index);
      if (before) {
        ctx.page.drawText(before, {
          x: cursorX,
          y: ctx.y,
          size: style.size,
          font: style.font,
          color: rgb(0, 0, 0),
        });
        cursorX += style.font.widthOfTextAtSize(before, style.size);
      }

      ctx.page.drawText(label, {
        x: cursorX,
        y: ctx.y,
        size: style.size,
        font: style.font,
        color: rgb(0, 0, 0),
      });

      // underline
      const labelWidth = style.font.widthOfTextAtSize(label, style.size);
      ctx.page.drawRectangle({
        x: cursorX,
        y: ctx.y - 2,
        width: labelWidth,
        height: 0.5,
        color: rgb(0, 0, 0),
      });

      cursorX += labelWidth;
      lastIndex = match.index + full.length;
    }
    const remaining = line.slice(lastIndex);
    if (remaining) {
      ctx.page.drawText(remaining, {
        x: cursorX,
        y: ctx.y,
        size: style.size,
        font: style.font,
        color: rgb(0, 0, 0),
      });
    }
    ctx.y -= lineHeight;
  }
  if (style.marginBottom) ctx.y -= style.marginBottom;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const langParam = searchParams.get("lang");
  const lang: Lang = SUPPORTED_LANGS.includes(langParam as Lang) ? (langParam as Lang) : DEFAULT_LANG;
  const resume = await import(`@/content/${lang}/resume`).then((mod) => mod.default);

  const md = buildMarkdown(resume, lang);
  const blocks = parseMarkdown(md);

  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const styles: Record<string, Style> = {
    h1: { font: helveticaBold, size: 20, lineGap: 4, marginTop: 0, marginBottom: 4 },
    h2: { font: helveticaBold, size: 14, lineGap: 3, marginTop: 10, marginBottom: 6 },
    h3: { font: helveticaBold, size: 10, lineGap: 2, marginTop: 6, marginBottom: 4 },
    p: { font: helvetica, size: 10, lineGap: 2, marginTop: 0, marginBottom: 6, indent: 18 },
    li: { font: helvetica, size: 10, lineGap: 2, marginTop: 0, marginBottom: 2, indent: 12 },
    liBold: { font: helveticaBold, size: 10, lineGap: 2, marginTop: 0, marginBottom: 2, indent: 12 },
  };

  const ctx = newPage(pdfDoc);

  for (const b of blocks) {
    if (b.type === "h1") drawTextBlock(pdfDoc, ctx, b.text, styles.h1, !!b.center);
    else if (b.type === "h2") drawTextBlock(pdfDoc, ctx, b.text, styles.h2, !!b.center);
    else if (b.type === "h3") drawTextBlock(pdfDoc, ctx, b.text, styles.h3, !!b.center);
    else if (b.type === "p") drawTextBlock(pdfDoc, ctx, b.text, styles.p, !!b.center);
    else if (b.type === "ul") {
      for (const item of b.items) {
        drawTextBlock(pdfDoc, ctx, "• " + item.text, styles[item.type as keyof typeof styles], !!b.center);
      }
      ctx.y -= 4; // extra gap after a list
    }
  }

  const pdfBytes = await pdfDoc.save();
  return new Response(pdfBytes as BlobPart, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume-${lang}.pdf`,
      "Cache-Control": "public, max-age=60",
    },
  });
}
