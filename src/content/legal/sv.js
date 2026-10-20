// Juridiska sidor, svensk version (den franska versionen gäller före).
// Länkar i texten: [text](adress). Uppgifter om utgivaren finns i `legal` i src/content/site.js.

export default function legalSv(L, site) {
  const contact = `[${site.email}](mailto:${site.email}) eller [kontaktformuläret](form:contact)`;
  return {
    ui: {
      back: 'Tillbaka till webbplatsen',
      menu: 'Juridiska sidor',
      label: 'Juridiskt',
      lastUpdated: 'Senast uppdaterad',
      openSettings: 'Öppna cookieinställningar',
      languageNote: 'Detta är en översättning. Om den skiljer sig från den franska versionen gäller den franska.',
    },
    notice: {
      nav: 'Juridisk information',
      title: { before: 'Juridisk', em: 'information', after: '' },
      intro: 'Uppgifter om utgivare och webbhotell för hellosellora.com, enligt fransk lag nr 2004-575 av den 21 juni 2004 om förtroende för den digitala ekonomin (LCEN).',
      sections: [
        {
          heading: 'Utgivare',
          paragraphs: [`Hello Sellora drivs för närvarande av ${L.publisher}, enskild näringsidkare (entrepreneur individuel, EI).`],
          list: [
            `SIREN: ${L.siren}`,
            `APE-kod: ${L.ape}`,
            `Registrerad i det franska nationella företagsregistret (RNE) den ${L.rneDateText}`,
            L.address ? `Adress: ${L.address}` : `Ort: ${L.city}`,
            ...(L.phone ? [`Telefon: ${L.phone}`] : []),
            `Kontakt: ${contact}`,
          ],
        },
        { heading: 'Ansvarig utgivare', paragraphs: [L.director] },
        {
          heading: 'Webbhotell',
          paragraphs: [`Webbplatsen drivs av ${L.host.name}, ${L.host.address}. Telefon: ${L.host.phone}.`],
        },
        {
          heading: 'Immateriella rättigheter',
          paragraphs: [
            `Namnet Hello Sellora, logotypen, sigillet, illustrationer, texter, layout och kod på webbplatsen tillhör uteslutande ${L.publisher} och skyddas av immaterialrätten. All kopiering eller återanvändning, helt eller delvis, utan skriftligt tillstånd i förväg är förbjuden.`,
            'Amazon och namnen på dess tjänster (Seller Central, Brand Registry, FBA, Sponsored Products, A+, Vine) är varumärken som tillhör Amazon.com, Inc. eller dess dotterbolag. Hello Sellora är en oberoende byrå utan koppling till Amazon.',
          ],
        },
        {
          heading: 'Ansvar',
          paragraphs: [
            'Informationen på webbplatsen är vägledande och kan ändras. Trots vår omsorg kan den innehålla fel eller vara ofullständig. Länkar till andra webbplatser finns som information; vi ansvarar inte för deras innehåll.',
          ],
        },
        {
          heading: 'Personuppgifter och cookies',
          paragraphs: ['Hur vi hanterar dina uppgifter beskrivs i vår [integritetspolicy](/confidentialite/) och hur vi använder cookies i vår [cookiepolicy](/cookies/).'],
        },
      ],
    },
    privacy: {
      nav: 'Integritetspolicy',
      title: { before: '', em: 'Integritetspolicy', after: '' },
      intro: 'Här förklarar vi vilka personuppgifter vi samlar in på hellosellora.com, varför, hur länge vi sparar dem och hur du utövar dina rättigheter, enligt dataskyddsförordningen (GDPR).',
      sections: [
        {
          heading: 'Personuppgiftsansvarig',
          paragraphs: [`${L.publisher}, enskild näringsidkare (SIREN ${L.siren}), som driver Hello Sellora. Frågor om dina uppgifter: ${contact}.`],
        },
        {
          heading: 'Uppgifter vi samlar in',
          list: [
            'Formuläret för analys: företagsnamn, webbplats, förnamn, efternamn, e-postadress och, om du vill, ett meddelande.',
            'Kontaktformuläret: förnamn, efternamn, e-postadress, ämne och meddelande.',
            'E-post du skickar till oss och vår fortsatta kontakt.',
            'Om du godkänner cookies: besöksstatistik (visade sidor, typ av enhet, ungefärligt land, varifrån besöket kom) och uppföljning av våra annonser.',
            'Tekniska uppgifter (som IP-adress) som vårt webbhotell registrerar för att driva och skydda webbplatsen.',
          ],
          note: 'Vi samlar inte in några känsliga uppgifter och vi säljer aldrig dina uppgifter.',
        },
        {
          heading: 'Varför, och med vilken rättslig grund',
          list: [
            'Svara på din förfrågan och ta fram ett förslag: åtgärder på din begäran innan avtal ingås.',
            'Genomföra analysen eller de tjänster vi kommit överens om: fullgörande av avtal.',
            'Mäta besök och resultatet av våra annonser: ditt samtycke, som du kan återkalla när som helst.',
            'Driva och skydda webbplatsen: vårt berättigade intresse.',
            'Uppfylla våra bokförings- och skattekrav: rättslig förpliktelse.',
          ],
        },
        {
          heading: 'Vem som får dina uppgifter',
          paragraphs: ['Dina uppgifter läses bara av teamet på Hello Sellora. Vi anlitar följande leverantörer, som behandlar dem för vår räkning:'],
          list: [
            'Web3Forms: skickar formulären på webbplatsen till vår inkorg.',
            'Google Workspace (Google Ireland Limited): e-post.',
            'Google Analytics och Google Ads (Google Ireland Limited): besöksstatistik och annonsuppföljning, bara om du godkänner cookies.',
            'GitHub, Inc.: webbhotell.',
          ],
        },
        {
          heading: 'Överföring utanför EU',
          paragraphs: [
            'Vissa av leverantörerna kan behandla uppgifter i USA. Överföringarna omfattas av de skyddsåtgärder som GDPR föreskriver, som ramverket för dataskydd mellan EU och USA (Data Privacy Framework) eller EU-kommissionens standardavtalsklausuler.',
          ],
        },
        {
          heading: 'Hur länge vi sparar uppgifterna',
          list: [
            'Förfrågningar som inte leder vidare: 3 år efter vår senaste kontakt.',
            'Kunder: under hela samarbetet och därefter 5 år.',
            'Bokföringsunderlag: 10 år, enligt lag.',
            'Besöksstatistik: högst 14 månader i Google Analytics.',
            'Cookies: högst 13 månader; ditt val om cookies sparas i 6 månader.',
          ],
        },
        {
          heading: 'Dina rättigheter',
          paragraphs: [
            `Du kan när som helst få tillgång till dina uppgifter, få dem rättade eller raderade, begränsa eller invända mot behandlingen, begära att de flyttas, återkalla ditt samtycke och ge anvisningar om vad som ska hända med dem efter din död. Skriv till ${contact}. Vi svarar inom en månad.`,
            'Om du anser att dina rättigheter inte respekteras kan du lämna ett klagomål till CNIL, den franska dataskyddsmyndigheten ([www.cnil.fr](https://www.cnil.fr)), eller till myndigheten i ditt land, i Sverige Integritetsskyddsmyndigheten (IMY).',
          ],
        },
        {
          heading: 'Säkerhet',
          paragraphs: ['Webbplatsen visas endast via HTTPS och åtkomsten till våra verktyg är skyddad. Vi samlar bara in det vi behöver för att kunna svara dig.'],
        },
        {
          heading: 'Ändringar',
          paragraphs: ['Vi kan uppdatera den här policyn, till exempel när Hello Sellora registreras som eget företag. Datum för senaste uppdatering visas högst upp på sidan.'],
        },
      ],
    },
    cookies: {
      nav: 'Cookiepolicy',
      title: { before: '', em: 'Cookiepolicy', after: '' },
      intro: 'Här förklarar vi vilka cookies och liknande tekniker hellosellora.com använder, varför, och hur du när som helst kan ändra ditt val.',
      sections: [
        {
          heading: 'Det här använder vi',
          table: {
            head: ['Namn', 'Leverantör', 'Syfte', 'Varaktighet'],
            rows: [
              ['sellora-consent, sellora-consent-at', 'Hello Sellora', 'Kommer ihåg ditt val om cookies. Sparas alltid, kräver inget samtycke.', '6 månader'],
              ['sellora-lang', 'Hello Sellora', 'Kommer ihåg vilket språk du valt. Sparas alltid.', 'Tills det rensas'],
              ['_ga, _ga_5NCZPXGX3Q', 'Google Analytics', 'Räknar besök och hur webbplatsen används. Bara om du godkänner.', '13 månader'],
              ['_gcl_au', 'Google Ads', 'Mäter om våra annonser leder till en förfrågan. Bara om du godkänner.', '3 månader'],
            ],
          },
          paragraphs: ['sellora-consent, sellora-consent-at och sellora-lang sparas i din webbläsare (lokal lagring) och lämnar aldrig din enhet.'],
        },
        {
          heading: 'Ändra ditt val',
          paragraphs: [
            'Du kan godkänna eller neka när som helst, via länken ”Cookies” längst ned på varje sida eller knappen nedan. Om du nekar raderas Googles cookies och inget skickas till Google. Att neka påverkar inte hur webbplatsen fungerar.',
          ],
          action: 'cookieSettings',
        },
        {
          heading: 'Frågor',
          paragraphs: [`Skriv till ${contact}. Läs mer om dina rättigheter i vår [integritetspolicy](/confidentialite/) eller på CNIL:s webbplats ([www.cnil.fr](https://www.cnil.fr)).`],
        },
      ],
    },
    terms: {
      nav: 'Användarvillkor',
      title: { before: '', em: 'Användarvillkor', after: '' },
      intro: 'Dessa villkor gäller för användningen av hellosellora.com. Genom att använda webbplatsen godkänner du dem.',
      sections: [
        { heading: 'Utgivare', paragraphs: ['Webbplatsen ges ut enligt vår [juridiska information](/mentions-legales/).'] },
        {
          heading: 'Tillgång till webbplatsen',
          paragraphs: ['Webbplatsen är gratis att använda. Vi kan när som helst ändra, tillfälligt stänga eller avsluta den, till exempel för underhåll, utan att det ger rätt till ersättning.'],
        },
        {
          heading: 'Våra tjänster',
          paragraphs: [
            'Webbplatsen beskriver Hello Selloras tjänster i informationssyfte. Den är inget bindande erbjudande. Varje analys eller tjänst omfattas av ett skriftligt förslag med omfattning, tidsplan, pris och villkor. Arbetet börjar när du skriftligen har godkänt förslaget, och förslaget gäller före informationen på webbplatsen.',
            'Våra tjänster riktar sig till företag.',
          ],
        },
        {
          heading: 'Formulär',
          paragraphs: ['Du åtar dig att lämna korrekta uppgifter. Att skicka ett formulär binder varken dig eller oss till en tjänst.'],
        },
        {
          heading: 'Immateriella rättigheter',
          paragraphs: ['Innehållet på webbplatsen (texter, logotyp, varumärke, illustrationer, layout) är skyddat. Du får ta del av det för eget bruk; all annan användning kräver vårt skriftliga tillstånd i förväg.'],
        },
        {
          heading: 'Ansvar',
          paragraphs: [
            'Vi gör vårt bästa för att informationen på webbplatsen ska vara korrekt och aktuell, men kan inte garantera det. Vi ansvarar inte för skador som uppstår genom användning av webbplatsen eller av att den inte är tillgänglig. Resultaten som visas är exempel och är ingen garanti för resultat för ditt varumärke.',
          ],
        },
        { heading: 'Länkar till andra webbplatser', paragraphs: ['Länkar till andra webbplatser finns som information. Vi har ingen kontroll över deras innehåll.'] },
        { heading: 'Personuppgifter och cookies', paragraphs: ['Se vår [integritetspolicy](/confidentialite/) och vår [cookiepolicy](/cookies/).'] },
        { heading: 'Ändringar', paragraphs: ['Vi kan ändra dessa villkor. Den version som gäller är den som är publicerad på webbplatsen när du besöker den.'] },
        {
          heading: 'Tillämplig lag',
          paragraphs: [
            'Villkoren omfattas av fransk lag. Vid oenighet försöker vi först hitta en lösning i godo. Om det inte går, och med förbehåll för tvingande regler, är domstolarna i Paris behöriga.',
          ],
        },
        { heading: 'Kontakt', paragraphs: [`Frågor: ${contact}.`] },
      ],
    },
  };
}
