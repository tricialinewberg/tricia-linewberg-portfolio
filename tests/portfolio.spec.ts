import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for(const locale of ['pt-br','en','es'])for(const width of [320,375,768,1024,1440]){
 test(`${locale} at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:900});
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`/${locale}/`);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.project-link')).toHaveCount(5);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.locator('.ticket').click();
  await expect(page).toHaveURL(/#projects$/);
  if(width<850){await page.locator('.menu-toggle').click();await expect(page.locator('#main-nav')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('.menu-toggle')).toBeFocused();await expect(page.locator('#main-nav')).toBeHidden()}
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(result.violations).toEqual([]);expect(errors).toEqual([]);
  if(locale==='en' && [375,1440].includes(width)){await page.goto('/en/');await page.screenshot({path:`work/test-results/en-${width}.png`,fullPage:true});}
 });
}
test('locale switching preserves section',async({page})=>{await page.goto('/en/#about');await page.getByRole('link',{name:'Español',exact:true}).click();await expect(page).toHaveURL('/es/#about');await expect(page.locator('html')).toHaveAttribute('lang','es');});
test('keyboard entry and reduced motion',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/en/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');});
