// Legal pages, English version (the French version prevails).
// Links in text: [text](address). Publisher details come from `legal` in src/content/site.js.

export default function legalEn(L, site) {
  const contact = `[${site.email}](mailto:${site.email}) or the [contact form](form:contact)`;
  return {
    ui: {
      back: 'Back to the site',
      menu: 'Legal pages',
      label: 'Legal',
      lastUpdated: 'Last updated',
      openSettings: 'Open Cookie Settings',
      languageNote: 'This is a translation. If it differs from the French version, the French version prevails.',
    },
    notice: {
      nav: 'Legal notice',
      title: { before: 'Legal', em: 'notice', after: '' },
      intro: 'Information about the publisher and host of hellosellora.com, as required by French law no. 2004-575 of 21 June 2004 on confidence in the digital economy (LCEN).',
      sections: [
        {
          heading: 'Publisher',
          paragraphs: [`Hello Sellora is currently run by ${L.publisher}, sole trader (entrepreneur individuel, EI).`],
          list: [
            `SIREN: ${L.siren}`,
            `APE code: ${L.ape}`,
            `Registered in the French National Business Register (RNE) on ${L.rneDateText}`,
            L.address ? `Address: ${L.address}` : `Location: ${L.city}`,
            ...(L.phone ? [`Phone: ${L.phone}`] : []),
            `Contact: ${contact}`,
          ],
        },
        { heading: 'Publication director', paragraphs: [L.director] },
        {
          heading: 'Hosting',
          paragraphs: [`The site is hosted by ${L.host.name}, ${L.host.address}. Phone: ${L.host.phone}.`],
        },
        {
          heading: 'Intellectual property',
          paragraphs: [
            `The Hello Sellora name, logo, seal, illustrations, texts, layout and code of this site are the exclusive property of ${L.publisher} and are protected by intellectual property law. Any copy or reuse, in whole or in part, without prior written permission is prohibited.`,
            'Amazon and its service names (Seller Central, Brand Registry, FBA, Sponsored Products, A+, Vine) are trademarks of Amazon.com, Inc. or its affiliates. Hello Sellora is an independent agency, not affiliated with Amazon.',
          ],
        },
        {
          heading: 'Liability',
          paragraphs: [
            'The information on this site is provided for guidance and may change. Despite our care, it may contain errors or be incomplete. Links to other sites are given for information; we are not responsible for their content.',
          ],
        },
        {
          heading: 'Personal data and cookies',
          paragraphs: ['How we handle your data is set out in our [privacy policy](/confidentialite/), and our use of cookies in our [cookie policy](/cookies/).'],
        },
      ],
    },
    privacy: {
      nav: 'Privacy policy',
      title: { before: 'Privacy', em: 'policy', after: '' },
      intro: 'This page explains which personal data we collect on hellosellora.com, why, how long we keep it and how to exercise your rights, in line with the General Data Protection Regulation (GDPR).',
      sections: [
        {
          heading: 'Data controller',
          paragraphs: [`${L.publisher}, sole trader (SIREN ${L.siren}), who runs Hello Sellora. For any question about your data: ${contact}.`],
        },
        {
          heading: 'The data we collect',
          list: [
            'Audit request form: company name, website, first name, last name, email address and, if you wish, a message.',
            'Contact form: first name, last name, email address, subject and message.',
            'The emails you send us and our exchanges afterwards.',
            'If you accept cookies: audience data (pages viewed, device type, approximate country, where the visit came from) and ad tracking data.',
            'Technical data (such as your IP address) recorded by our host to run and secure the site.',
          ],
          note: 'We do not collect any sensitive data and we never sell your data.',
        },
        {
          heading: 'Why, and on what basis',
          list: [
            'Answering your request and preparing a proposal: steps taken at your request before a contract.',
            'Carrying out the audit or agreed services: performance of the contract.',
            'Measuring visits and the results of our ads: your consent, which you can withdraw at any time.',
            'Running and securing the site: our legitimate interest.',
            'Meeting our accounting and tax obligations: legal obligation.',
          ],
        },
        {
          heading: 'Who receives your data',
          paragraphs: ['Your data is read only by the Hello Sellora team. We use the following providers, who process it on our behalf:'],
          list: [
            'Web3Forms: delivers the site forms to our inbox.',
            'Google Workspace (Google Ireland Limited): email.',
            'Google Analytics and Google Ads (Google Ireland Limited): audience measurement and ad tracking, only if you accept cookies.',
            'GitHub, Inc.: website hosting.',
          ],
        },
        {
          heading: 'Transfers outside the European Union',
          paragraphs: [
            'Some of these providers may process data in the United States. These transfers are covered by the safeguards set out in the GDPR, such as the EU-US Data Privacy Framework or the European Commission’s standard contractual clauses.',
          ],
        },
        {
          heading: 'How long we keep it',
          list: [
            'Requests that go no further: 3 years after our last exchange.',
            'Clients: for the whole relationship, then 5 years.',
            'Accounting records: 10 years, as required by law.',
            'Audience data: 14 months at most in Google Analytics.',
            'Cookies: 13 months at most; your cookie choice is kept for 6 months.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            `At any time you can access your data, have it corrected or deleted, restrict or object to its processing, ask for it to be transferred, withdraw your consent and set instructions for what happens to it after your death. Write to us at ${contact}. We reply within one month.`,
            'If you believe your rights are not respected, you can file a complaint with the CNIL, the French data protection authority ([www.cnil.fr](https://www.cnil.fr)), or with the authority in your country.',
          ],
        },
        {
          heading: 'Security',
          paragraphs: ['The site is served over HTTPS only and access to our tools is protected. We only collect what we need to answer you.'],
        },
        {
          heading: 'Changes',
          paragraphs: ['We may update this policy, for example when Hello Sellora is registered as its own business. The date of the last update is shown at the top of the page.'],
        },
      ],
    },
    cookies: {
      nav: 'Cookie policy',
      title: { before: 'Cookie', em: 'policy', after: '' },
      intro: 'This page explains which cookies and similar technologies hellosellora.com uses, why, and how you can change your choice at any time.',
      sections: [
        {
          heading: 'What we use',
          table: {
            head: ['Name', 'Provider', 'Purpose', 'Duration'],
            rows: [
              ['sellora-consent, sellora-consent-at', 'Hello Sellora', 'Remembers your cookie choice. Always stored, no consent needed.', '6 months'],
              ['sellora-lang', 'Hello Sellora', 'Remembers the language you chose. Always stored.', 'Until cleared'],
              ['_ga, _ga_5NCZPXGX3Q', 'Google Analytics', 'Counts visits and how the site is used. Only if you accept.', '13 months'],
              ['_gcl_au', 'Google Ads', 'Measures whether our ads lead to a request. Only if you accept.', '3 months'],
            ],
          },
          paragraphs: ['sellora-consent, sellora-consent-at and sellora-lang are stored in your browser (local storage) and never leave your device.'],
        },
        {
          heading: 'Changing your choice',
          paragraphs: [
            'You can accept or refuse at any time, from the “Cookies” link at the bottom of every page or the button below. If you refuse, the Google cookies are deleted and nothing is sent to Google. Refusing does not change how the site works.',
          ],
          action: 'cookieSettings',
        },
        {
          heading: 'Questions',
          paragraphs: [`Write to us at ${contact}. To learn more about your rights, see our [privacy policy](/confidentialite/) or the CNIL website ([www.cnil.fr](https://www.cnil.fr)).`],
        },
      ],
    },
    terms: {
      nav: 'Terms of use',
      title: { before: 'Terms of', em: 'use', after: '' },
      intro: 'These terms govern the use of hellosellora.com. By browsing the site, you accept them.',
      sections: [
        { heading: 'Publisher', paragraphs: ['The site is published as set out in our [legal notice](/mentions-legales/).'] },
        {
          heading: 'Access to the site',
          paragraphs: ['The site is free to use. We may change, suspend or stop it at any time, for example for maintenance, without this giving rise to any compensation.'],
        },
        {
          heading: 'Our services',
          paragraphs: [
            'The site describes Hello Sellora’s services for information. It is not a binding offer. Every audit or service is covered by a written proposal setting out the scope, timeline, price and applicable terms. Work starts once you have agreed to that proposal in writing, and the proposal takes precedence over the information on the site.',
            'Our services are intended for businesses.',
          ],
        },
        {
          heading: 'Forms',
          paragraphs: ['You agree to provide accurate information. Sending a form does not commit you to anything, nor does it commit us to provide a service.'],
        },
        {
          heading: 'Intellectual property',
          paragraphs: ['The site content (texts, logo, brand, illustrations, layout) is protected. You may view it for your own use; any other use requires our prior written permission.'],
        },
        {
          heading: 'Liability',
          paragraphs: [
            'We do our best to keep the information on the site accurate and up to date, but cannot guarantee it. We cannot be held liable for any damage resulting from the use of the site or from being unable to access it. The results shown are examples and do not guarantee any result for your brand.',
          ],
        },
        { heading: 'Links to other sites', paragraphs: ['Links to other sites are given for information. We have no control over their content.'] },
        { heading: 'Personal data and cookies', paragraphs: ['See our [privacy policy](/confidentialite/) and our [cookie policy](/cookies/).'] },
        { heading: 'Changes', paragraphs: ['We may change these terms. The version that applies is the one published on the site at the time of your visit.'] },
        {
          heading: 'Governing law',
          paragraphs: [
            'These terms are governed by French law. In case of disagreement, we will first look for an amicable solution. Failing that, and subject to mandatory rules, the courts of Paris have jurisdiction.',
          ],
        },
        { heading: 'Contact', paragraphs: [`For any question: ${contact}.`] },
      ],
    },
  };
}
