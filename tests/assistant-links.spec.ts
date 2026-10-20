import {test,expect} from '@playwright/test';
import {translations,type Locale} from '../src/locales';
const base=process.env.VITE_BASE_PATH||'/';
const behance='https://www.behance.net/gallery/254726489/WebSite-(Fictional)';
const live='https://assistant-to-the-villain-fan-site.vercel.app/';
for(const locale of ['pt-br','en','es'] as Locale[])for(const width of [320,1440])test(`Assistant destinations ${locale} ${width}`,async({page,context})=>{
 await page.setViewportSize({width,height:900});await page.goto(`${base}${locale}/`);
 const project=page.locator('.project--assistant-to-the-villain');await project.scrollIntoViewIfNeeded();await page.waitForTimeout(1100);
 const t=translations[locale];await expect(project.locator('.project-actions a')).toHaveCount(2);
 await expect(project.locator('.project-actions a').nth(0)).toHaveAccessibleName(`${t.exploreWebsite} — Assistant to the Villain — ${t.newTab}`);
 await expect(project.locator('.project-actions a').nth(1)).toHaveAccessibleName(`${t.viewCase} — Assistant to the Villain — ${t.newTab}`);
 await expect(project.locator('.project-copy > p')).toHaveText(t.descriptions[2]);
 await expect(project.locator('img')).toHaveAttribute('src',`${base}images/01-cover.png`);
 await expect(project.locator('img')).toHaveCSS('object-fit','contain');
 await expect(page.locator('a a')).toHaveCount(0);await expect(page.locator('a.project-link')).toHaveCount(3);
 expect(await project.locator('.project-link').evaluate(el=>el.tagName)).toBe('DIV');
 await expect(project.locator('.project-link')).not.toHaveAttribute('tabindex');
 const links=project.locator('a');await expect(links).toHaveCount(4);
 for(let i=0;i<4;i++){
  await expect(links.nth(i)).toHaveAttribute('href',i===2?live:behance);
  await expect(links.nth(i)).toHaveAttribute('target','_blank');await expect(links.nth(i)).toHaveAttribute('rel','noopener noreferrer');
 }
 await links.first().focus();
 for(let i=0;i<4;i++){
  await expect(links.nth(i)).toBeFocused();await expect(links.nth(i)).toHaveCSS('outline-style','solid');
  await page.keyboard.press('Tab');
 }
 await expect(page.locator('.project--avec-redesign > a')).toBeFocused();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await expect(project).toHaveAttribute('data-revealed','true');
 await page.mouse.move(0,0);await project.screenshot({path:`work/test-results/assistant-links-${locale}-${width}.png`});
 // Isolate navigation from third-party availability; verify each actual link opens its URL once.
 await context.route('https://assistant-to-the-villain-fan-site.vercel.app/**',r=>r.fulfill({body:'Live site'}));
 await context.route('https://www.behance.net/**',r=>r.fulfill({body:'Case study'}));
 for(let i=0;i<4;i++){
  const popupPromise=page.waitForEvent('popup');await links.nth(i).click();const popup=await popupPromise;
  await expect(popup).toHaveURL(i===2?live:behance);await popup.close();
 }
});
