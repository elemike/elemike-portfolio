// src/app/page.tsx
import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Michael Cruz | Full Stack Developer',
  description:
    'Portafolio profesional de Michael Cruz. Desarrollo web full stack, arquitectura de software e integración de soluciones digitales.',
  openGraph: {
    title: 'Michael Cruz | Full Stack Developer',
    description:
      'Portafolio profesional de Michael Cruz. Desarrollo web full stack, arquitectura de software e integración de soluciones digitales.',
    url: 'https://michaelcruz.dev',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Michael Cruz Portfolio Preview',
      },
    ],
  },
};

export default function Home() {
  return <HomeClient />;
}