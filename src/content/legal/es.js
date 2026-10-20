// Páginas legales, versión en español (prevalece la versión francesa).
// Enlaces en el texto: [texto](dirección). Los datos del editor están en `legal` en src/content/site.js.

export default function legalEs(L, site) {
  const contact = `[${site.email}](mailto:${site.email}) o el [formulario de contacto](/#contact)`;
  return {
    ui: {
      back: 'Volver al sitio',
      menu: 'Páginas legales',
      label: 'Legal',
      lastUpdated: 'Última actualización',
      openSettings: 'Abrir la configuración de cookies',
      languageNote: 'Esta es una traducción. Si difiere de la versión francesa, prevalece la versión francesa.',
    },
    notice: {
      nav: 'Aviso legal',
      title: { before: 'Aviso', em: 'legal', after: '' },
      intro: 'Información sobre el editor y el alojamiento de hellosellora.com, según la ley francesa n.º 2004-575 de 21 de junio de 2004 sobre la confianza en la economía digital (LCEN).',
      sections: [
        {
          heading: 'Editor',
          paragraphs: [`Hello Sellora está gestionado actualmente por ${L.publisher}, empresaria individual (entrepreneur individuel, EI).`],
          list: [
            `SIREN: ${L.siren}`,
            `Código APE: ${L.ape}`,
            `Inscrita en el Registro Nacional de Empresas de Francia (RNE) el ${L.rneDateText}`,
            L.address ? `Dirección: ${L.address}` : `Ubicación: ${L.city}`,
            ...(L.phone ? [`Teléfono: ${L.phone}`] : []),
            `Contacto: ${contact}`,
          ],
        },
        { heading: 'Directora de la publicación', paragraphs: [L.director] },
        {
          heading: 'Alojamiento',
          paragraphs: [`El sitio está alojado por ${L.host.name}, ${L.host.address}. Teléfono: ${L.host.phone}.`],
        },
        {
          heading: 'Propiedad intelectual',
          paragraphs: [
            'Los textos, el logotipo, la marca Hello Sellora, las ilustraciones y el diseño del sitio están protegidos por la propiedad intelectual. Queda prohibida cualquier reproducción o reutilización, total o parcial, sin autorización previa por escrito.',
          ],
        },
        {
          heading: 'Responsabilidad',
          paragraphs: [
            'La información de este sitio es orientativa y puede cambiar. Pese a nuestro cuidado, puede contener errores o estar incompleta. Los enlaces a otros sitios se ofrecen a título informativo; no somos responsables de su contenido.',
          ],
        },
        {
          heading: 'Datos personales y cookies',
          paragraphs: ['El tratamiento de tus datos se explica en nuestra [política de privacidad](/confidentialite/) y el uso de cookies en nuestra [política de cookies](/cookies/).'],
        },
      ],
    },
    privacy: {
      nav: 'Política de privacidad',
      title: { before: 'Política de', em: 'privacidad', after: '' },
      intro: 'Esta página explica qué datos personales recogemos en hellosellora.com, por qué, cuánto tiempo los conservamos y cómo ejercer tus derechos, conforme al Reglamento General de Protección de Datos (RGPD).',
      sections: [
        {
          heading: 'Responsable del tratamiento',
          paragraphs: [`${L.publisher}, empresaria individual (SIREN ${L.siren}), que gestiona Hello Sellora. Para cualquier pregunta sobre tus datos: ${contact}.`],
        },
        {
          heading: 'Los datos que recogemos',
          list: [
            'Formulario de solicitud de auditoría: nombre de la empresa, sitio web, nombre, apellidos, correo electrónico y, si quieres, un mensaje.',
            'Formulario de contacto: nombre, apellidos, correo electrónico, asunto y mensaje.',
            'Los correos que nos envías y nuestros intercambios posteriores.',
            'Si aceptas las cookies: datos de audiencia (páginas vistas, tipo de dispositivo, país aproximado, origen de la visita) y de seguimiento de nuestros anuncios.',
            'Datos técnicos (como la dirección IP) que registra nuestro proveedor de alojamiento para que el sitio funcione y sea seguro.',
          ],
          note: 'No recogemos datos sensibles y nunca vendemos tus datos.',
        },
        {
          heading: 'Para qué y con qué base legal',
          list: [
            'Responder a tu solicitud y preparar una propuesta: medidas precontractuales a petición tuya.',
            'Realizar la auditoría o los servicios acordados: ejecución del contrato.',
            'Medir las visitas y los resultados de nuestros anuncios: tu consentimiento, que puedes retirar en cualquier momento.',
            'Hacer funcionar y proteger el sitio: nuestro interés legítimo.',
            'Cumplir nuestras obligaciones contables y fiscales: obligación legal.',
          ],
        },
        {
          heading: 'Quién recibe tus datos',
          paragraphs: ['Tus datos solo los lee el equipo de Hello Sellora. Trabajamos con los siguientes proveedores, que los tratan por cuenta nuestra:'],
          list: [
            'Web3Forms: envía los formularios del sitio a nuestro correo.',
            'Google Workspace (Google Ireland Limited): correo electrónico.',
            'Google Analytics y Google Ads (Google Ireland Limited): medición de audiencia y seguimiento de anuncios, solo si aceptas las cookies.',
            'GitHub, Inc.: alojamiento del sitio.',
          ],
        },
        {
          heading: 'Transferencias fuera de la Unión Europea',
          paragraphs: [
            'Algunos de estos proveedores pueden tratar datos en Estados Unidos. Estas transferencias están cubiertas por las garantías del RGPD, como el Marco de Privacidad de Datos UE-EE. UU. (Data Privacy Framework) o las cláusulas contractuales tipo de la Comisión Europea.',
          ],
        },
        {
          heading: 'Cuánto tiempo los conservamos',
          list: [
            'Solicitudes que no siguen adelante: 3 años después de nuestro último intercambio.',
            'Clientes: durante toda la relación y 5 años más.',
            'Documentos contables: 10 años, como exige la ley.',
            'Datos de audiencia: 14 meses como máximo en Google Analytics.',
            'Cookies: 13 meses como máximo; tu elección sobre las cookies se guarda 6 meses.',
          ],
        },
        {
          heading: 'Tus derechos',
          paragraphs: [
            `En cualquier momento puedes acceder a tus datos, pedir que se corrijan o eliminen, limitar su tratamiento u oponerte a él, solicitar su portabilidad, retirar tu consentimiento y dar instrucciones sobre su destino tras tu fallecimiento. Escríbenos a ${contact}. Respondemos en el plazo de un mes.`,
            'Si consideras que no se respetan tus derechos, puedes presentar una reclamación ante la CNIL, la autoridad francesa de protección de datos ([www.cnil.fr](https://www.cnil.fr)), o ante la autoridad de tu país, en España la Agencia Española de Protección de Datos (AEPD).',
          ],
        },
        {
          heading: 'Seguridad',
          paragraphs: ['El sitio solo se sirve por HTTPS y el acceso a nuestras herramientas está protegido. Solo recogemos lo necesario para responderte.'],
        },
        {
          heading: 'Cambios',
          paragraphs: ['Podemos actualizar esta política, por ejemplo cuando Hello Sellora se registre como empresa propia. La fecha de la última actualización aparece en la parte superior de la página.'],
        },
      ],
    },
    cookies: {
      nav: 'Política de cookies',
      title: { before: 'Política de', em: 'cookies', after: '' },
      intro: 'Esta página explica qué cookies y tecnologías similares utiliza hellosellora.com, para qué, y cómo cambiar tu elección en cualquier momento.',
      sections: [
        {
          heading: 'Qué utilizamos',
          table: {
            head: ['Nombre', 'Proveedor', 'Finalidad', 'Duración'],
            rows: [
              ['sellora-consent, sellora-consent-at', 'Hello Sellora', 'Recuerda tu elección sobre las cookies. Siempre se guarda, sin consentimiento.', '6 meses'],
              ['sellora-lang', 'Hello Sellora', 'Recuerda el idioma elegido. Siempre se guarda.', 'Hasta que se borre'],
              ['_ga, _ga_5NCZPXGX3Q', 'Google Analytics', 'Cuenta las visitas y cómo se usa el sitio. Solo si aceptas.', '13 meses'],
              ['_gcl_au', 'Google Ads', 'Mide si nuestros anuncios generan una solicitud. Solo si aceptas.', '3 meses'],
            ],
          },
          paragraphs: ['sellora-consent, sellora-consent-at y sellora-lang se guardan en tu navegador (almacenamiento local) y nunca salen de tu dispositivo.'],
        },
        {
          heading: 'Cambiar tu elección',
          paragraphs: [
            'Puedes aceptar o rechazar en cualquier momento, desde el enlace «Cookies» al pie de cada página o con el botón de abajo. Si rechazas, se eliminan las cookies de Google y no se envía nada a Google. Rechazar no cambia el funcionamiento del sitio.',
          ],
          action: 'cookieSettings',
        },
        {
          heading: 'Preguntas',
          paragraphs: [`Escríbenos a ${contact}. Para saber más sobre tus derechos, consulta nuestra [política de privacidad](/confidentialite/) o el sitio de la CNIL ([www.cnil.fr](https://www.cnil.fr)).`],
        },
      ],
    },
    terms: {
      nav: 'Condiciones de uso',
      title: { before: 'Condiciones de', em: 'uso', after: '' },
      intro: 'Estas condiciones regulan el uso de hellosellora.com. Al navegar por el sitio, las aceptas.',
      sections: [
        { heading: 'Editor', paragraphs: ['El sitio se publica en las condiciones descritas en nuestro [aviso legal](/mentions-legales/).'] },
        {
          heading: 'Acceso al sitio',
          paragraphs: ['El acceso al sitio es gratuito. Podemos modificarlo, suspenderlo o interrumpirlo en cualquier momento, por ejemplo por mantenimiento, sin que ello dé derecho a indemnización.'],
        },
        {
          heading: 'Nuestros servicios',
          paragraphs: [
            'El sitio presenta los servicios de Hello Sellora a título informativo. No constituye una oferta vinculante. Cada auditoría o servicio se recoge en una propuesta escrita que detalla el alcance, el plazo, el precio y las condiciones aplicables. El trabajo empieza cuando aceptas esa propuesta por escrito, y la propuesta prevalece sobre la información del sitio.',
            'Nuestros servicios están dirigidos a empresas y profesionales.',
          ],
        },
        {
          heading: 'Formularios',
          paragraphs: ['Te comprometes a facilitar información exacta. Enviar un formulario no te compromete a nada ni nos obliga a prestar un servicio.'],
        },
        {
          heading: 'Propiedad intelectual',
          paragraphs: ['El contenido del sitio (textos, logotipo, marca, ilustraciones, diseño) está protegido. Puedes consultarlo para tu uso personal; cualquier otro uso requiere nuestra autorización previa por escrito.'],
        },
        {
          heading: 'Responsabilidad',
          paragraphs: [
            'Hacemos lo posible para que la información del sitio sea exacta y esté actualizada, pero no podemos garantizarlo. No somos responsables de los daños derivados del uso del sitio o de la imposibilidad de acceder a él. Los resultados mostrados son ejemplos y no garantizan ningún resultado para tu marca.',
          ],
        },
        { heading: 'Enlaces a otros sitios', paragraphs: ['Los enlaces a otros sitios se ofrecen a título informativo. No controlamos su contenido.'] },
        { heading: 'Datos personales y cookies', paragraphs: ['Consulta nuestra [política de privacidad](/confidentialite/) y nuestra [política de cookies](/cookies/).'] },
        { heading: 'Cambios', paragraphs: ['Podemos modificar estas condiciones. Se aplica la versión publicada en el sitio en el momento de tu visita.'] },
        {
          heading: 'Ley aplicable',
          paragraphs: [
            'Estas condiciones se rigen por la ley francesa. En caso de desacuerdo, buscaremos primero una solución amistosa. En su defecto, y sin perjuicio de las normas imperativas, serán competentes los tribunales de París.',
          ],
        },
        { heading: 'Contacto', paragraphs: [`Para cualquier pregunta: ${contact}.`] },
      ],
    },
  };
}
