import {useEffect} from 'react';

/** Progressive enhancement: no content is hidden before observation or after cleanup. */
export function useTheatricalMotion() {
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  let dispose=()=>{};
  const configure=()=>{
   dispose();
   const cleanups:Array<()=>void>=[];
   if(!reduced.matches && 'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
     for(const entry of entries){
      if(!entry.isIntersecting)continue;
      const element=entry.target as HTMLElement;
      if(!element.dataset.revealed){
       element.dataset.revealed='true';
       element.classList.add('stage-reveal');
      }
      // The class is one-shot; no observer is needed during its CSS animation.
      observer.unobserve(element);
     }
    },{threshold:.08});
    document.querySelectorAll<HTMLElement>('.project, .about-award').forEach(el=>{
     if(!el.dataset.revealed)observer.observe(el);
    });
    cleanups.push(()=>observer.disconnect());
   }
   if(fine.matches && !reduced.matches && typeof Element.prototype.animate==='function'){
    const layer=document.createElement('div');
    layer.className='wand-dust';
    layer.setAttribute('aria-hidden','true');
    const pool=Array.from({length:12},(_,i)=>{
     const node=document.createElement('i');
     node.className=i%3===0?'dust-star':'dust-point';
     layer.append(node);return node;
    });
    document.body.append(layer);
    let next=0,lastTime=0,lastX=-100,lastY=-100;
    const animations=new Map<HTMLElement,Animation>();
    const clear=()=>{animations.forEach(a=>a.cancel());animations.clear();};
    const move=(event:PointerEvent)=>{
     if(event.pointerType!=='mouse'||event.buttons||document.hidden)return;
     const now=performance.now();
     if(now-lastTime<70||Math.hypot(event.clientX-lastX,event.clientY-lastY)<8)return;
     lastTime=now;lastX=event.clientX;lastY=event.clientY;
     const node=pool[next++%pool.length];
     animations.get(node)?.cancel();
     const side=next%2===0?1:-1;
     node.style.left=(event.clientX+side*5)+'px';
     node.style.top=(event.clientY+7)+'px';
     const animation=node.animate([
      {opacity:0,transform:'translate(0, 0) scale(.6)'},
      {opacity:.55,offset:.18,transform:'translate(0, 1px) scale(1)'},
      {opacity:0,transform:'translate('+side*7+'px, 13px) scale(.3)'}
     ],{duration:480,easing:'ease-out'});
     animations.set(node,animation);
     animation.onfinish=()=>{if(animations.get(node)===animation)animations.delete(node);};
    };
    document.addEventListener('pointermove',move,{passive:true});
    document.addEventListener('visibilitychange',clear);
    window.addEventListener('blur',clear);
    cleanups.push(()=>{
     document.removeEventListener('pointermove',move);
     document.removeEventListener('visibilitychange',clear);
     window.removeEventListener('blur',clear);
     clear();layer.remove();
    });
   }
   dispose=()=>{cleanups.forEach(fn=>fn());};
  };
  configure();
  reduced.addEventListener('change',configure);
  fine.addEventListener('change',configure);
  return ()=>{dispose();reduced.removeEventListener('change',configure);fine.removeEventListener('change',configure);};
 },[]);
}
