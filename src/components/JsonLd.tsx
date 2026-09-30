// components/JsonLd.tsx

// Usamos la variable de entorno o fallback a la URL de Vercel
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://elemike.vercel.app';

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Mike',
        jobTitle: 'Software Developer & Web Architect',
        url: SITE_URL,
        // sameAs: [
        //   'https://github.com/elemike',
        //   'https://www.linkedin.com/in/michaelsct/',
        // ],
        knowsAbout: [
          'React',
          'Next.js',
          'TypeScript',
          'ASP.NET Core',
          'Python',
          'Computer Vision',
          'AI Agents',
          'Business Automation',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: 'Mike - Desarrollo de Software y Automatización con IA',
        description:
          'Desarrollo web, arquitectura de software y automatización de negocios con agentes de IA, bots de WhatsApp e integración de sistemas.',
        url: SITE_URL,
        image: `${SITE_URL}/og-image.png`,
        founder: { '@id': `${SITE_URL}/#person` },
        areaServed: { '@type': 'Country', name: 'Colombia' },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Mike | Desarrollador de Software & Arquitecto Web',
        publisher: { '@id': `${SITE_URL}/#person` },
        inLanguage: 'es',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  );
}