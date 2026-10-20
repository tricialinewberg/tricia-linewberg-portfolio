import {test,expect} from '@playwright/test';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
const capture=process.env.AUDIT_CAPTURE==='1';
const base=process.env.VITE_BASE_PATH||'/';
for(const locale of ['pt-br','en','es'])for(const width of [320,375,390,768,1024,1280,1440,1920])for(const touch of [false,true]){
 test(`${locale} ${width} ${touch?'touch':'mouse'}`,async({browser,baseURL})=>{
  const key=`${locale}-${width}-${touch?'touch':'mouse'}`;
  const context=await browser.newContext({viewport:{width,height:900},hasTouch:touch,isMobile:touch,deviceScaleFactor:1});
  const page=await context.newPage();const errors:string[]=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto(`${baseURL}${base}${locale}/`);await page.evaluate(()=>document.fonts.ready);
  for(const element of await page.locator('.hero, .project, .competencies, .about-award, .footer').all()){
   await element.scrollIntoViewIfNeeded();
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   await element.evaluate(el=>Promise.all(el.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{}))));
  }
  await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));window.scrollTo({top:0,behavior:'instant'});});
  // Leave the viewport so scroll-driven cursor hiding cannot race a full-page capture.
  // Wand movement and click effects are covered separately by interaction tests.
  await page.mouse.move(-20,-20);await page.waitForTimeout(800);
  const state=await page.evaluate(()=>{
   const properties=['display','position','width','height','margin','padding','gap','font-family','font-size','font-weight','line-height','letter-spacing','color','background-image','background-color','border','border-radius','box-shadow','object-fit','object-position','opacity','clip-path','transform'];
   return {
    lang:document.documentElement.lang,title:document.title,
    text:document.querySelector('#root')!.textContent,
    links:[...document.querySelectorAll('#root a')].map(a=>({href:a.getAttribute('href'),name:a.getAttribute('aria-label'),labelledby:a.getAttribute('aria-labelledby'),text:a.textContent,target:a.getAttribute('target'),rel:a.getAttribute('rel')})),
    styles:[...document.querySelectorAll('#root *')].map(el=>({tag:el.tagName,class:el.className,styles:Object.fromEntries(properties.map(p=>[p,getComputedStyle(el).getPropertyValue(p)]))})),
    images:[...document.querySelectorAll('#root img')].map(i=>({src:i.getAttribute('src'),width:(i as HTMLImageElement).naturalWidth,height:(i as HTMLImageElement).naturalHeight})),
   };
  });
  await mkdir(`work/audit/${capture?'before':'after'}`,{recursive:true});
  await writeFile(`work/audit/${capture?'before':'after'}/${key}.json`,JSON.stringify(state,null,2));
  await writeFile(`work/audit/${capture?'before':'after'}/${key}.aria.txt`,await page.locator('#root').ariaSnapshot());
  const screenshot=await page.screenshot({fullPage:true,animations:'disabled'});
  await writeFile(`work/audit/${capture?'before':'after'}/${key}.png`,screenshot);
  expect(screenshot).toMatchSnapshot(`${key}.png`);
  if(!capture){expect(state).toEqual(JSON.parse(await readFile(`work/audit/before/${key}.json`,'utf8')));expect(await page.locator('#root').ariaSnapshot()).toBe(await readFile(`work/audit/before/${key}.aria.txt`,'utf8'));}
  expect(errors).toEqual([]);await context.close();
 });
}
