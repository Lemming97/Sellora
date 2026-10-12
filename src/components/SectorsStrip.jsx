import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function SectorsStrip() {
  const { t } = useLanguage();
  return (
    <div className="logos-strip">
      <div className="logos-label">{t.sectors.label}</div>
      <div className="logo-pills">
        {t.sectors.items.map((sector) => (
          <div className="logo-pill" key={sector}>{sector}</div>
        ))}
      </div>
    </div>
  );
}
