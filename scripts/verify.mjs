import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { translations, locales } from "../.ssr/prerender.js";
for (const locale of locales) {
  assert.deepEqual(
    Object.keys(translations[locale]).sort(),
    Object.keys(translations.en).sort(),
  );
  const html = await readFile(`dist/${locale}/index.html`, "utf8");
  assert.equal((html.match(/class="project-link"/g) || []).length, 5);
  assert.equal((html.match(/<h1 /g) || []).length, 1);
  for (const text of [
    "ADMIT ONE",
    "mailto:triciaux@gmail.com",
    'rel="noopener noreferrer"',
    'name="description"',
  ])
    assert.ok(html.includes(text));
  assert.equal(translations[locale].descriptions.length, 5);
}
console.log(
  "Static content, locale parity, project count and contact checks passed.",
);
