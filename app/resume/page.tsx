import type { Metadata } from 'next';
import ResumeContent from '../resume-content';
import PrintResume from '../print-resume';
import { linkedInUrl, publicSiteUrl } from '../site-config';

const title =
  'Iago Caldeira | Full Resume — Senior SRE, Platform & AI Engineer';
const description =
  'Full career history of Iago Neves Caldeira: SRE, observability, DevOps, AWS/GCP and AI infrastructure at Alloy / Kinter, iFood, PicPay and more. Brazil, LATAM.';
const url = new URL('resume', publicSiteUrl).href;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: 'profile',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};

export default function ResumePage() {
  return (
    <main className="document-page resume-page">
      <nav className="document-nav" aria-label="Resume navigation">
        <a href="/">← Iago pocket / Portfolio</a>
        <a href={linkedInUrl} rel="me noopener" target="_blank">
          LinkedIn ↗
        </a>
      </nav>
      <header className="document-header">
        <p className="profile-eyebrow">THE COMPLETE PLAYER FILE / RÉSUMÉ</p>
        <h1>Iago Neves Caldeira</h1>
        <p className="document-subtitle">
          Senior Site Reliability Engineer · Observability · Platform & AI
          Engineering
        </p>
        <p>Belo Horizonte, Brazil · Latin America (LATAM) · UTC−3</p>
        <p className="print-contact">
          Portfolio: iagonc.github.io · LinkedIn:
          linkedin.com/in/iago-n-caldeira
        </p>
        <div className="document-actions">
          <a
            className="linkedin-cta"
            href="/resume.txt"
            download="Iago-Caldeira-Resume.txt"
          >
            Download full résumé ↓
          </a>
          <PrintResume />
          <a className="profile-text-link" href="/consulting">
            Consulting & project contracts ↗
          </a>
        </div>
      </header>
      <nav className="resume-jump-links" aria-label="Work history">
        <a href="#alloy-kinter">Alloy / Kinter</a>
        <a href="#ifood">iFood</a>
        <a href="#accenture">Accenture</a>
        <a href="#picpay">PicPay</a>
        <a href="#prodap">Prodap</a>
        <a href="#independent">Independent</a>
        <a href="#city-hall">City Hall</a>
      </nav>
      <ResumeContent />
      <footer className="document-footer">
        <a href="/#selected-work">Explore the engineering case studies →</a>
        <a href={linkedInUrl} rel="me noopener" target="_blank">
          Connect on LinkedIn ↗
        </a>
      </footer>
    </main>
  );
}
