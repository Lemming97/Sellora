/**
 * Sellora auto-reply
 *
 * Sends a branded "we've received your message" email to everyone who submits the
 * audit or contact form on hellosellora.com, in the language they were browsing in.
 *
 * How it works: website submissions arrive at contact@hellosellora.com from Web3Forms
 * with the subject "New audit request: …" or "New message from …". Every 5 minutes this
 * script looks for new ones, replies to the visitor (the email's Reply-To), and labels the
 * thread "Sellora/Auto-replied" so nobody gets two replies.
 *
 * Setup (once), signed in as lindsey@hellosellora.com:
 *   1. Go to script.google.com > New project. Name it "Sellora auto-reply".
 *   2. Replace everything in Code.gs with this file and click Save.
 *   3. Choose "setup" in the function menu and click Run. Approve the Gmail permissions.
 *   4. Optional: run "sendTestEmails" to receive all eight versions yourself.
 *
 * To send from contact@ (recommended), add contact@hellosellora.com under Gmail >
 * Settings > Accounts > Send mail as. Without it, replies come from lindsey@ with the
 * name "Sellora" and reply-to contact@.
 */

const CONFIG = {
  replyFrom: 'contact@hellosellora.com',
  fromName: 'Sellora',
  assetsUrl: 'https://hellosellora.com/email/',
  label: 'Sellora/Auto-replied',
  searchQuery: 'subject:("New audit request" OR "New message from") newer_than:3d',
  maxPerRun: 20,
  defaultLanguage: 'fr',
};

// ===== TEMPLATE START (shared with the preview page) =====

