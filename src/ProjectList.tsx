import {Asset} from './components';
import type {Copy} from './locales';
import {projects} from './projects';

/** Keep the Assistant row's independent destinations separate from whole-row links. */
export function ProjectList({t}:{t:Copy}) {
 return (
  <div className="project-list">{projects.map((p,i)=><article className={`project project--${p.id}`} key={p.id}>
   {p.id==='assistant-to-the-villain'?<div className="project-link">
    <a className="project-image" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`${t.cover} ${p.name} — ${t.viewCase} — ${t.newTab}`}><Asset src={p.image} alt="" fallback={t.missingCover}/></a>
    <div className="project-copy"><h3 id={`${p.id}-title`}><a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}<span className="sr-only"> — {t.viewCase} — {t.newTab}</span></a></h3><p>{t.descriptions[i]}</p>
     <div className="project-actions">
      <a className="case-link" href="https://assistant-to-the-villain-fan-site.vercel.app/" target="_blank" rel="noopener noreferrer">{t.exploreWebsite}<span aria-hidden="true">↗</span><span className="sr-only"> — {p.name} — {t.newTab}</span></a>
      <a className="case-link" href={p.url} target="_blank" rel="noopener noreferrer">{t.viewCase}<span aria-hidden="true">↗</span><span className="sr-only"> — {p.name} — {t.newTab}</span></a>
     </div>
    </div>
   </div>:<a className="project-link" href={p.url} target="_blank" rel="noopener noreferrer" aria-labelledby={`${p.id}-title ${p.id}-link`}>
    <div className="project-image"><Asset src={p.image} alt="" fallback={t.missingCover}/></div>
    <div className="project-copy"><h3 id={`${p.id}-title`}>{p.name}</h3><p>{t.descriptions[i]}</p><span className="case-link" id={`${p.id}-link`}>{t.view}<span aria-hidden="true">↗</span><span className="sr-only"> — {t.newTab}</span></span></div>
   </a>}
  </article>)}</div>
 );
}
