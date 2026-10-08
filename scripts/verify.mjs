import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {translations,locales} from '../.ssr/prerender.js';
for(const locale of locales){
 assert.deepEqual(Object.keys(translations[locale]).sort(),Object.keys(translations.en).sort());
 const html=await readFile(`dist/${locale}/index.html`,'utf8');
 const base=process.env.VITE_BASE_PATH || '/';
 for(const match of html.matchAll(/(?:src|href)="(\/[^\"]+)"/g))assert.ok(match[1].startsWith(base),`Unprefixed URL: ${match[1]}`);
 if(process.env.SITE_URL)assert.ok(html.includes(`rel="canonical" href="${process.env.SITE_URL.replace(/\/$/,'')}/${locale}/"`));
 assert.equal((html.match(/class="project-link"/g)||[]).length,4);
 assert.equal((html.match(/<h1 /g)||[]).length,1);
 for(const text of ['ADMIT ONE','mailto:triciaux@gmail.com','rel="noopener noreferrer"','name="description"'])assert.ok(html.includes(text));
 assert.equal(translations[locale].descriptions.length,4);
 assert.ok(!html.includes('Lumier'));
 const titles=['SATRA Wallet','Bitcoin Beauty School','Assistant to the Villain','Avec — Redesign'];
 const positions=titles.map(title=>html.indexOf(`>${title}</h3>`));
 assert.ok(positions.every((position,i)=>position>=0&&(i===0||position>positions[i-1])));
}
console.log('Static content, locale parity, project count and contact checks passed.');
