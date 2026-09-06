import type { Metadata } from 'next';
import ResumeContent from '../resume-content';
import PrintResume from '../print-resume';
import DocumentMotion from '../document-motion';
import ArchiveCover from '../archive-cover';
import { experience } from '../portfolio';
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
      <DocumentMotion />
      <nav className="document-nav" aria-label="Resume navigation">
        <a href="/">← Iago pocket / Portfolio</a>
        <a href={linkedInUrl} rel="me noopener" target="_blank">
          LinkedIn ↗
        </a>
      </nav>
      <header className="document-header document-cover-header">
        <div className="document-heading">
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
        </div>
        <ArchiveCover variant="resume" />
      </header>
      <div className="resume-layout">
        <aside className="resume-index">
          <p className="profile-eyebrow">THE CAREER INDEX</p>
          <nav className="resume-jump-links" aria-label="Work history">
            {experience.map((job, index) => (
              <a href={`#${job.id}`} key={job.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {job.title}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
          <a className="resume-index-end" href="#resume-toolkit">
            Technical toolkit ↓
          </a>
        </aside>
        <ResumeContent />
      </div>
      <footer className="document-footer">
        <a href="/infrastructure-engineer">
          Match my experience to your role →
        </a>
        <a href="/#selected-work">Explore the engineering case studies →</a>
        <a href={linkedInUrl} rel="me noopener" target="_blank">
          Connect on LinkedIn ↗
        </a>
      </footer>
    </main>
  );
}
