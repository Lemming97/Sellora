// Pages légales, version française (version de référence).
// Liens dans le texte : [texte](adresse). Les informations sur l'éditeur
// viennent de `legal` dans src/content/site.js.

export default function legalFr(L, site) {
  const contact = `[${site.email}](mailto:${site.email}) ou le [formulaire de contact](/#contact)`;
  return {
    ui: {
      back: 'Retour au site',
      menu: 'Pages légales',
      label: 'Informations légales',
      lastUpdated: 'Dernière mise à jour',
      openSettings: 'Ouvrir la gestion des cookies',
      languageNote: '',
    },
    notice: {
      nav: 'Mentions légales',
      title: { before: 'Mentions', em: 'légales', after: '' },
      intro: 'Informations sur l’éditeur et l’hébergeur du site hellosellora.com, conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN).',
      sections: [
        {
          heading: 'Éditeur du site',
          paragraphs: [
            `Hello Sellora est actuellement exploité par ${L.publisher}, entrepreneur individuel (EI).`,
          ],
          list: [
            `SIREN : ${L.siren}`,
            `Code APE : ${L.ape}`,
            `Immatriculation au Registre national des entreprises (RNE) le ${L.rneDateText}`,
            L.address ? `Adresse : ${L.address}` : `Localisation : ${L.city}`,
            ...(L.phone ? [`Téléphone : ${L.phone}`] : []),
            `Contact : ${contact}`,
          ],
        },
        {
          heading: 'Directrice de la publication',
          paragraphs: [L.director],
        },
        {
          heading: 'Hébergement',
          paragraphs: [`Le site est hébergé par ${L.host.name}, ${L.host.address}. Téléphone : ${L.host.phone}.`],
        },
        {
          heading: 'Propriété intellectuelle',
          paragraphs: [
            'Les textes, le logo, la marque Hello Sellora, les illustrations et la mise en page du site sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou réutilisation, totale ou partielle, sans autorisation écrite préalable est interdite.',
          ],
        },
        {
          heading: 'Responsabilité',
          paragraphs: [
            'Les informations publiées sur ce site sont fournies à titre indicatif et peuvent évoluer. Malgré le soin apporté à leur rédaction, elles peuvent contenir des erreurs ou être incomplètes. Les liens vers d’autres sites sont proposés pour information ; nous ne sommes pas responsables de leur contenu.',
          ],
        },
        {
          heading: 'Données personnelles et cookies',
          paragraphs: [
            'Le traitement de vos données est décrit dans notre [politique de confidentialité](/confidentialite/), et l’utilisation des cookies dans notre [politique cookies](/cookies/).',
          ],
        },
      ],
    },
    privacy: {
      nav: 'Politique de confidentialité',
      title: { before: 'Politique de', em: 'confidentialité', after: '' },
      intro: 'Cette page explique quelles données personnelles nous collectons sur hellosellora.com, pourquoi, combien de temps nous les gardons et comment exercer vos droits, conformément au Règlement général sur la protection des données (RGPD).',
      sections: [
        {
          heading: 'Responsable du traitement',
          paragraphs: [
            `${L.publisher}, entrepreneur individuel (SIREN ${L.siren}), qui exploite Hello Sellora. Pour toute question sur vos données : ${contact}.`,
          ],
        },
        {
          heading: 'Les données que nous collectons',
          list: [
            'Formulaire de demande d’audit : nom de l’entreprise, site web, prénom, nom, adresse e-mail et, si vous le souhaitez, un message.',
            'Formulaire de contact : prénom, nom, adresse e-mail, objet et message.',
            'Les e-mails que vous nous envoyez et nos échanges ensuite.',
            'Si vous acceptez les cookies : des données de mesure d’audience (pages consultées, type d’appareil, pays approximatif, provenance de la visite) et de suivi de nos annonces.',
            'Des données techniques (comme l’adresse IP) enregistrées par notre hébergeur pour faire fonctionner et sécuriser le site.',
          ],
          note: 'Nous ne collectons aucune donnée sensible et nous ne vendons jamais vos données.',
        },
        {
          heading: 'Pourquoi et sur quelle base',
          list: [
            'Répondre à votre demande et préparer une proposition : mesures précontractuelles prises à votre demande.',
            'Réaliser l’audit ou les prestations convenues : exécution du contrat.',
            'Mesurer la fréquentation du site et l’efficacité de nos annonces : votre consentement, que vous pouvez retirer à tout moment.',
            'Faire fonctionner et sécuriser le site : notre intérêt légitime.',
            'Respecter nos obligations comptables et fiscales : obligation légale.',
          ],
        },
        {
          heading: 'Qui reçoit vos données',
          paragraphs: [
            'Vos données sont lues uniquement par l’équipe Hello Sellora. Nous faisons appel aux prestataires suivants, qui les traitent pour notre compte :',
          ],
          list: [
            'Web3Forms : transmission des formulaires du site vers notre messagerie.',
            'Google Workspace (Google Ireland Limited) : messagerie électronique.',
            'Google Analytics et Google Ads (Google Ireland Limited) : mesure d’audience et suivi des annonces, uniquement si vous acceptez les cookies.',
            'GitHub, Inc. : hébergement du site.',
          ],
        },
        {
          heading: 'Transferts hors de l’Union européenne',
          paragraphs: [
            'Certains de ces prestataires peuvent traiter des données aux États-Unis. Ces transferts sont encadrés par les garanties prévues par le RGPD, comme le cadre de protection des données UE-États-Unis (Data Privacy Framework) ou les clauses contractuelles types de la Commission européenne.',
          ],
        },
        {
          heading: 'Combien de temps',
          list: [
            'Demandes sans suite : 3 ans après notre dernier échange.',
            'Clients : pendant toute la relation, puis 5 ans.',
            'Pièces comptables : 10 ans, comme l’exige la loi.',
            'Mesure d’audience : 14 mois au maximum dans Google Analytics.',
            'Cookies : 13 mois au maximum ; votre choix sur les cookies est conservé 6 mois.',
          ],
        },
        {
          heading: 'Vos droits',
          paragraphs: [
            `Vous pouvez à tout moment accéder à vos données, les faire rectifier ou effacer, en limiter le traitement, vous y opposer, demander leur portabilité, retirer votre consentement et définir des directives sur leur sort après votre décès. Écrivez-nous à ${contact}. Nous répondons dans un délai d’un mois.`,
            'Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL ([www.cnil.fr](https://www.cnil.fr)).',
          ],
        },
        {
          heading: 'Sécurité',
          paragraphs: [
            'Le site est servi uniquement en HTTPS et l’accès à nos outils est protégé. Nous limitons les données collectées à ce qui est utile pour vous répondre.',
          ],
        },
        {
          heading: 'Modifications',
          paragraphs: [
            'Nous pouvons mettre à jour cette politique, par exemple lors de l’immatriculation de Hello Sellora. La date de dernière mise à jour figure en haut de la page.',
          ],
        },
      ],
    },
    cookies: {
      nav: 'Politique cookies',
      title: { before: 'Politique', em: 'cookies', after: '' },
      intro: 'Cette page explique quels cookies et technologies similaires hellosellora.com utilise, pourquoi, et comment modifier votre choix à tout moment.',
      sections: [
        {
          heading: 'Ce que nous utilisons',
          table: {
            head: ['Nom', 'Fournisseur', 'Finalité', 'Durée'],
            rows: [
              ['sellora-consent, sellora-consent-at', 'Hello Sellora', 'Mémorise votre choix sur les cookies. Toujours enregistré, sans consentement.', '6 mois'],
              ['sellora-lang', 'Hello Sellora', 'Mémorise la langue choisie. Toujours enregistré.', 'Jusqu’à effacement'],
              ['_ga, _ga_5NCZPXGX3Q', 'Google Analytics', 'Compte les visites et l’utilisation du site. Seulement si vous acceptez.', '13 mois'],
              ['_gcl_au', 'Google Ads', 'Mesure si nos annonces mènent à une demande. Seulement si vous acceptez.', '3 mois'],
            ],
          },
          paragraphs: [
            'sellora-consent, sellora-consent-at et sellora-lang sont enregistrés dans votre navigateur (stockage local) et ne quittent jamais votre appareil.',
          ],
        },
        {
          heading: 'Modifier votre choix',
          paragraphs: [
            'Vous pouvez accepter ou refuser à tout moment, depuis le lien « Cookies » en bas de chaque page ou le bouton ci-dessous. Si vous refusez, les cookies Google sont supprimés et rien n’est envoyé à Google. Refuser ne change rien au fonctionnement du site.',
          ],
          action: 'cookieSettings',
        },
        {
          heading: 'Questions',
          paragraphs: [
            `Écrivez-nous à ${contact}. Pour en savoir plus sur vos droits, consultez notre [politique de confidentialité](/confidentialite/) ou le site de la CNIL ([www.cnil.fr](https://www.cnil.fr)).`,
          ],
        },
      ],
    },
    terms: {
      nav: 'Conditions d’utilisation',
      title: { before: 'Conditions', em: 'd’utilisation', after: '' },
      intro: 'Ces conditions encadrent l’utilisation du site hellosellora.com. En naviguant sur le site, vous les acceptez.',
      sections: [
        {
          heading: 'Éditeur',
          paragraphs: ['Le site est édité dans les conditions décrites dans nos [mentions légales](/mentions-legales/).'],
        },
        {
          heading: 'Accès au site',
          paragraphs: [
            'Le site est accessible gratuitement. Nous pouvons le modifier, le suspendre ou l’interrompre à tout moment, notamment pour maintenance, sans que cela n’ouvre droit à une indemnité.',
          ],
        },
        {
          heading: 'Nos services',
          paragraphs: [
            'Le site présente les services de Hello Sellora à titre d’information. Il ne constitue pas une offre ferme. Chaque audit ou prestation fait l’objet d’une proposition écrite qui précise le périmètre, le délai, le prix et les conditions applicables. La prestation commence après votre accord écrit sur cette proposition, qui prévaut sur les informations du site.',
            'Nos services s’adressent aux professionnels.',
          ],
        },
        {
          heading: 'Formulaires',
          paragraphs: [
            'Vous vous engagez à fournir des informations exactes. L’envoi d’un formulaire ne vous engage à rien et ne nous engage pas à réaliser une prestation.',
          ],
        },
        {
          heading: 'Propriété intellectuelle',
          paragraphs: [
            'Le contenu du site (textes, logo, marque, illustrations, mise en page) est protégé. Vous pouvez le consulter pour votre usage personnel ; toute autre utilisation nécessite notre accord écrit préalable.',
          ],
        },
        {
          heading: 'Responsabilité',
          paragraphs: [
            'Nous faisons de notre mieux pour que les informations du site soient exactes et à jour, sans pouvoir le garantir. Nous ne pouvons être tenus responsables d’un dommage résultant de l’utilisation du site ou de l’impossibilité d’y accéder. Les résultats présentés sont des exemples et ne garantissent pas de résultat pour votre marque.',
          ],
        },
        {
          heading: 'Liens vers d’autres sites',
          paragraphs: ['Les liens vers d’autres sites sont proposés pour information. Nous n’avons aucun contrôle sur leur contenu.'],
        },
        {
          heading: 'Données personnelles et cookies',
          paragraphs: ['Voir notre [politique de confidentialité](/confidentialite/) et notre [politique cookies](/cookies/).'],
        },
        {
          heading: 'Modifications',
          paragraphs: ['Nous pouvons modifier ces conditions. La version applicable est celle publiée sur le site au moment de votre visite.'],
        },
        {
          heading: 'Droit applicable',
          paragraphs: [
            'Ces conditions sont soumises au droit français. En cas de désaccord, nous chercherons d’abord une solution amiable. À défaut, et sous réserve des règles impératives, les tribunaux de Paris sont compétents.',
            'Ces pages existent en plusieurs langues. En cas de différence, la version française prévaut.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [`Pour toute question : ${contact}.`],
        },
      ],
    },
  };
}
