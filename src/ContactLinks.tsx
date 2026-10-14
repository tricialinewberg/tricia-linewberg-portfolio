import type {Copy} from './locales';

export function ContactLinks({t}:{t:Copy}) {
 const links=[
  {label:'GitHub',href:'https://github.com/tricialinewberg'},
  {label:'LinkedIn',href:'https://www.linkedin.com/in/tricia-linewberg/'},
  {label:'Email',href:'mailto:triciaux@gmail.com'},
  {label:'WhatsApp',href:'https://wa.me/5586995473936?text='+encodeURIComponent(t.message)}
 ];
 return <div className="contact-links">{links.map(({label,href})=>{
  const content=<><ContactIcon name={label}/><span>{label}</span></>;
  return <a key={label} href={href} target={label==='Email'?undefined:'_blank'} rel={label==='Email'?undefined:'noopener noreferrer'}>{content}{label!=='Email'&&<span className="sr-only"> — {t.newTab}</span>}</a>;
 })}</div>;
}
function ContactIcon({name}:{name:string}) {
 return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
  {name==='GitHub'&&<path fill="currentColor" stroke="none" d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.08c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.12-1.25-5.12-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.97 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.69.11 2.97.72.79 1.16 1.79 1.16 3.02 0 4.32-2.62 5.28-5.13 5.56.4.35.76 1.03.76 2.08v3.07c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"/>}
  {name==='LinkedIn'&&<><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 10v7m4 0v-7m0 3a3 3 0 0 1 6 0v4"/><circle cx="7" cy="6.5" r=".8" fill="currentColor" stroke="none"/></>}
  {name==='Email'&&<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/></>}
  {name==='WhatsApp'&&<><path d="M21.5 11.7a9.5 9.5 0 0 1-14 8.4L2 21.5l1.5-5.3a9.5 9.5 0 1 1 18-4.5Z"/><path d="M8 7c-1 0-1.5 1.5-1 3 1 3 4 6 7 7 1.5.5 3 0 3-1l-2.5-2-1.5 1c-2-1-3-2-4-4l1-1.5L8 7Z"/></>}
 </svg>;
}
