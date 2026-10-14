import {useTheatricalMotion} from './motion';
import {ContactLinks} from './ContactLinks';
import {Asset,Header} from './components';
import {translations,type Locale} from './locales';
import {projects} from './projects';
export default function App({locale}:{locale:Locale}) {
 useTheatricalMotion();
 const t=translations[locale];
 return <><a className="skip" href="#main">{t.skip}</a><Header locale={locale} t={t}/><main id="main">
 <section className="hero" aria-labelledby="hero-title">
  <div className="hero-inner">
   <div className="hero-copy">
    <p className="welcome">{t.welcome}</p>
    <h1 id="hero-title"><span className="intro">{t.intro}</span>{' '}<span className="designer-name">Trícia Linewberg.</span></h1>
    <p className="hero-subtitle">{t.subtitle}</p>
    <a className="ticket" href="#projects" aria-label={t.ticket}><span className="ticket-label">ADMIT ONE</span></a>
   </div>
   <figure className="portrait"><Asset src="/images/%232a1a30%20(8).png" alt={t.portrait} fallback={t.missingPortrait} priority/></figure>
  </div>
 </section>
 <section className="works" id="projects" aria-labelledby="works-title">
  <div className="works-inner"><div className="section-heading"><h2 id="works-title">{t.works}</h2><p>{t.worksIntro}</p></div>
  <div className="project-list">{projects.map((p,i)=><article className={`project project--${p.id}`} key={p.id}>
   <a className="project-link" href={p.url} target="_blank" rel="noopener noreferrer" aria-labelledby={`${p.id}-title ${p.id}-link`}>
    <div className="project-image"><Asset src={p.image} alt="" fallback={t.missingCover}/></div>
    <div className="project-copy"><h3 id={`${p.id}-title`}>{p.name}</h3><p>{t.descriptions[i]}</p><span className="case-link" id={`${p.id}-link`}>{t.view}<span aria-hidden="true">↗</span><span className="sr-only"> — {t.newTab}</span></span></div>
   </a>
  </article>)}</div></div>
 </section>
 <section className="about" id="about" aria-labelledby="about-title">
  <div className="about-inner">
   <div className="about-intro"><h2 id="about-title">{t.about}</h2><p className="about-lead">{t.aboutLead}</p></div>
   <ul className="competencies" aria-label={t.skillsTitle}>{t.skills.map(s=><li key={s}>{s}</li>)}</ul>
   <section className="about-achievements" aria-labelledby="awards-title"><h3 id="awards-title">{t.recognition}</h3><div className="about-awards">{t.awards.map((a,i)=><div className="about-award" key={i}><p className="award-placement">{a}</p><h4>{t.awardNames[i]}</h4><p className="award-detail">{t.awardsDetail[i]}</p></div>)}</div></section>
  </div>
 </section>
 <section className="contact" id="contact" aria-label={t.nav[2]}><div className="contact-inner"><ContactLinks t={t}/></div></section>
 </main><footer className="footer">Trícia Linewberg</footer></>
}
