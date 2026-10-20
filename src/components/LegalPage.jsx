import { Fragment, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { legalContent } from '../content/legal/index.js';
import { legalPages, site } from '../content/site.js';
import { openCookieSettings } from '../analytics/googleTag.js';
import { useFormModal } from '../forms/FormModalContext.jsx';
import EmphasisTitle from './EmphasisTitle.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import Logo from './Logo.jsx';

// Turns "[text](address)" in the legal text into links. "form:contact" opens the
// contact form pop-up; the link still points at the homepage's contact section, so
// Cmd/Ctrl-click and "open in new tab" keep working.
function RichText({ text }) {
  const openForm = useFormModal();
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <Fragment key={i}>{part}</Fragment>;
    const [, label, href] = match;
    if (href.startsWith('form:')) {
      const type = href.slice(5);
      const onClick = (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        openForm(type);
      };
      return <a key={i} href={`/#${type}`} onClick={onClick} aria-haspopup="dialog">{label}</a>;
    }
    const external = /^https?:/.test(href);
    return (
      <a key={i} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {label}
      </a>
    );
  });
}

// One of the four legal pages (legal notice, privacy, cookies, terms), in the
// visitor's language. Text: src/content/legal/<lang>.js
export default function LegalPage({ id }) {
  const { lang } = useLanguage();
  const content = legalContent(lang);
  const page = content[id];
  const { ui } = content;

  useEffect(() => {
    document.title = `${page.nav} · ${site.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.intro);
  }, [page]);

  return (
    <>
      <nav className="legal-nav">
        <Logo href="/" />
        <div className="legal-nav-right">
          <a href="/" className="legal-back"><span aria-hidden="true">← </span>{ui.back}</a>
          <LanguageSwitcher />
        </div>
      </nav>

      <main className="legal-layout" id="top">
        <nav className="legal-menu" aria-label={ui.menu}>
          <span className="legal-menu-title">{ui.label}</span>
          {Object.keys(legalPages).map((pageId) => (
            <a
              key={pageId}
              href={legalPages[pageId]}
              aria-current={pageId === id ? 'page' : undefined}
              className={pageId === id ? 'active' : undefined}
            >
              {content[pageId].nav}
            </a>
          ))}
        </nav>

        <article className="legal-content" lang={lang}>
          <span className="legal-updated">{ui.lastUpdated} {content.lastUpdatedText}</span>
          <h1><EmphasisTitle title={page.title} /></h1>
          <p className="legal-intro">{page.intro}</p>
          {ui.languageNote && <p className="legal-language-note">{ui.languageNote}</p>}

          {page.sections.map((section) => (
            <section key={section.heading} className="legal-section">
              <h2>{section.heading}</h2>
              {section.table && (
                <div className="legal-table-wrap">
                  <table className="legal-table">
                    <thead>
                      <tr>{section.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, i) => (i === 0 ? <td key={i}><code>{cell}</code></td> : <td key={i}>{cell}</td>))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.paragraphs?.map((p) => <p key={p}><RichText text={p} /></p>)}
              {section.list && (
                <ul className="legal-list">
                  {section.list.map((item) => <li key={item}><RichText text={item} /></li>)}
                </ul>
              )}
              {section.note && <p><RichText text={section.note} /></p>}
              {section.action === 'cookieSettings' && (
                <button type="button" className="btn-primary legal-action" onClick={openCookieSettings}>{ui.openSettings}</button>
              )}
            </section>
          ))}
        </article>
      </main>
    </>
  );
}
