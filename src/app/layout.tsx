import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import Navbar from '@/components/NavBar';
import JsonLd from '@/components/JsonLd';
import './globals.css';

// Configuración de fuentes Roboto
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

// URL base del sitio sin la barra final al final para construir URLs limpia
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elemike.vercel.app';
const siteUrl = rawSiteUrl.replace(/\/$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Michael Cruz | Full Stack Developer', // Título para la home
    template: '%s | Michael Cruz', // Plantilla donde %s se reemplaza por el título de cada página
  },
  verification: {
    google: process.env.KEY_GOOGLE_SITE_VERIFICATION || process.env.KEY_GOOGLE_SITE_VERIFICATION,
  },
  description:
    'Portafolio profesional de Michael Cruz. Especializado en desarrollo web full stack, arquitectura frontend y backend.',
  keywords: [
    'Michael Cruz',
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Desarrollo Web',
    'Portafolio',
  ],
  icons: {
    icon: `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="12" rx="2" fill="#0A1128" />
        <path d="M7 8L9.5 10L7 12M11.5 12H16.5" stroke="#FFF8EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 18C2 17.4477 2.44772 17 3 17H21C21.5523 17 22 17.4477 22 18V18.5C22 19.3284 21.3284 20 20.5 20H3.5C2.67157 20 2 19.3284 2 18.5V18Z" fill="#FFF8EB" stroke="#0A1128" stroke-width="1.2"/>
      </svg>
    `)}`,
  },
  authors: [{ name: 'Michael Cruz', url: siteUrl }],
  creator: 'Michael Cruz',
  robots: {
    index: true,
    follow: true,
  },
  // Metadatos para compartir en WhatsApp, LinkedIn, Facebook, etc.
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: siteUrl,
    title: 'Michael Cruz | Full Stack Developer',
    description:
      'Portafolio profesional de Michael Cruz. Especializado en desarrollo web full stack, arquitectura frontend y backend.',
    siteName: 'Michael Cruz Portfolio',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Michael Cruz - Full Stack Developer Portfolio',
      },
    ],
  },
  // Metadatos para X / Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Cruz | Full Stack Developer',
    description:
      'Portafolio profesional de Michael Cruz. Especializado en desarrollo web full stack, arquitectura frontend y backend.',
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${roboto.variable} ${robotoMono.variable}`}>
      <head>
        {/* Inyecta los esquemas Schema.org JSON-LD */}
        <JsonLd />
      </head>
      <body className="bg-[#FFF8EB] font-sans text-[#0A1128] antialiased">
        {/* NAVBAR GLOBAL */}
        <Navbar />

        {/* CONTENIDO PRINCIPAL */}
        <main>{children}</main>
      </body>
    </html>
  );
}