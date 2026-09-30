import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import Navbar from '@/components/NavBar';
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

export const metadata: Metadata = {
  title: 'Michael Cruz | Full Stack Developer',
  description: 'Portafolio profesional de Michael Cruz',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body className="bg-[#FFF8EB] font-sans text-[#0A1128] antialiased">
        {/* NAVBAR GLOBAL */}
        <Navbar />

        {/* CONTENIDO PRINCIPAL */}
        <main>{children}</main>
      </body>
    </html>
  );
}