const TEXT = {
  fr: {
    audit: {
      subject: 'Nous avons bien reçu votre demande d’audit · Sellora',
      eyebrow: 'Demande d’audit reçue',
      intro: 'Votre demande d’audit gratuit pour {company} est bien arrivée. Nous l’étudions avec attention et revenons vers vous sous 48 h.',
      introNoCompany: 'Votre demande d’audit gratuit est bien arrivée. Nous l’étudions avec attention et revenons vers vous sous 48 h.',
      stepsTitle: 'La suite',
      steps: [
        ['Nous analysons votre marque', 'Votre catalogue, vos concurrents et votre potentiel sur Amazon.'],
        ['Nous préparons votre audit', 'Des recommandations concrètes, adaptées à votre secteur.'],
        ['Nous en parlons ensemble', 'Un échange pour passer en revue les résultats et vos prochaines étapes.'],
      ],
    },
    contact: {
      subject: 'Nous avons bien reçu votre message · Sellora',
      eyebrow: 'Message reçu',
      intro: 'Votre message est bien arrivé. Nous vous répondons sous 48 h.',
      quoteTitle: 'Votre message',
    },
    thanks: 'Merci',
    thanksAlone: 'Merci\u00a0!',
    colon: ' :',
    closing: 'D’ici là, il vous suffit de répondre à cet e-mail pour ajouter une information.',
    signoff: 'À très vite,',
    team: 'L’équipe Sellora',
    tagline: 'Lancer, développer et scaler votre marque en Europe.',
  },
  en: {
    audit: {
      subject: 'We’ve received your audit request · Sellora',
      eyebrow: 'Audit request received',
      intro: 'Your free audit request for {company} has reached us. We’re reviewing it carefully and will get back to you within 48 hours.',
      introNoCompany: 'Your free audit request has reached us. We’re reviewing it carefully and will get back to you within 48 hours.',
      stepsTitle: 'What happens next',
      steps: [
        ['We analyse your brand', 'Your catalogue, your competitors and your potential on Amazon.'],
        ['We prepare your audit', 'Concrete recommendations tailored to your sector.'],
        ['We talk it through', 'A conversation to go over the findings and your next steps.'],
      ],
    },
    contact: {
      subject: 'We’ve received your message · Sellora',
      eyebrow: 'Message received',
      intro: 'Your message has reached us. We’ll reply within 48 hours.',
      quoteTitle: 'Your message',
    },
    thanks: 'Thank you',
    thanksAlone: 'Thank you!',
    colon: ':',
    closing: 'In the meantime, just reply to this email if you’d like to add anything.',
    signoff: 'Speak soon,',
    team: 'The Sellora team',
    tagline: 'Launch, grow, and scale across Europe.',
  },
  sv: {
    audit: {
      subject: 'Vi har tagit emot din förfrågan om analys · Sellora',
      eyebrow: 'Förfrågan mottagen',
      intro: 'Din förfrågan om en gratis analys för {company} har kommit fram. Vi går igenom den noggrant och återkommer inom 48 timmar.',
      introNoCompany: 'Din förfrågan om en gratis analys har kommit fram. Vi går igenom den noggrant och återkommer inom 48 timmar.',
      stepsTitle: 'Så går det till',
      steps: [
        ['Vi analyserar ditt varumärke', 'Ditt sortiment, dina konkurrenter och din potential på Amazon.'],
        ['Vi tar fram din analys', 'Konkreta rekommendationer anpassade efter din bransch.'],
        ['Vi går igenom den tillsammans', 'Ett samtal om resultaten och dina nästa steg.'],
      ],
    },
    contact: {
      subject: 'Vi har tagit emot ditt meddelande · Sellora',
      eyebrow: 'Meddelande mottaget',
      intro: 'Ditt meddelande har kommit fram. Vi svarar inom 48 timmar.',
      quoteTitle: 'Ditt meddelande',
    },
    thanks: 'Tack',
    thanksAlone: 'Tack!',
    colon: ':',
    closing: 'Under tiden kan du svara på det här mejlet om du vill lägga till något.',
    signoff: 'Hörs snart,',
    team: 'Sellora-teamet',
    tagline: 'Lansera, väx och skala upp i hela Europa.',
  },
  es: {
    audit: {
      subject: 'Hemos recibido tu solicitud de auditoría · Sellora',
      eyebrow: 'Solicitud de auditoría recibida',
      intro: 'Tu solicitud de auditoría gratuita para {company} nos ha llegado. La estamos revisando con atención y te responderemos en 48 horas.',
      introNoCompany: 'Tu solicitud de auditoría gratuita nos ha llegado. La estamos revisando con atención y te responderemos en 48 horas.',
      stepsTitle: 'Próximos pasos',
      steps: [
        ['Analizamos tu marca', 'Tu catálogo, tu competencia y tu potencial en Amazon.'],
        ['Preparamos tu auditoría', 'Recomendaciones concretas adaptadas a tu sector.'],
        ['Lo revisamos juntos', 'Una conversación para repasar los resultados y tus próximos pasos.'],
      ],
    },
    contact: {
      subject: 'Hemos recibido tu mensaje · Sellora',
      eyebrow: 'Mensaje recibido',
      intro: 'Tu mensaje nos ha llegado. Te responderemos en 48 horas.',
      quoteTitle: 'Tu mensaje',
    },
    thanks: 'Gracias',
    thanksAlone: '¡Gracias!',
    colon: ':',
    closing: 'Mientras tanto, puedes responder a este correo si quieres añadir algo.',
    signoff: 'Hasta pronto,',
    team: 'El equipo de Sellora',
    tagline: 'Lanza, crece y escala en toda Europa.',
  },
};

