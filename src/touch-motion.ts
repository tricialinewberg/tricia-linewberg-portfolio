/** Pointer activation enhancement: never capture pointers, cancel native events or follow a drag. */
export function setupTouchFeedback(reduced:MediaQueryList) {
 const selector='.ticket, .competencies li, .about-award, .project-link, .contact-links a';
 let pending:{id:number;target:HTMLElement;x:number;y:number;time:number}|null=null;
 const timers=new Map<HTMLElement,ReturnType<typeof setTimeout>>();
 const animations=new Set<Animation>();
 let layer:HTMLDivElement|null=null;
 let particles:HTMLElement[]=[];
 const clearParticles=()=>{animations.forEach(a=>a.cancel());animations.clear();layer?.remove();layer=null;particles=[];};
 const burst=(x:number,y:number)=>{
  if(reduced.matches||typeof Element.prototype.animate!=='function')return;
  if(!layer){
   layer=document.createElement('div');layer.className='touch-magic';layer.setAttribute('aria-hidden','true');
   particles=Array.from({length:9},(_,i)=>{
    const particle=document.createElement('i');particle.className=i===0?'touch-star':i%2?'touch-spark':'touch-point';
    layer!.append(particle);return particle;
   });
   document.body.append(layer);
  }
  animations.forEach(a=>a.cancel());animations.clear();
  particles.forEach((particle,i)=>{
   particle.style.left=x+'px';particle.style.top=y+'px';
   const angle=(i-1)*Math.PI/4;
   const dx=i?Math.cos(angle)*(30+i*2):0,dy=i?Math.sin(angle)*(30+i*2):-8;
   const animation=particle.animate([
    {opacity:0,transform:'translate(-50%,-50%) scale(.45)'},
    {opacity:1,offset:.15,transform:`translate(calc(-50% + ${dx*.3}px),calc(-50% + ${dy*.3}px)) scale(1)`},
    {opacity:.9,offset:.5,transform:`translate(calc(-50% + ${dx*.7}px),calc(-50% + ${dy*.7}px)) scale(.95)`},
    {opacity:0,transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.4)`}
   ],{duration:720,easing:'linear'});
   animations.add(animation);animation.onfinish=()=>animations.delete(animation);
  });
 };
 const cancel=()=>{pending=null;};
 const down=(event:PointerEvent)=>{
  if(event.pointerType!=='touch'&&event.pointerType!=='pen'&&event.pointerType!=='mouse')return;
  if(event.pointerType==='mouse'&&event.button!==0)return;
  if(!event.isPrimary){cancel();return;}
  const target=event.target instanceof Element?event.target.closest<HTMLElement>(selector):null;
  pending=target?{id:event.pointerId,target,x:event.clientX,y:event.clientY,time:performance.now()}:null;
 };
 const move=(event:PointerEvent)=>{
  if(pending&&pending.id===event.pointerId&&Math.hypot(event.clientX-pending.x,event.clientY-pending.y)>10)cancel();
 };
 const up=(event:PointerEvent)=>{
  if(!pending||pending.id!==event.pointerId)return;
  const tap=pending;cancel();
  if(performance.now()-tap.time>600||Math.hypot(event.clientX-tap.x,event.clientY-tap.y)>10)return;
  if(!(event.target instanceof Node)||!tap.target.contains(event.target))return;
  // A long press/text selection is not an activation.
  if(window.getSelection()?.toString())return;
  clearTimeout(timers.get(tap.target));
  tap.target.classList.add('touch-lit');
  timers.set(tap.target,setTimeout(()=>{tap.target.classList.remove('touch-lit');timers.delete(tap.target);},950));
  if(tap.target.matches('.ticket, .competencies li, .about-award'))burst(event.clientX,event.clientY);
 };
 const preference=()=>{if(reduced.matches)clearParticles();};
 const reset=()=>{cancel();clearParticles();timers.forEach((timer,target)=>{clearTimeout(timer);target.classList.remove('touch-lit');});timers.clear();};
 document.addEventListener('pointerdown',down,{passive:true});
 document.addEventListener('pointermove',move,{passive:true});
 document.addEventListener('pointerup',up,{passive:true});
 document.addEventListener('pointercancel',cancel,{passive:true});
 document.addEventListener('scroll',cancel,{passive:true,capture:true});
 document.addEventListener('visibilitychange',reset);
 window.addEventListener('blur',reset);
 reduced.addEventListener('change',preference);
 return ()=>{
  reset();document.removeEventListener('pointerdown',down);document.removeEventListener('pointermove',move);
  document.removeEventListener('pointerup',up);document.removeEventListener('pointercancel',cancel);
  document.removeEventListener('scroll',cancel,true);document.removeEventListener('visibilitychange',reset);
  window.removeEventListener('blur',reset);reduced.removeEventListener('change',preference);
 };
}
