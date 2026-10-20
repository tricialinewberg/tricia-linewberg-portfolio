import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
const normalize=html=>html.replace(/\/assets\/index-[A-Za-z0-9_-]+\.(js|css)/g,'/assets/index-HASH.$1');
const results=[];
for(const locale of ['pt-br','en','es']){
 const before=await readFile(`work/audit/baseline-html/${locale}.html`,'utf8');
 const after=await readFile(`dist/${locale}/index.html`,'utf8');
 assert.equal(normalize(after),normalize(before),`${locale}: prerendered markup or metadata changed`);
 results.push({locale,identicalExceptBundleHashes:true});
}
await writeFile('work/audit/html-parity.json',JSON.stringify(results,null,2));
console.log('All locale HTML and metadata identical apart from expected bundle hashes.');
