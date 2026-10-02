import type { Metadata } from 'next';
import SobreMiClient from './SobreMiClient';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elemike.vercel.app';
const siteUrl = rawSiteUrl.replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'Sobre Mí | Michael Cruz',
  description:
    'Desarrollador full-stack en Bogotá que combina arquitectura de software sólida con automatización estratégica.',
  alternates: {
    canonical: `${siteUrl}/sobre-mi`,
  },
  openGraph: {
    title: 'Sobre Mí | Michael Cruz',
    description:
      'Desarrollador full-stack en Bogotá que combina arquitectura de software sólida con automatización estratégica.',
    url: `${siteUrl}/sobre-mi`,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Michael Cruz - Sobre Mí',
      },
    ],
  },
};

export default function SobreMiPage() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Person',
      name: 'Michael Cruz',
      jobTitle: 'Full Stack Developer',
      url: siteUrl,
      sameAs: [
        'https://www.linkedin.com/in/michaelsct/',
        'https://github.com/elemike',
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <SobreMiClient />
    </>
  );
}