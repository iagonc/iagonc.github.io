import type { Metadata } from 'next';
import './globals.css';
import './arcade.css';
import './profile.css';
import './experience-explorer.css';
import './documents.css';
import {
  linkedInUrl,
  publicSiteUrl,
  siteTitle,
  siteDescription,
} from './site-config';
export const metadata: Metadata = {
  title: siteTitle,
  icons: { icon: '/favicon.svg' },
  description: siteDescription,
  authors: [{ name: 'Iago Neves Caldeira', url: linkedInUrl }],
  creator: 'Iago Neves Caldeira',
  verification: { google: 'EgFnXXafNoxjf7nwRHFu5ZxBhhMbL27qLsZeUfywPlk' },
  robots: { index: true, follow: true },
  ...(publicSiteUrl
    ? {
        metadataBase: new URL(publicSiteUrl),
        alternates: { canonical: publicSiteUrl },
      }
    : {}),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: 'Iago Caldeira',
    locale: 'en_US',
    type: 'profile',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Iago Caldeira — Serious systems. Playful thinking. A retro handheld portfolio for SRE, platform and AI engineering in LATAM.',
      },
    ],
    ...(publicSiteUrl ? { url: publicSiteUrl } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-image.png'],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
