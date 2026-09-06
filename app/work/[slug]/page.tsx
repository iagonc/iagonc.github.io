import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies } from '../../case-studies';
import ExperienceExplorer from '../../experience-explorer';
import DocumentMotion from '../../document-motion';
import FieldInstrument from '../../field-instrument';
import { linkedInUrl, publicSiteUrl } from '../../site-config';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  const title = `${study.title} | Iago Caldeira`;
  const url = new URL(`work/${study.slug}`, publicSiteUrl).href;
  return {
    title,
    description: study.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: study.description,
      url,
      type: 'article',
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: study.description,
      images: ['/og-image.png'],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  const url = new URL(`work/${study.slug}`, publicSiteUrl).href;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: study.title,
    description: study.description,
    mainEntityOfPage: url,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      '@id': `${publicSiteUrl}#person`,
      name: 'Iago Neves Caldeira',
      url: publicSiteUrl,
    },
  };
  return (
    <main className={`document-page case-page case-${study.visual}`}>
      <DocumentMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <nav className="document-nav" aria-label="Case study navigation">
        <a href="/#selected-work">← Iago pocket / Selected work</a>
        <a href="/resume">Full résumé ↗</a>
      </nav>
      <header className="document-header document-cover-header">
        <div className="document-heading">
          <p className="profile-eyebrow">{study.discipline}</p>
          <p className="case-company">
            {study.company} <span>{study.period}</span>
          </p>
          <h1>{study.title}</h1>
          <p className="document-subtitle">{study.headline}</p>
          <p className="case-byline">
            By <a href="/#profile">Iago Neves Caldeira</a> · {study.role}
          </p>
          <p className="case-lead">{study.lead}</p>
          <a className="document-read-link" href="#section-1">
            READ THE FIELD NOTES <span aria-hidden="true">↓</span>
          </a>
        </div>
        <FieldInstrument company={study.visual} sequence={study.flow} />
      </header>
      <dl className="impact-strip">
        {study.metrics.map((metric) => (
          <div key={metric.value}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
      <div className="case-body">
        <aside className="case-outline">
          <p className="profile-eyebrow">IN THIS CHAPTER</p>
          <nav aria-label="Case study contents">
            {study.sections.map((section, index) => (
              <a key={section.title} href={`#section-${index + 1}`}>
                {String(index + 1).padStart(2, '0')} / {section.title}
              </a>
            ))}
          </nav>
          <a className="profile-text-link" href={`/resume#${study.jobId}`}>
            Full responsibilities →
          </a>
        </aside>
        <div className="case-narrative">
          {study.sections.map((section, index) => (
            <section id={`section-${index + 1}`} key={section.title}>
              <span className="expertise-number">
                {String(index + 1).padStart(2, '0')} / ENGINEERING
              </span>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          <figure className="case-flow">
            <figcaption>Engineering overview · simplified sequence</figcaption>
            <ol>
              {study.flow.map((step, index) => (
                <li key={step} style={{ animationDelay: `${index * 160}ms` }}>
                  {step}
                </li>
              ))}
            </ol>
          </figure>
          <p className="case-focus">{study.focus}</p>
        </div>
      </div>
      <section className="case-product" aria-labelledby="product-context">
        <p className="profile-eyebrow">THE PRODUCT BEHIND THE WORK</p>
        <h2 id="product-context">Inside {study.company}.</h2>
        <ExperienceExplorer company={study.visual} headingLevel={3} />
      </section>
      <p className="case-source-note">
        The engineering scope and outcomes above describe my work during the
        stated role. Company figures and public case studies in the product
        explorer have their own dates and sources.
      </p>
      <section className="related-work" aria-labelledby="related-work-title">
        <h2 id="related-work-title">More engineering work</h2>
        {caseStudies
          .filter((other) => other.slug !== study.slug)
          .map((other) => (
            <a href={`/work/${other.slug}`} key={other.slug}>
              <span>{other.company}</span>
              <strong>{other.title}</strong>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
      </section>
      <footer className="document-footer">
        <span>Belo Horizonte, Brazil / LATAM</span>
        <a href="/consulting">Have a similar project? Explore consulting ↗</a>
        <a href={linkedInUrl} rel="me noopener" target="_blank">
          Discuss your engineering team ↗
        </a>
      </footer>
    </main>
  );
}
