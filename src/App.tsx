import {Asset,External,Header} from './components';
import {translations,type Locale} from './locales';
import {projects} from './projects';
export default function App({locale}:{locale:Locale}) {
 const t=translations[locale];
 return <><a className="skip" href="#main">{t.skip}</a><Header locale={locale} t={t}/><main id="main">
 <section className="hero" aria-labelledby="hero-title">
  <div className="hero-inner">
   <div className="hero-copy">
    <p className="welcome">{t.welcome}</p>
    <h1 id="hero-title"><span className="intro">{t.intro}</span>{' '}<span className="designer-name">Trícia Linewberg.</span></h1>
    <p className="hero-subtitle">{t.subtitle}</p>
    <a className="ticket" href="#projects" aria-label={t.ticket}><span className="ticket-label">ADMIT ONE</span><span className="ticket-arrow" aria-hidden="true"><svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v20M7 17l7 7 7-7"/></svg></span></a>
   </div>
   <figure className="portrait"><Asset src="/images/%232a1a30%20(8).png" alt={t.portrait} fallback={t.missingPortrait} priority/></figure>
  </div>
 </section>
 <section className="works section" id="projects" aria-labelledby="works-title">
  <div className="section-heading"><p className="eyebrow">01 / {t.nav[0]}</p><h2 id="works-title">{t.works}</h2><p>{t.worksIntro}</p></div>
  <div className="project-list">{projects.map((p,i)=><article className={`project project--${p.id}`} key={p.id}>
   <a className="project-link" href={p.url} target="_blank" rel="noopener noreferrer" aria-labelledby={`${p.id}-title ${p.id}-link`}>
    <div className="project-image"><Asset src={p.image} alt="" fallback={t.missingCover}/></div>
    <div className="project-copy"><h3 id={`${p.id}-title`}>{p.name}</h3><p>{t.descriptions[i]}</p><span className="case-link" id={`${p.id}-link`}>{t.view}<span aria-hidden="true">↗</span><span className="sr-only"> — {t.newTab}</span></span></div>
   </a>
  </article>)}</div>
 </section>
 <section className="about" id="about" aria-labelledby="about-title"><div className="section about-grid"><div><p className="eyebrow">02 / {t.nav[1]}</p><h2 id="about-title">{t.about}</h2><p className="about-lead">{t.aboutLead}</p><span className="ornament" aria-hidden="true">❧</span></div><div className="biography"><p>{t.bio}</p><p>{t.study}</p><h3>{t.skillsTitle}</h3><ul className="skills">{t.skills.map(s=><li key={s}>{s}</li>)}</ul></div></div></section>
 <section className="recognition section" aria-labelledby="awards-title"><p className="eyebrow">03 / {t.recognition}</p><h2 id="awards-title">{t.recognition}</h2><div className="awards">{t.awards.map((a,i)=><div className="award" key={i}><span className="award-index" aria-hidden="true">{i===0?'I':'II'}</span><div><h3>{a}</h3><p>{t.awardsDetail[i]}</p></div></div>)}</div></section>
 <section className="contact section" id="contact" aria-labelledby="contact-title"><div className="contact-inner"><p className="eyebrow">{t.contactLead}</p><h2 id="contact-title">{t.contact}</h2><p>{t.contactBody}</p><div className="contact-links"><External href={`https://wa.me/5586995473936?text=${encodeURIComponent(t.message)}`} className="contact-primary">WhatsApp <span aria-hidden="true">↗</span><span className="sr-only"> — {t.newTab}</span></External><a href="mailto:triciaux@gmail.com">{t.email} <span aria-hidden="true">↗</span></a><External href="https://www.linkedin.com/in/tricia-linewberg/">LinkedIn <span aria-hidden="true">↗</span><span className="sr-only"> — {t.newTab}</span></External></div><a className="email-address" href="mailto:triciaux@gmail.com">triciaux@gmail.com</a></div></section>
 </main><footer className="footer"><p>© 2026 Trícia Linewberg<span>{t.footer}</span></p><a href="#top">{t.top} ↑</a></footer></>
}
