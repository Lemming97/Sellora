import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { forms, site } from '../content/site.js';
import { sendForm, validateField } from '../forms/forms.js';
import { trackLead } from '../analytics/googleTag.js';

// A modal form ('audit' or 'contact'). Mount it to open; it calls onClose when dismissed.
// Focuses a field by id; a group of radio buttons focuses its selected or first option.
function focusField(form, id) {
  const el = form?.elements[id];
  if (!el) return;
  if (typeof el.focus === 'function') el.focus();
  else (Array.from(el).find((r) => r.checked) || el[0])?.focus();
}

export default function FormModal({ type, initial = {}, onClose }) {
  const { t, lang } = useLanguage();
  const fields = forms[type];
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const pressedBackdrop = useRef(false);
  const botcheckRef = useRef(null); // hidden honeypot: real visitors never tick it
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((f) => [f.id, initial[f.id] ?? ''])));
  // An audit request from a brand not yet on Amazon is a launch request.
  const isLaunch = type === 'audit' && values.selling === 'no';
  const copy = isLaunch ? t.forms.launch : t.forms[type];
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | failed | sent | mailto

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    // Start on the first field still empty (skips a prefilled choice).
    const first = fields.find((f) => !values[f.id]) || fields[0];
    focusField(formRef.current, first.id);
  }, [fields]); // eslint-disable-line react-hooks/exhaustive-deps

  const close = () => dialogRef.current.close();

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field.id]: value }));
    // Once a field has shown an error, re-check it as the visitor types so it clears right away.
    if (errors[field.id] !== undefined) {
      setErrors((prev) => ({ ...prev, [field.id]: validateField(field, value, t.forms.errors) }));
    }
  };

  const handleBlur = (field) => {
    setErrors((prev) => ({ ...prev, [field.id]: validateField(field, values[field.id], t.forms.errors) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const next = Object.fromEntries(fields.map((f) => [f.id, validateField(f, values[f.id], t.forms.errors)]));
    setErrors(next);
    const firstInvalid = fields.find((f) => next[f.id]);
    if (firstInvalid) {
      focusField(formRef.current, firstInvalid.id);
      return;
    }

    setStatus('sending');
    try {
      const result = await sendForm({
        kind: type,
        subject: copy.title,
        fields,
        values,
        labels: t.forms.fields,
        choices: t.forms.choices,
        lang,
        botcheck: botcheckRef.current?.checked,
      });
      // Count a lead only when the form service confirmed delivery.
      if (result === 'sent') trackLead(isLaunch ? 'launch' : type);
      setStatus(result);
    } catch {
      setStatus('failed');
    }
  };

  const done = status === 'sent' || status === 'mailto';
  const titleId = `${type}-modal-title`;

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={titleId}
      onClose={onClose}
      onPointerDown={(e) => { pressedBackdrop.current = e.target === e.currentTarget; }}
      onClick={(e) => { if (pressedBackdrop.current && e.target === e.currentTarget) close(); }}
    >
      <div className="modal-body">
        <button type="button" className="modal-close" onClick={close} aria-label={t.forms.close}>×</button>
        <h2 id={titleId}>{copy.title}</h2>

        {done ? (
          <div className="modal-done" role="status">
            <p>{t.forms.success[status].replace('{email}', site.email)}</p>
            <button type="button" className="btn-primary" onClick={close}>{t.forms.close}</button>
          </div>
        ) : (
          <>
            <p className="modal-intro">{copy.intro}</p>
            <form ref={formRef} noValidate onSubmit={handleSubmit}>
              <div className="form-grid">
                {fields.map((field) => (
                  <Field
                    key={field.id}
                    field={field}
                    id={`${type}-${field.id}`}
                    label={t.forms.fields[field.id]}
                    choiceLabels={t.forms.choices?.[field.id]}
                    optionalLabel={t.forms.optional}
                    value={values[field.id]}
                    error={errors[field.id]}
                    onChange={(value) => handleChange(field, value)}
                    onBlur={() => handleBlur(field)}
                  />
                ))}
              </div>
              <input
                ref={botcheckRef}
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="form-honeypot"
              />
              <p className="form-required-note">{t.forms.requiredNote}</p>
              {status === 'failed' && (
                <p className="form-error" role="alert">{t.forms.failed.replace('{email}', site.email)}</p>
              )}
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={close}>{t.forms.cancel}</button>
                <button type="submit" className="btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? t.forms.sending : copy.submit}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}

// A required either/or question shown as two large radio options.
function ChoiceField({ field, id, label, choiceLabels, value, error, onChange }) {
  const errorId = `${id}-error`;
  return (
    <fieldset
      className="form-field form-choice"
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend>
        {label}
        {field.required && <span className="form-required" aria-hidden="true"> *</span>}
      </legend>
      <div className="form-choice-options">
        {field.options.map((option) => (
          <label key={option} className={value === option ? 'form-choice-option selected' : 'form-choice-option'}>
            <input
              type="radio"
              name={field.id}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              required={field.required}
            />
            <span>{choiceLabels[option]}</span>
          </label>
        ))}
      </div>
      {error && <p className="form-field-error" id={errorId}>{error}</p>}
    </fieldset>
  );
}

function Field(props) {
  if (props.field.type === 'choice') return <ChoiceField {...props} />;
  return <TextField {...props} />;
}

function TextField({ field, id, label, optionalLabel, value, error, onChange, onBlur }) {
  const isTextarea = field.type === 'textarea';
  const Control = isTextarea ? 'textarea' : 'input';
  const errorId = `${id}-error`;

  return (
    <div className={field.half ? 'form-field form-field-half' : 'form-field'}>
      <label htmlFor={id}>
        {label}
        {field.required
          ? <span className="form-required" aria-hidden="true"> *</span>
          : <span className="form-optional"> ({optionalLabel})</span>}
      </label>
      <Control
        id={id}
        name={field.id}
        type={isTextarea ? undefined : field.type ?? 'text'}
        rows={isTextarea ? 5 : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={field.autoComplete}
        maxLength={field.maxLength}
        required={field.required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <p className="form-field-error" id={errorId}>{error}</p>}
    </div>
  );
}
