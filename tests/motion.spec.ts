import {test,expect} from '@playwright/test';
const route='http://127.0.0.1:4173'+(process.env.VITE_BASE_PATH||'/')+'en/';
test.use({viewport:{width:1440,height:1000},video:{mode:'on',size:{width:1440,height:1000}}});
const settle=async(page:import('@playwright/test').Page,selector:string)=>{
 await page.locator(selector).evaluate(el=>Promise.all(el.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{}))));
};
test('cinematic desktop performance and interaction demonstration',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(route);
 await expect(page.locator('.wand-dust i')).toHaveCount(24);
 await settle(page,'.hero');
 await page.screenshot({path:'work/test-results/cinema-desktop.png'});
 const ticket=page.locator('.ticket'),before=(await ticket.boundingBox())!;
 for(let i=0;i<24;i++){await page.mouse.move(90+i*14,240+Math.sin(i/4)*45);await page.waitForTimeout(45);}
 await expect(page.locator('.wand-cursor')).toHaveClass(/visible/);
 await expect(page.locator('body')).toHaveCSS('cursor','none');
 await expect(page.locator('.wand-dust')).toHaveCSS('pointer-events','none');
 expect(await page.locator('.wand-dust').evaluate(el=>el.getAnimations({subtree:true}).length)).toBeLessThanOrEqual(24);
 await page.screenshot({path:'work/test-results/cinema-wand.png'});
 await page.waitForTimeout(750);
 expect(await page.locator('.wand-dust').evaluate(el=>el.getAnimations({subtree:true}).length)).toBe(0);
 await ticket.hover();await expect(page.locator('.wand-cursor')).toHaveClass(/interactive/);
 for(let i=0;i<15;i++){await page.mouse.move(before.x+30+i*18,before.y+before.height/2+Math.sin(i/3)*12);await page.waitForTimeout(70);}
 const after=(await ticket.boundingBox())!;
 expect(Math.abs(after.width-before.width)).toBeLessThan(8);
 expect(Math.abs(after.height-before.height)).toBeLessThan(8);
 await ticket.click();await expect(page).toHaveURL(/#projects$/);
 for(const row of await page.locator('.project').all()){
  await row.scrollIntoViewIfNeeded();await expect(row).toHaveAttribute('data-revealed','true');
  await page.waitForTimeout(1100);
  await expect(row.locator('img')).toHaveCSS('object-fit','contain');
  await expect(row.locator('.project-image')).toHaveCSS('clip-path','none');
  const box=(await row.locator('.project-image').boundingBox())!;
  await page.mouse.move(box.x+box.width*.35,box.y+box.height*.4);await page.waitForTimeout(200);
  await page.mouse.move(box.x+box.width*.65,box.y+box.height*.6);await page.waitForTimeout(300);
 }
 await page.locator('.competencies').scrollIntoViewIfNeeded();await page.waitForTimeout(1200);
 await page.locator('.competencies li').nth(3).hover();await page.waitForTimeout(500);
 await page.locator('.about-awards').scrollIntoViewIfNeeded();await page.waitForTimeout(1400);
 await page.locator('.about-award').first().hover();await page.waitForTimeout(500);
 await page.locator('.about').screenshot({path:'work/test-results/cinema-awards.png'});
 await page.locator('.project').first().scrollIntoViewIfNeeded();
 expect(await page.locator('.project').first().evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length)).toBe(0);
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.wand-dust')).toHaveCount(0);
 await expect(page.locator('body')).not.toHaveClass(/wand-ready/);
 expect(errors).toEqual([]);
});
test('reduced motion is complete and immediately visible',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
 await expect(page.locator('.wand-dust')).toHaveCount(0);
 await expect(page.locator('.designer-name')).toHaveCSS('color','rgb(44, 36, 48)');
 await page.locator('.ticket').hover();
 expect(await page.locator('.ticket').evaluate(el=>getComputedStyle(el,'::after').animationName)).toBe('none');
 for(const item of await page.locator('.project-image, .project-copy, .competencies li, .about-award').all()){
  await expect(item).toHaveCSS('opacity','1');await expect(item).toHaveCSS('animation-name','none');
 }
 await page.locator('.ticket').focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(/#projects$/);
});
test('cinematic mobile demonstration preserves first-tap behavior',async({browser})=>{
 const context=await browser.newContext({hasTouch:true,isMobile:true,viewport:{width:375,height:812},recordVideo:{dir:'work/test-results/mobile-cinema-video',size:{width:375,height:812}}});
 const page=await context.newPage();await page.goto(route);await settle(page,'.hero');
 await expect(page.locator('.wand-dust')).toHaveCount(0);
 await expect(page.locator('body')).toHaveCSS('cursor','auto');
 await page.screenshot({path:'work/test-results/cinema-mobile.png'});
 await page.locator('.ticket').tap();await expect(page).toHaveURL(/#projects$/);
 for(const row of await page.locator('.project').all()){
  await row.scrollIntoViewIfNeeded();await expect(row).toHaveAttribute('data-revealed','true');await page.waitForTimeout(1100);
 }
 await page.locator('.competencies').scrollIntoViewIfNeeded();await page.waitForTimeout(1300);
 await page.locator('.about-awards').scrollIntoViewIfNeeded();await page.waitForTimeout(1400);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await context.close();
});
test('prerendered content remains usable without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 const page=await context.newPage();await page.goto(route);await page.waitForTimeout(1400);
 for(const item of await page.locator('.project-image, .project-copy, .about-award').all())await expect(item).toHaveCSS('opacity','1');
 await expect(page.locator('.project-link')).toHaveCount(4);
 await page.locator('.ticket').click();await expect(page).toHaveURL(/#projects$/);await context.close();
});
