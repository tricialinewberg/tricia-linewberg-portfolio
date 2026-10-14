import {useEffect} from 'react';
import {setupTouchFeedback} from './touch-motion';

/** All motion is enhancement: static markup is visible before setup and after cleanup. */
export function useTheatricalMotion() {
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const disposeTouch=setupTouchFeedback(reduced);
  let dispose=()=>{};
  const configure=()=>{
   dispose();
   const cleanups:Array<()=>void>=[];
   if(reduced.matches){dispose=()=>{};return;}
   if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
     for(const entry of entries){
      if(!entry.isIntersecting)continue;
      const element=entry.target as HTMLElement;
      if(element.dataset.revealed)continue;
      element.dataset.revealed='true';
      element.classList.add('is-revealed');
      const complete=()=>observer.unobserve(element);
      element.addEventListener('animationend',complete,{once:true});
      cleanups.push(()=>element.removeEventListener('animationend',complete));
     }
    },{threshold:.12});
    document.querySelectorAll<HTMLElement>('.project, .competencies, .about-award').forEach(el=>{
     if(!el.dataset.revealed)observer.observe(el);
    });
    cleanups.push(()=>observer.disconnect());
   }
   if(fine.matches && typeof Element.prototype.animate==='function'){
    const layer=document.createElement('div');
    layer.className='wand-dust';layer.setAttribute('aria-hidden','true');
    const pool=Array.from({length:24},(_,i)=>{
     const node=document.createElement('i');
     node.className=i%3===0?'dust-star':i%3===1?'dust-point':'dust-glow';
     layer.append(node);return node;
    });
    const cursor=document.createElement('div');
    cursor.className='wand-cursor';
    const wand=document.createElement('img');
    wand.src=new URL('./wand.svg',import.meta.url).href;
    wand.alt='';wand.draggable=false;cursor.append(wand);layer.append(cursor);
    document.body.append(layer);
    const animations=new Map<HTMLElement,Animation>();
    let next=0,lastTime=0,lastX=-100,lastY=-100,frame=0;
    let x=0,y=0,active:HTMLElement|null=null,previous:HTMLElement|null=null;
    let bounds:DOMRect|null=null,enabled=false;
    const resetSurface=()=>{
     if(previous){
      for(const key of ['--light-x','--light-y','--tilt-x','--tilt-y'])previous.style.removeProperty(key);
      previous.classList.remove('pointer-lit');
     }
     previous=null;bounds=null;
    };
    const emit=(px:number,py:number)=>{
     const node=pool[next++%pool.length];
     animations.get(node)?.cancel();
     const phase=next*2.39996;
     const dx=Math.cos(phase)*18;
     const dy=12+Math.sin(phase)*16;
     node.style.left=px+'px';node.style.top=py+'px';
     const animation=node.animate([
      {opacity:0,transform:'translate(-50%, -50%) scale(.35) rotate(0deg)'},
      {opacity:1,offset:.12,transform:'translate(-50%, -50%) scale(1) rotate(15deg)'},
      {opacity:.85,offset:.42,transform:'translate(calc(-50% + '+dx*.3+'px), calc(-50% + '+dy*.3+'px)) scale(.9) rotate(30deg)'},
      {opacity:0,transform:'translate(calc(-50% + '+dx+'px), calc(-50% + '+dy+'px)) scale(.2) rotate(65deg)'}
     ],{duration:620,easing:'linear'});
     animations.set(node,animation);
     animation.onfinish=()=>{if(animations.get(node)===animation)animations.delete(node);};
    };
    const hide=()=>{
     enabled=false;document.body.classList.remove('wand-ready');cursor.classList.remove('visible','interactive');
     animations.forEach(a=>a.cancel());animations.clear();
     cancelAnimationFrame(frame);frame=0;resetSurface();
    };
    const render=()=>{
     frame=0;
     if(!enabled)return;
     cursor.style.transform='translate3d('+x+'px,'+y+'px,0)';
     if(active!==previous){resetSurface();previous=active;bounds=active?.getBoundingClientRect()||null;}
     if(active&&bounds){
      const px=Math.max(0,Math.min(1,(x-bounds.left)/bounds.width));
      const py=Math.max(0,Math.min(1,(y-bounds.top)/bounds.height));
      active.style.setProperty('--light-x',(px*100)+'%');
      active.style.setProperty('--light-y',(py*100)+'%');
      active.style.setProperty('--tilt-x',((.5-py)*5)+'deg');
      active.style.setProperty('--tilt-y',((px-.5)*7)+'deg');
      active.classList.add('pointer-lit');
     }
    };
    const move=(event:PointerEvent)=>{
     if(event.pointerType!=='mouse')return;
     const target=event.target instanceof Element?event.target:null;
     if(document.hidden||event.buttons||target?.closest('input, textarea, [contenteditable="true"]')){hide();return;}
     x=event.clientX;y=event.clientY;enabled=true;
     document.body.classList.add('wand-ready');cursor.classList.add('visible');
     cursor.classList.toggle('interactive',!!target?.closest('a, button, [role="button"]'));
     active=target?.closest<HTMLElement>('.ticket, .project-link, .competencies li, .about-award, .portrait')||null;
     if(!frame)frame=requestAnimationFrame(render);
     const now=performance.now();
     if(now-lastTime<38||Math.hypot(x-lastX,y-lastY)<5)return;
     lastTime=now;lastX=x;lastY=y;emit(x,y);
    };
    const scroll=()=>{document.body.classList.remove('wand-ready');cursor.classList.remove('visible');active=null;resetSurface();};
    const key=(event:KeyboardEvent)=>{if(event.key==='Tab')hide();};
    const leave=(event:PointerEvent)=>{if(!event.relatedTarget)hide();};
    document.addEventListener('pointermove',move,{passive:true});
    document.addEventListener('keydown',key);
    document.addEventListener('pointerout',leave);
    document.addEventListener('visibilitychange',hide);
    window.addEventListener('blur',hide);
    window.addEventListener('scroll',scroll,{passive:true});
    cleanups.push(()=>{
     document.removeEventListener('pointermove',move);
     document.removeEventListener('keydown',key);document.removeEventListener('pointerout',leave);
     document.removeEventListener('visibilitychange',hide);window.removeEventListener('blur',hide);
     window.removeEventListener('scroll',scroll);
     hide();layer.remove();
    });
   }
   dispose=()=>cleanups.forEach(fn=>fn());
  };
  configure();reduced.addEventListener('change',configure);fine.addEventListener('change',configure);
  return ()=>{disposeTouch();dispose();reduced.removeEventListener('change',configure);fine.removeEventListener('change',configure);};
 },[]);
}