function escapeHtml_(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

/**
 * Builds the reply. kind: 'audit' | 'contact'. lang: 'fr' | 'en' | 'sv' | 'es'.
 * data: { firstName, company, subject, message }. assets: base URL (or a map of data URIs).
 * Returns { subject, html, text }.
 */
function buildReply(kind, lang, data, assets) {
  const L = TEXT[lang] || TEXT.fr;
  const K = L[kind] || L.contact;
  const d = data || {};
  const img = function (name) { return typeof assets === 'string' ? assets + name : assets[name]; };

  const navy = '#0B1929', gold = '#E8A020', goldText = '#9A6210', ink = '#2B3A4D', muted = '#5B6A7D', cream = '#FAF8F4', line = '#ECE6DA';
  const serif = "Georgia,'Times New Roman',serif";
  const sans = "Arial,Helvetica,sans-serif";
  const first = (d.firstName || '').trim();
  const company = (d.company || '').trim();

  const heading = first
    ? escapeHtml_(L.thanks) + ', <em style="font-style:italic;color:' + goldText + ';">' + escapeHtml_(first) + '</em>.'
    : escapeHtml_(L.thanksAlone);
  const introText = kind === 'audit'
    ? (company ? K.intro.replace('{company}', '\u0000') : K.introNoCompany)
    : K.intro;
  const introHtml = escapeHtml_(introText).replace('\u0000', '<strong style="color:' + navy + ';">' + escapeHtml_(company) + '</strong>');

  let middle = '';
  if (kind === 'audit') {
    const rows = K.steps.map(function (s, i) {
      return '' +
        '<tr>' +
          '<td valign="top" style="padding:' + (i ? '16px' : '0') + ' 14px 0 0;width:32px;">' +
            '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>' +
              '<td align="center" valign="middle" width="32" height="32" style="width:32px;height:32px;border-radius:16px;background:' + navy + ';color:' + gold + ';font-family:' + serif + ';font-size:16px;line-height:32px;">' + (i + 1) + '</td>' +
            '</tr></table>' +
          '</td>' +
          '<td valign="top" style="padding:' + (i ? '16px' : '0') + ' 0 0 0;font-family:' + sans + ';">' +
            '<div style="font-size:15px;line-height:22px;font-weight:bold;color:' + navy + ';">' + escapeHtml_(s[0]) + '</div>' +
            '<div style="font-size:14px;line-height:21px;color:' + muted + ';padding-top:2px;">' + escapeHtml_(s[1]) + '</div>' +
          '</td>' +
        '</tr>';
    }).join('');
    middle = '' +
      '<tr><td style="padding:28px 40px 0 40px;">' +
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' + cream + ';border-radius:12px;">' +
          '<tr><td style="padding:24px 24px 26px 24px;">' +
            '<div style="font-family:' + serif + ';font-size:21px;line-height:26px;color:' + navy + ';padding-bottom:16px;">' + escapeHtml_(K.stepsTitle) + '</div>' +
            '<table role="presentation" cellpadding="0" cellspacing="0" border="0">' + rows + '</table>' +
          '</td></tr>' +
        '</table>' +
      '</td></tr>';
  } else if ((d.message || '').trim() || (d.subject || '').trim()) {
    let msg = (d.message || '').trim();
    if (msg.length > 700) msg = msg.slice(0, 700).trim() + '…';
    middle = '' +
      '<tr><td style="padding:28px 40px 0 40px;">' +
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' + cream + ';border-radius:12px;">' +
          '<tr><td style="padding:22px 24px 24px 24px;">' +
            '<div style="font-family:' + sans + ';font-size:11px;line-height:16px;letter-spacing:2px;text-transform:uppercase;color:' + goldText + ';padding-bottom:10px;">' + escapeHtml_(K.quoteTitle) + '</div>' +
            ((d.subject || '').trim() ? '<div style="font-family:' + sans + ';font-size:15px;line-height:22px;font-weight:bold;color:' + navy + ';padding-bottom:6px;">' + escapeHtml_(d.subject.trim()) + '</div>' : '') +
            (msg ? '<div style="font-family:' + serif + ';font-style:italic;font-size:16px;line-height:25px;color:' + ink + ';">' + escapeHtml_(msg).replace(/\n/g, '<br>') + '</div>' : '') +
          '</td></tr>' +
        '</table>' +
      '</td></tr>';
  }

  const html = '' +
    '<!doctype html><html lang="' + lang + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>' + escapeHtml_(K.subject) + '</title></head>' +
    '<body style="margin:0;padding:0;background:' + cream + ';">' +
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">' + escapeHtml_(introText.replace('\u0000', company)) + '</div>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' + cream + ';">' +
      '<tr><td align="center" style="padding:32px 12px;">' +
        '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#FFFFFF;border:1px solid ' + line + ';border-radius:16px;overflow:hidden;">' +
          // Navy header with the logo, then a gold rule
          '<tr><td style="background:' + navy + ';padding:26px 40px;">' +
            '<img src="' + img('sellora-logo-dark.png') + '" width="169" height="48" alt="Sellora" style="display:block;border:0;width:169px;height:48px;">' +
          '</td></tr>' +
          '<tr><td style="background:' + gold + ';height:3px;line-height:3px;font-size:0;">&nbsp;</td></tr>' +
          // Eyebrow, heading, intro
          '<tr><td style="padding:36px 40px 0 40px;font-family:' + sans + ';font-size:11px;line-height:16px;letter-spacing:2px;text-transform:uppercase;color:' + goldText + ';">' + escapeHtml_(K.eyebrow) + '</td></tr>' +
          '<tr><td style="padding:10px 40px 0 40px;font-family:' + serif + ';font-size:34px;line-height:40px;color:' + navy + ';">' + heading + '</td></tr>' +
          '<tr><td style="padding:16px 40px 0 40px;font-family:' + sans + ';font-size:16px;line-height:26px;color:' + ink + ';">' + introHtml + '</td></tr>' +
          middle +
          // Closing and sign-off
          '<tr><td style="padding:28px 40px 0 40px;font-family:' + sans + ';font-size:15px;line-height:24px;color:' + ink + ';">' + escapeHtml_(L.closing) + '</td></tr>' +
          '<tr><td style="padding:24px 40px 0 40px;font-family:' + serif + ';font-style:italic;font-size:17px;line-height:24px;color:' + goldText + ';">' + escapeHtml_(L.signoff) + '</td></tr>' +
          '<tr><td style="padding:2px 40px 36px 40px;font-family:' + serif + ';font-size:19px;line-height:26px;color:' + navy + ';">' + escapeHtml_(L.team) + '</td></tr>' +
          // Seal and tagline
          '<tr><td style="padding:0 40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px dashed #D9D2C4;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>' +
          '<tr><td style="padding:20px 40px 28px 40px;">' +
            '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>' +
              '<td valign="middle" style="padding-right:12px;"><img src="' + img('sellora-seal.png') + '" width="36" height="36" alt="" style="display:block;border:0;width:36px;height:36px;"></td>' +
              '<td valign="middle" style="font-family:' + serif + ';font-style:italic;font-size:15px;line-height:20px;color:' + navy + ';">' + escapeHtml_(L.tagline) +
                '<br><a href="https://hellosellora.com" style="font-family:' + sans + ';font-style:normal;font-size:13px;color:' + goldText + ';text-decoration:none;">hellosellora.com</a></td>' +
            '</tr></table>' +
          '</td></tr>' +
        '</table>' +
      '</td></tr>' +
    '</table></body></html>';

  // Plain-text version for clients that don't show HTML
  const textLines = [
    (first ? L.thanks + ', ' + first + '.' : L.thanksAlone),
    '',
    introText.replace('\u0000', company),
  ];
  if (kind === 'audit') {
    textLines.push('', K.stepsTitle + L.colon);
    K.steps.forEach(function (s, i) { textLines.push((i + 1) + '. ' + s[0] + L.colon + ' ' + s[1]); });
  } else if ((d.message || '').trim()) {
    textLines.push('', K.quoteTitle + L.colon, (d.subject ? d.subject.trim() + '\n' : '') + d.message.trim());
  }
  textLines.push('', L.closing, '', L.signoff, L.team, '', L.tagline, 'https://hellosellora.com');

  return { subject: K.subject, html: html, text: textLines.join('\n') };
}

// ===== TEMPLATE END =====

/** Run once: creates the Gmail label and the 5-minute trigger. Safe to run again. */
function setup() {
  getOrCreateLabel_(CONFIG.label);
  ScriptApp.getProjectTriggers()
    .filter(function (t) { return t.getHandlerFunction() === 'processNewSubmissions'; })
    .forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('processNewSubmissions').timeBased().everyMinutes(5).create();
  Logger.log('Ready. New website submissions will get an automatic reply within about 5 minutes.');
  Logger.log(canSendFrom_(CONFIG.replyFrom)
    ? 'Replies will be sent from ' + CONFIG.replyFrom + '.'
    : 'Replies will be sent from your own address as "' + CONFIG.fromName + '" (add ' + CONFIG.replyFrom + ' under Gmail > Settings > Accounts > Send mail as to send from it).');
}

/** Runs every 5 minutes: replies to each new website submission once. */
function processNewSubmissions() {
  const label = getOrCreateLabel_(CONFIG.label);
  const query = CONFIG.searchQuery + ' -label:"' + CONFIG.label + '"';
  const threads = GmailApp.search(query, 0, CONFIG.maxPerRun);

  threads.forEach(function (thread) {
    const message = thread.getMessages()[0];
    const body = message.getPlainBody();
    const fromForm = /web3forms/i.test(message.getFrom()) || /Page language/i.test(body);
    if (!fromForm) { thread.addLabel(label); return; }

    const fields = parseFields_(body);
    const visitor = extractEmail_(message.getReplyTo()) || extractEmail_(fields['Email']);
    if (!visitor || /@hellosellora\.com$/i.test(visitor)) { thread.addLabel(label); return; }

    const kind = /^New audit request/i.test(message.getSubject()) ? 'audit' : 'contact';
    const langRaw = (fields['Page language'] || '').trim().toLowerCase().slice(0, 2);
    const lang = TEXT[langRaw] ? langRaw : CONFIG.defaultLanguage;
    const reply = buildReply(kind, lang, {
      firstName: fields['First name'],
      company: fields['Company'],
      subject: fields['Subject'],
      message: fields['Message'],
    }, CONFIG.assetsUrl);

    GmailApp.sendEmail(visitor, reply.subject, reply.text, sendOptions_(reply.html));
    thread.addLabel(label);
  });
}

/** Sends all eight versions (2 forms x 4 languages) to you, to check how they look. */
function sendTestEmails() {
  const me = Session.getActiveUser().getEmail();
  ['fr', 'en', 'sv', 'es'].forEach(function (lang) {
    ['audit', 'contact'].forEach(function (kind) {
      const reply = buildReply(kind, lang, {
        firstName: 'Camille',
        company: 'Maison Lumière',
        subject: kind === 'contact' ? 'Question about your services' : '',
        message: kind === 'contact' ? 'Hello, we sell candles in France and would like to start on Amazon.de. Could we talk next week?' : '',
      }, CONFIG.assetsUrl);
      GmailApp.sendEmail(me, '[TEST ' + lang.toUpperCase() + '] ' + reply.subject, reply.text, sendOptions_(reply.html));
    });
  });
  Logger.log('Sent 8 test emails to ' + me + '.');
}

function sendOptions_(html) {
  const options = { htmlBody: html, name: CONFIG.fromName, replyTo: CONFIG.replyFrom };
  if (canSendFrom_(CONFIG.replyFrom)) options.from = CONFIG.replyFrom;
  return options;
}

function canSendFrom_(address) {
  return GmailApp.getAliases().some(function (a) { return a.toLowerCase() === address.toLowerCase(); });
}

function getOrCreateLabel_(name) {
  return GmailApp.getUserLabelByName(name) || GmailApp.createLabel(name);
}

function extractEmail_(value) {
  const match = String(value || '').match(/[^\s<>"'@]+@[^\s<>"'@]+\.[a-z]{2,}/i);
  return match ? match[0] : '';
}

/**
 * Reads the field values out of the Web3Forms email. Handles both "Label: value" lines and
 * a label on its own line followed by the value, and keeps multi-line messages together.
 */
function parseFields_(body) {
  const labels = ['Form', 'Page language', 'Company', 'Website', 'First name', 'Last name', 'Email', 'Subject', 'Message'];
  const fields = {};
  let current = null;
  String(body || '').split(/\r?\n/).forEach(function (rawLine) {
    const line = rawLine.replace(/\*/g, '').trim();
    const hit = labels.find(function (l) {
      return line.toLowerCase() === l.toLowerCase() || line.toLowerCase() === (l + ':').toLowerCase() ||
        line.toLowerCase().indexOf(l.toLowerCase() + ':') === 0;
    });
    if (hit) {
      current = hit;
      const rest = line.slice(hit.length).replace(/^\s*:\s*/, '');
      fields[hit] = rest;
      return;
    }
    if (current && line) fields[current] = fields[current] ? fields[current] + '\n' + line : line;
  });
  Object.keys(fields).forEach(function (k) { fields[k] = fields[k].trim(); });
  return fields;
}
