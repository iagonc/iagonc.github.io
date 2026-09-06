import type { Metadata } from 'next';
import DocumentMotion from '../document-motion';
import ArchiveCover from '../archive-cover';
import { linkedInUrl, publicSiteUrl } from '../site-config';

const title = 'SRE, DevOps & Cloud Consulting | Iago Caldeira · Brazil / LATAM';
const description =
  'Project-based SRE, DevOps, AWS/GCP, Kubernetes and AI infrastructure consulting by Iago Caldeira. Remote projects and fixed-term contracts from Brazil, LATAM.';
const url = new URL('consulting', publicSiteUrl).href;

const services = [
  {
    id: 'reliability',
    title: 'SRE & observability',
    problem:
      'Incidents are hard to detect, alerts are noisy, or recovery depends on a few people.',
    work: 'I can review your monitoring and incident response, define SLIs and SLOs, improve alerting, and design recovery procedures your team can exercise.',
    deliverables:
      'Monitoring and alerting changes, SLO definitions, incident runbooks and a recovery validation plan.',
    tools: 'Datadog · Prometheus · Grafana · New Relic · CloudWatch',
    proof:
      'At iFood: observability across 50+ AWS accounts and 40% lower mean time to detect incidents.',
    href: '/work/ifood-observability',
    label: 'Read the iFood observability case',
  },
  {
    id: 'cloud',
    title: 'Cloud infrastructure & Kubernetes',
    problem:
      'Your team needs a cloud migration, more predictable capacity, or a closer look at infrastructure costs.',
    work: 'I can help assess and build AWS or Google Cloud (GCP) infrastructure, plan migrations, and improve Kubernetes operations, autoscaling and cost visibility.',
    deliverables:
      'An architecture and migration plan, infrastructure changes, workload scaling configuration and operational documentation.',
    tools: 'AWS · GCP · Amazon EKS · Kubernetes · KEDA · Terraform',
    proof:
      'At PicPay: infrastructure spanning 300+ Kubernetes clusters and event-driven autoscaling for RabbitMQ.',
    href: '/work/picpay-kubernetes',
    label: 'Read the PicPay Kubernetes case',
  },
  {
    id: 'platforms',
    title: 'DevOps & platform engineering',
    problem:
      'Provisioning is manual, deployments are inconsistent, or developers need a clearer path to production.',
    work: 'I can automate infrastructure as code, build CI/CD and GitOps workflows, integrate security checks, and improve the internal tools developers use every day.',
    deliverables:
      'Reusable infrastructure modules, delivery pipelines, deployment checks and a documented workflow for your team.',
    tools: 'Terraform · Terragrunt · Atlantis · GitLab CI/CD · Argo CD · Helm',
    proof:
      'At iFood: infrastructure tooling supporting 5,000+ developers. At Accenture: CI/CD work for a banking payment processor.',
    href: '/resume#accenture',
    label: 'Explore my delivery and platform experience',
  },
  {
    id: 'ai',
    title: 'AI infrastructure & LLMOps',
    problem:
      'An AI agent works in a demo and now needs reliable execution, human approvals and visibility in production.',
    work: 'I can help build the infrastructure around LLM applications: agent orchestration, model integrations, MCP tools, human-in-the-loop workflows and execution observability.',
    deliverables:
      'Agent workflow implementation, approval and recovery paths, execution audit trails and model usage visibility.',
    tools:
      'Amazon Bedrock · LangGraph · LangChain · MCP · Go · Python · TypeScript',
    proof:
      'At Alloy / Kinter: AI agent engineering with human approvals, durable SSE replay, model routing and prompt caching.',
    href: '/work/kinter-ai-infrastructure',
    label: 'Read the Kinter AI infrastructure case',
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};

export default function ConsultingPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'SRE, DevOps, cloud and AI infrastructure consulting',
    description,
    url,
    serviceType: services.map((service) => service.title),
    provider: {
      '@type': 'Person',
      '@id': `${publicSiteUrl}#person`,
      name: 'Iago Neves Caldeira',
      url: publicSiteUrl,
      sameAs: linkedInUrl,
    },
  };
  return (
    <main className="document-page consulting-page">
      <DocumentMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <nav className="document-nav" aria-label="Consulting navigation">
        <a href="/">← Iago pocket / Portfolio</a>
        <a href="/resume">Full résumé ↗</a>
      </nav>
      <header className="document-header document-cover-header">
        <div className="document-heading">
          <p className="profile-eyebrow">
            INDEPENDENT CONSULTING / IAGO CALDEIRA
          </p>
          <h1>SRE, cloud & AI infrastructure consulting.</h1>
          <p className="document-subtitle">
            A defined project. Hands-on engineering. A team ready to own it.
          </p>
          <p className="case-lead">
            I help engineering teams improve reliability, build cloud platforms
            and bring AI workflows into production. I take on project-based
            consulting and fixed-term contracts, from a focused assessment to
            implementation and handover.
          </p>
          <p>
            Belo Horizonte, Brazil · LATAM · UTC−3 · Remote collaboration in
            English and Portuguese
          </p>
          <div className="document-actions">
            <a
              className="linkedin-cta"
              href={linkedInUrl}
              rel="me noopener"
              target="_blank"
            >
              Discuss your project on LinkedIn ↗
            </a>
            <a className="profile-text-link" href="#services">
              Find the right scope ↓
            </a>
          </div>
        </div>
        <ArchiveCover variant="consulting" />
      </header>
      <div className="consulting-modes" aria-label="Engagement formats">
        <span>Architecture & reliability assessments</span>
        <span>Implementation projects</span>
        <span>Temporary engineering contracts</span>
      </div>
      <section
        id="services"
        className="consulting-services"
        aria-labelledby="services-title"
      >
        <p className="profile-eyebrow">WHERE I CAN HELP</p>
        <h2 id="services-title">What does your team need to solve?</h2>
        {services.map((service, index) => (
          <article
            className="consulting-service"
            id={service.id}
            key={service.id}
          >
            <div>
              <span className="expertise-number">
                0{index + 1} / CONSULTING
              </span>
              <h3>{service.title}</h3>
              <p className="consulting-problem">{service.problem}</p>
            </div>
            <div>
              <p>{service.work}</p>
              <p>
                <strong>Typical deliverables</strong>
                <br />
                {service.deliverables}
              </p>
              <p className="expertise-tools">{service.tools}</p>
              <p className="consulting-proof">{service.proof}</p>
              <a className="profile-text-link" href={service.href}>
                {service.label} ↗
              </a>
            </div>
          </article>
        ))}
      </section>
      <section className="consulting-process" aria-labelledby="process-title">
        <p className="profile-eyebrow">FROM FIRST CONVERSATION TO HANDOVER</p>
        <h2 id="process-title">A scope we can actually deliver.</h2>
        <ol>
          <li>
            <span>01 / UNDERSTAND</span>
            <h3>Start with the constraint.</h3>
            <p>
              We discuss your systems, the problem, the team and the deadline.
              We agree on scope, deliverables and acceptance criteria before
              implementation.
            </p>
          </li>
          <li>
            <span>02 / BUILD & VALIDATE</span>
            <h3>Work with your team.</h3>
            <p>
              I implement the agreed changes, review them with your engineers
              and validate the relevant failure and recovery paths.
            </p>
          </li>
          <li>
            <span>03 / HAND OVER</span>
            <h3>Leave it operable.</h3>
            <p>
              The handover includes the code, documentation, runbooks and a
              walkthrough of operational decisions and any remaining work.
            </p>
          </li>
        </ol>
      </section>
      <section className="consulting-contact" aria-labelledby="project-title">
        <p className="profile-eyebrow">LET’S TALK ABOUT YOUR PROJECT</p>
        <h2 id="project-title">
          Bring the problem.
          <br />
          We’ll work out the scope.
        </h2>
        <p>
          Send me a short overview of your stack, the challenge and your target
          timeline. We can discuss the engagement format, availability and next
          steps.
        </p>
        <a
          className="linkedin-cta"
          href={linkedInUrl}
          rel="me noopener"
          target="_blank"
        >
          Start a project conversation ↗
        </a>
        <a className="profile-text-link" href="/resume#independent">
          My previous independent consulting work →
        </a>
      </section>
      <footer className="document-footer">
        <span>Iago Neves Caldeira · Brazil / LATAM</span>
        <a href="/infrastructure-engineer">
          Hiring for your team? Read the engineering brief ↗
        </a>
        <a href="/#selected-work">Explore all engineering cases ↗</a>
      </footer>
    </main>
  );
}
