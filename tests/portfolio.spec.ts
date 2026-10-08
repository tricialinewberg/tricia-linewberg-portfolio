import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for(const locale of ['pt-br','en','es'])for(const width of [320,375,768,1024,1440]){
 test(`${locale} at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:900});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`/${locale}/`);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.project-link')).toHaveCount(4);
  await expect(page.locator('.project h3')).toHaveText(['SATRA Wallet','Bitcoin Beauty School','Assistant to the Villain','Avec — Redesign']);
  await expect(page.locator('#projects')).not.toContainText('Lumier');
  expect((await page.locator('#projects').boundingBox())!.width).toBeLessThanOrEqual(850);
  for(const row of await page.locator('.project-link').all()){
   await row.scrollIntoViewIfNeeded();
   await expect(row).toHaveAttribute('target','_blank');
   await expect(row).toHaveAttribute('rel','noopener noreferrer');
   await expect(row).toHaveAttribute('href',/^https:\/\/www\.behance\.net\/gallery\//);
   await expect(row).toHaveAccessibleName(/Behance/);
   const image=row.locator('img');
   await expect.poll(()=>image.evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
   const cover=(await row.locator('.project-image').boundingBox())!;
   const copy=(await row.locator('.project-copy').boundingBox())!;
   expect(Math.abs(cover.width-cover.height)).toBeLessThan(1);
   expect(cover.width).toBeGreaterThanOrEqual(width<600?90:150);
   expect(cover.width).toBeLessThanOrEqual(width<600?110:180);
   expect(copy.x).toBeGreaterThan(cover.x+cover.width);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.locator('.ticket').click();
  await expect(page).toHaveURL(/#projects$/);
  if(width<850){await page.locator('.menu-toggle').click();await expect(page.locator('#main-nav')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('.menu-toggle')).toBeFocused();await expect(page.locator('#main-nav')).toBeHidden()}
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(result.violations).toEqual([]);expect(errors).toEqual([]);
  if([320,375,1440].includes(width)){await page.locator('#projects').screenshot({path:`work/test-results/projects-${locale}-${width}.png`});}
 });
}
test('locale switching preserves section',async({page})=>{await page.goto('/en/#about');await page.getByRole('link',{name:'Español',exact:true}).click();await expect(page).toHaveURL('/es/#about');await expect(page.locator('html')).toHaveAttribute('lang','es');});
test('keyboard entry and reduced motion',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/en/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');});
test('project rows have visible keyboard focus',async({page})=>{await page.goto('/en/');await page.locator('.ticket').focus();await page.keyboard.press('Tab');await expect(page.locator('.project-link').first()).toBeFocused();expect(await page.locator('.project-link').first().evaluate(el=>getComputedStyle(el).outlineStyle)).toBe('solid');await page.keyboard.press('Tab');await expect(page.locator('.project-link').nth(1)).toBeFocused();});
