import { useEffect, useRef, useState } from "react";
import { languages, locales, type Locale, type Copy } from "./locales";

export function Asset({
  src,
  alt,
  fallback,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (ref.current?.complete && !ref.current.naturalWidth) setFailed(true);
  }, []);
  return (
    <div className={`asset ${className}`}>
      {!failed ? (
        <img
          ref={ref}
          src={src}
          alt={alt}
          width={priority ? 720 : 1200}
          height={priority ? 900 : 750}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="asset-empty">{fallback}</span>
      )}
    </div>
  );
}
export function Header({ locale, t }: { locale: Locale; t: Copy }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const ids = ["projects", "about", "contact"];
  return (
    <header
      className="header"
      id="top"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <a className="brand" href={`/${locale}/`} aria-label={t.home}>
        <Asset
          src="/images/branding/tricia-logo.png"
          alt="Trícia Linewberg"
          fallback="Trícia Linewberg"
        />
      </a>
      <button
        className="menu-toggle"
        ref={button}
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? t.close : t.menu}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav
        id="main-nav"
        className={`navigation ${open ? "is-open" : ""}`}
        aria-label={t.menu}
      >
        {t.nav.map((label, i) => (
          <a key={label} href={`#${ids[i]}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <nav className="languages" aria-label={t.language}>
        {locales.map((l) => (
          <a
            href={`/${l}/`}
            key={l}
            lang={l === "pt-br" ? "pt-BR" : l}
            hrefLang={l === "pt-br" ? "pt-BR" : l}
            aria-label={languages[l]}
            aria-current={locale === l ? "page" : undefined}
            onClick={(e) => {
              e.currentTarget.href = `/${l}/${window.location.hash}`;
            }}
          >
            {l === "pt-br" ? "PT" : l.toUpperCase()}
          </a>
        ))}
      </nav>
    </header>
  );
}
export function External({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
