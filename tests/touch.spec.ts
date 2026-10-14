import {test,expect} from '@playwright/test';
const route='http://127.0.0.1:4173'+(process.env.VITE_BASE_PATH||'/')+'en/';
for(const width of [320,375,390,430])test(`touch feedback at ${width}px`,async({browser})=>{
 const context=await browser.newContext({hasTouch:true,isMobile:true,viewport:{width,height:844},recordVideo:width===390?{dir:'work/test-results/touch-mobile-video',size:{width,height:844}}:undefined});
 const page=await context.newPage();const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(route);await page.waitForTimeout(1450);
 await expect(page.locator('.wand-cursor')).toHaveCount(0);
 await page.locator('.ticket').tap();await expect(page).toHaveURL(/#projects$/);
 await expect(page.locator('.touch-magic i')).toHaveCount(9);
 await expect(page.locator('.touch-magic')).toHaveCSS('pointer-events','none');
 expect(await page.locator('.touch-magic').evaluate(el=>el.getAnimations({subtree:true}).length)).toBeGreaterThan(0);
 await page.waitForTimeout(100);await page.screenshot({path:`work/test-results/touch-ticket-${width}.png`});
 for(const project of await page.locator('.project').all()){
  await project.scrollIntoViewIfNeeded();await expect(project).toHaveAttribute('data-revealed','true');await page.waitForTimeout(1100);
  await expect(project.locator('img')).toHaveCSS('object-fit','contain');
 }
 const card=page.locator('.competencies li').first();await card.scrollIntoViewIfNeeded();await page.waitForTimeout(1100);
 const plain=await card.evaluate(el=>getComputedStyle(el).backgroundImage);
 await card.tap();await expect(card).toHaveClass(/touch-lit/);
 expect(await card.evaluate(el=>getComputedStyle(el).backgroundImage)).not.toBe(plain);
 await expect(card).not.toHaveAttribute('role','button');
 await page.waitForTimeout(160);await page.screenshot({path:`work/test-results/touch-card-${width}.png`});
 await page.waitForTimeout(1000);await expect(card).not.toHaveClass(/touch-lit/);
 expect(await page.locator('.touch-magic').evaluate(el=>el.getAnimations({subtree:true}).length)).toBe(0);
 // Swipes, canceled gestures and long presses must not activate informational cards.
 await card.dispatchEvent('pointerdown',{pointerType:'touch',pointerId:9,isPrimary:true,clientX:30,clientY:200});
 await card.dispatchEvent('pointermove',{pointerType:'touch',pointerId:9,clientX:30,clientY:230});
 await card.dispatchEvent('pointerup',{pointerType:'touch',pointerId:9,clientX:30,clientY:230});
 await expect(card).not.toHaveClass(/touch-lit/);
 await card.dispatchEvent('pointerdown',{pointerType:'touch',pointerId:9,isPrimary:true});
 await card.dispatchEvent('pointercancel',{pointerType:'touch',pointerId:9});
 await card.dispatchEvent('pointerup',{pointerType:'touch',pointerId:9});
 await expect(card).not.toHaveClass(/touch-lit/);
 await card.dispatchEvent('pointerdown',{pointerType:'touch',pointerId:9,isPrimary:true});await page.waitForTimeout(650);
 await card.dispatchEvent('pointerup',{pointerType:'touch',pointerId:9});await expect(card).not.toHaveClass(/touch-lit/);
 const award=page.locator('.about-award').first();await award.scrollIntoViewIfNeeded();await page.waitForTimeout(1300);
 await award.tap();await expect(award).toHaveClass(/touch-lit/);
 expect(await award.evaluate(el=>getComputedStyle(el,'::after').animationName)).toBe('award-reflection');
 await page.waitForTimeout(160);await page.screenshot({path:`work/test-results/touch-award-${width}.png`});await page.waitForTimeout(1000);
 // Scrolling back must not restart the one-time reveals.
 const project=page.locator('.project').first();await project.scrollIntoViewIfNeeded();await page.waitForTimeout(300);
 expect(await project.evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length)).toBe(0);
 await context.route('https://www.behance.net/**',r=>r.fulfill({body:'Case study destination'}));
 await context.route('https://behance.net/**',r=>r.fulfill({body:'Case study destination'}));
 const popupPromise=page.waitForEvent('popup');await project.locator('a').tap();const popup=await popupPromise;
 expect(popup.url()).toContain('behance.net/');await popup.close();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(errors).toEqual([]);await context.close();
});
test('reduced motion touch preserves static gold feedback',async({browser})=>{
 const context=await browser.newContext({hasTouch:true,isMobile:true,reducedMotion:'reduce',viewport:{width:375,height:812}});
 const page=await context.newPage();await page.goto(route);
 const card=page.locator('.competencies li').first();await card.tap();await expect(card).toHaveClass(/touch-lit/);
 await expect(page.locator('.touch-magic')).toHaveCount(0);
 await expect(card).toHaveCSS('transition-duration','0s');
 expect(await card.evaluate(el=>el.getAnimations({subtree:true}).length)).toBe(0);
 await expect(card).toHaveCSS('opacity','1');await page.waitForTimeout(1050);await expect(card).not.toHaveClass(/touch-lit/);
 await context.close();
});
test('touch handlers accept hybrid pen input without mouse tap effects',async({page})=>{
 await page.goto(route);const card=page.locator('.competencies li').first();await card.scrollIntoViewIfNeeded();await page.waitForTimeout(1100);
 await card.click();await expect(card).not.toHaveClass(/touch-lit/);
 await card.dispatchEvent('pointerdown',{pointerType:'pen',pointerId:3,isPrimary:true});
 await card.dispatchEvent('pointerup',{pointerType:'pen',pointerId:3});await expect(card).toHaveClass(/touch-lit/);
 await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('.touch-magic')).toHaveCount(0);
});
