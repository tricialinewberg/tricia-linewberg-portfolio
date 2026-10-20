import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {translations,type Locale} from '../src/locales';
const base=process.env.VITE_BASE_PATH||'/';
for(const locale of ['pt-br','en','es'] as Locale[])for(const width of [375,1440])test(`production routes and interactions ${locale} ${width}`,async({browser,baseURL})=>{
 const context=await browser.newContext({viewport:{width,height:900},hasTouch:width===375});
 const page=await context.newPage();const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&/hydration|minified react|did not match/i.test(m.text()))errors.push(m.text());});
 const url=`${baseURL}${base}${locale}/`;
 const response=await context.request.get(url);expect(response.status()).toBe(200);expect(await response.text()).toContain('<main id="main">');
 await page.goto(url);await page.reload();await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',translations[locale].description);
 await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`${process.env.SITE_URL}/${locale}/`);
 await expect(page.locator('link[rel="alternate"]')).toHaveCount(4);
 await page.locator('.hero').evaluate(el=>Promise.all(el.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{}))));
 for(const image of await page.locator('#root img').all()){
  await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(el=>(el as HTMLImageElement).naturalWidth),{timeout:15000}).toBeGreaterThan(0);
 }
 const card=page.locator('.competencies li').first();await card.scrollIntoViewIfNeeded();await page.waitForTimeout(1100);
 if(width===375)await card.tap();else await card.click();
 await expect(card).toHaveClass(/touch-lit/);await expect(page.locator('.touch-magic i')).toHaveCount(9);await page.waitForTimeout(1100);await expect(card).not.toHaveClass(/touch-lit/);
 const fine=await page.evaluate(()=>matchMedia('(hover:hover) and (pointer:fine)').matches);
 await expect(page.locator('.wand-cursor')).toHaveCount(fine?1:0);
 await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('.wand-cursor, .touch-magic')).toHaveCount(0);
 await card.click();await expect(card).toHaveClass(/touch-lit/);await expect(page.locator('.touch-magic')).toHaveCount(0);
 await page.locator('.ticket').focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(/#projects$/);
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(audit.violations).toEqual([]);
 expect(errors).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await context.close();
});
