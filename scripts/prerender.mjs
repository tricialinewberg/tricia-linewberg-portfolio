import { readFile, writeFile, mkdir } from "node:fs/promises";
import { render, translations, locales, htmlLang } from "../.ssr/prerender.js";
const template = await readFile("dist/index.html", "utf8");
const escape = (s) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const origin = process.env.SITE_URL?.replace(/\/$/, "");
for (const locale of locales) {
  const t = translations[locale];
  const seo = `<meta name="description" content="${escape(t.description)}"><meta property="og:title" content="${escape(t.title)}"><meta property="og:description" content="${escape(t.description)}"><meta property="og:type" content="website"><meta property="og:locale" content="${locale === "pt-br" ? "pt_BR" : locale === "en" ? "en_US" : "es_ES"}">${origin ? `<link rel="canonical" href="${escape(origin)}/${locale}/"><meta property="og:url" content="${escape(origin)}/${locale}/">${locales.map((l) => `<link rel="alternate" hreflang="${htmlLang[l]}" href="${escape(origin)}/${l}/">`).join("")}<link rel="alternate" hreflang="x-default" href="${escape(origin)}/pt-br/">` : ""}`;
  const html = template
    .replace('lang="pt-BR"', `lang="${htmlLang[locale]}"`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(t.title)}</title>`)
    .replace("<!--seo-->", seo)
    .replace("<!--app-->", render(locale));
  await mkdir(`dist/${locale}`, { recursive: true });
  await writeFile(`dist/${locale}/index.html`, html);
  if (locale === "pt-br") await writeFile("dist/index.html", html);
}
console.log(
  "Prerendered PT-BR, EN and ES. Set SITE_URL at build time for canonical/hreflang URLs.",
);
