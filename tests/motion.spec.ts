import {test,expect} from '@playwright/test';
const route='http://127.0.0.1:4173'+(process.env.VITE_BASE_PATH||'/')+'en/';
test.describe('restrained theatrical motion',()=>{
 test.use({viewport:{width:1440,height:1000},video:'on'});
 test('bounded trail, one-shot reveals and precise ticket interaction',async({page})=>{
  await page.goto(route);
  await expect(page.locator('.wand-dust i')).toHaveCount(12);
  await expect(page.locator('body')).toHaveCSS('cursor',/url/);
  await expect(page.locator('.ticket')).toHaveCSS('cursor','pointer');
  await expect(page.locator('.wand-dust')).toHaveCSS('pointer-events','none');
  await page.locator('.hero').evaluate(el=>Promise.all(el.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{}))));
  const before=await page.locator('.ticket').boundingBox();
  await page.mouse.move(100,200);
  await page.mouse.move(400,300,{steps:18});
  expect(await page.locator('.wand-dust').evaluate(el=>el.getAnimations({subtree:true}).length)).toBeLessThanOrEqual(12);
  await page.waitForTimeout(600);
  expect(await page.locator('.wand-dust').evaluate(el=>el.getAnimations({subtree:true}).length)).toBe(0);
  await page.locator('.ticket').hover();
  await expect(page.locator('.ticket')).toHaveCSS('transform',/matrix/);
  await page.waitForTimeout(750);
  const after=await page.locator('.ticket').boundingBox();
  expect(after!.width).toBe(before!.width);expect(after!.height).toBe(before!.height);
  expect(Math.abs(after!.y-before!.y)).toBeLessThanOrEqual(3);
  await page.locator('.ticket').click();await expect(page).toHaveURL(/#projects$/);
  for(const row of await page.locator('.project').all()){
   await row.scrollIntoViewIfNeeded();
   await expect(row).toHaveAttribute('data-revealed','true');
   await expect(row).toHaveCSS('opacity','1');
  }
  await page.locator('.about-award').first().scrollIntoViewIfNeeded();
  await expect(page.locator('.about-award').first()).toHaveAttribute('data-revealed','true');
  await page.locator('.competencies li').first().hover();
  await page.waitForTimeout(300);
  await page.locator('.project').first().scrollIntoViewIfNeeded();
  expect(await page.locator('.project').first().evaluate(el=>el.getAnimations().length)).toBe(0);
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('.wand-dust')).toHaveCount(0);
  await page.screenshot({path:'work/test-results/motion-desktop.png'});
 });
});
test('reduced motion is immediate and particles never initialize',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
 await expect(page.locator('.wand-dust')).toHaveCount(0);
 await expect(page.locator('.hero h1')).toHaveCSS('animation-name','none');
 await page.locator('.ticket').hover();
 expect(await page.locator('.ticket').evaluate(el=>getComputedStyle(el,'::after').animationName)).toBe('none');
 for(const item of await page.locator('.project, .about-award').all())await expect(item).toHaveCSS('opacity','1');
});
test('touch has no custom cursor or trail and ticket works on first tap',async({browser})=>{
 const context=await browser.newContext({hasTouch:true,isMobile:true,viewport:{width:375,height:812}});
 const page=await context.newPage();await page.goto(route);
 await expect(page.locator('.wand-dust')).toHaveCount(0);
 await expect(page.locator('body')).toHaveCSS('cursor','auto');
 await page.locator('.ticket').tap();await expect(page).toHaveURL(/#projects$/);
 await page.screenshot({path:'work/test-results/motion-mobile.png'});
 await context.close();
});
test('prerendered content remains visible without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,reducedMotion:'reduce'});
 const page=await context.newPage();await page.goto(route);
 for(const item of await page.locator('.project, .about-award').all())await expect(item).toHaveCSS('opacity','1');
 await expect(page.locator('.project-link')).toHaveCount(4);
 await page.locator('.ticket').click();await expect(page).toHaveURL(/#projects$/);
 await context.close();
});
