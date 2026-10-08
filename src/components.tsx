import {useEffect,useRef,useState} from 'react';
import {languages,locales,type Locale,type Copy} from './locales';
import {withBase} from './paths';

export function Asset({src,alt,fallback,className='',priority=false}:{src:string;alt:string;fallback:string;className?:string;priority?:boolean}) {
 const [failed,setFailed]=useState(false);
 const ref=useRef<HTMLImageElement>(null);
 useEffect(()=>{if(ref.current?.complete && !ref.current.naturalWidth)setFailed(true)},[]);
 return <div className={`asset ${className}`}>{!failed ? <img ref={ref} src={withBase(src)} alt={alt} width={priority?720:1200} height={priority?900:750} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':undefined} onError={()=>setFailed(true)}/> : <span className="asset-empty">{fallback}</span>}</div>
}
export function Header({locale,t}:{locale:Locale;t:Copy}) {
 const [open,setOpen]=useState(false);
 const button=useRef<HTMLButtonElement>(null);
 const ids=['projects','about','contact'];
 return <header className="header" id="top" onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);button.current?.focus()}}}>
  <div className="header-inner"><a className="brand" href={withBase(`${locale}/`)} aria-label={t.home}><Asset src="/images/tricia-logo-transparent.png" alt="Trícia Linewberg" fallback="Trícia Linewberg"/></a>
  <button className="menu-toggle" ref={button} aria-expanded={open} aria-controls="main-nav" onClick={()=>setOpen(!open)}><span className="menu-label">{open?t.close:t.menu}</span><svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d={open?'M5 5l10 10M15 5L5 15':'M3 5h14M3 10h14M3 15h14'}/></svg></button>
  <nav id="main-nav" className={`navigation ${open?'is-open':''}`} aria-label={t.menu}>{t.nav.map((label,i)=><a key={label} href={`#${ids[i]}`} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
  <nav className="languages" aria-label={t.language}>{locales.map(l=><a href={withBase(`${l}/`)} key={l} lang={l==='pt-br'?'pt-BR':l} hrefLang={l==='pt-br'?'pt-BR':l} aria-label={languages[l]} aria-current={locale===l?'page':undefined} onClick={e=>{e.currentTarget.href=`${withBase(`${l}/`)}${window.location.hash}`}}>{l==='pt-br'?'PT':l.toUpperCase()}</a>)}</nav>
 </div></header>
}
export function External({href,children,className}:{href:string;children:React.ReactNode;className?:string}) {return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>}
