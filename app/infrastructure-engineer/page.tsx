import type { Metadata } from 'next';
import {
  linkedInUrl,
  publicSiteUrl,
  profileStructuredData,
} from '../site-config';

const title = 'Infrastructure, SRE & Platform Engineer | Iago Caldeira';
const description =
  'Hiring in LATAM? Explore Iago Caldeira’s infrastructure, SRE, DevOps and observability experience at iFood, PicPay and Kinter. AWS, GCP, Kubernetes and Terraform.';
const url = new URL('infrastructure-engineer', publicSiteUrl).href;

const roles = [
  {
    id: 'infrastructure-engineer',
    role: 'Infrastructure Engineer',
    scope: 'Cloud architecture, networking and recovery',
    evidence:
      'At iFood, I redesigned network segmentation and centralized connectivity with AWS Transit Gateway. I refactored GitLab, Vault and Consul for multi-region resilience, with a 99.9% SLO, a 10-minute RTO and a 15-minute RPO for those internal services.',
    tools: 'AWS · GCP · VPC · IAM · Transit Gateway · Terraform · Linux',
    href: '/work/ifood-observability#section-3',
    link: 'Review the infrastructure and recovery work',
  },
  {
    id: 'site-reliability-engineer',
    role: 'Site Reliability Engineer (SRE)',
    scope: 'Production operations, scaling and incident response',
    evidence:
      'At PicPay, I operated infrastructure spanning 300+ Kubernetes clusters and implemented KEDA autoscaling for RabbitMQ workloads. That work reduced incidents related to delayed scaling by 50%. My responsibilities included EKS troubleshooting and production incident support.',
    tools: 'Kubernetes · Amazon EKS · KEDA · RabbitMQ · New Relic · SLOs',
    href: '/work/picpay-kubernetes',
    link: 'Review the Kubernetes reliability case',
  },
  {
    id: 'platform-engineer',
    role: 'Platform Engineer',
    scope: 'Developer tooling, infrastructure as code and GitOps',
    evidence:
      'At iFood, I operated GitLab CI for 5,000+ developers, managed Terraform, Terragrunt and Atlantis, and built internal platforms with Python and Go. At Alloy / Kinter, I implemented Argo CD, Helm and GitLab CI/CD workflows for Kubernetes delivery.',
    tools: 'Terraform · Terragrunt · Atlantis · Argo CD · Helm · Go · Python',
    href: '/work/ifood-observability#section-2',
    link: 'Review the internal developer platform work',
  },
  {
    id: 'devops-engineer',
    role: 'DevOps Engineer',
    scope: 'CI/CD, cloud migration and delivery security',
    evidence:
      'At Accenture, I refactored delivery pipelines for a banking payment processor and integrated SAST and DAST checks. At Prodap, I migrated infrastructure from AWS to Google Cloud and automated environments with Terraform, Kubernetes and Helm.',
    tools: 'GitLab CI/CD · Jenkins · Terraform · AWS · GCP · SAST · DAST',
    href: '/resume#accenture',
    link: 'Review the Accenture and Prodap responsibilities',
  },
  {
    id: 'observability-engineer',
    role: 'Observability Engineer',
    scope: 'APM, distributed tracing, metrics and logs',
    evidence:
      'At iFood, I led a Datadog migration covering 50+ AWS accounts and 3,000+ EC2 instances, standardizing dashboards, APM, infrastructure metrics and distributed tracing. The migration reduced mean time to detect incidents by 40%. I also implemented centralized Logz.io logging.',
    tools:
      'Datadog · Prometheus · Grafana · Logz.io · APM · Distributed tracing',
    href: '/work/ifood-observability#section-1',
    link: 'Review the observability migration and results',
  },
  {
    id: 'ai-infrastructure-engineer',
    role: 'AI Infrastructure Engineer / AI Platform Engineer',
    scope: 'Production agent workflows and LLMOps',
    evidence:
      'At Alloy / Kinter, I lead cloud infrastructure and AI agent engineering. I built a LangGraph agent engine with human approvals, durable SSE replay and execution audit trails, and work on Amazon Bedrock model routing, prompt caching and MCP integrations.',
    tools:
      'Amazon Bedrock · LangGraph · LangChain · MCP · Go · Python · TypeScript',
    href: '/work/kinter-ai-infrastructure',
    link: 'Review the production AI platform case',
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

export default function EngineeringProfilePage() {
  return (
    <main className="document-page consulting-page hiring-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...profileStructuredData,
            url,
            name: title,
            description,
          }).replace(/</g, '\\u003c'),
        }}
      />
      <nav className="document-nav" aria-label="Engineering profile navigation">
        <a href="/">← Iago pocket / Portfolio</a>
        <a href="/resume">Full résumé ↗</a>
      </nav>
      <header className="document-header">
        <p className="profile-eyebrow">
          FOR RECRUITERS, FOUNDERS & ENGINEERING LEADERS
        </p>
        <h1>Infrastructure Engineer & Senior SRE in LATAM.</h1>
        <p className="document-subtitle">
          Iago Neves Caldeira · Belo Horizonte, Brazil
        </p>
        <p className="case-lead">
          I build and operate cloud infrastructure, developer platforms and
          observability systems. Since 2018, my work has covered financial
          services, food delivery and enterprise software. I currently lead
          cloud infrastructure and AI agent engineering at Alloy / Kinter.
        </p>
        <div className="document-actions">
          <a
            className="linkedin-cta"
            href={linkedInUrl}
            rel="me noopener"
            target="_blank"
          >
            Discuss an engineering role ↗
          </a>
          <a className="profile-text-link" href="/resume">
            Read my full work history →
          </a>
        </div>
      </header>
      <dl className="candidate-facts">
        <div>
          <dt>BASED IN</dt>
          <dd>Brazil · Latin America · UTC−3</dd>
        </div>
        <div>
          <dt>LANGUAGES</dt>
          <dd>Portuguese (native) · English (advanced)</dd>
        </div>
        <div>
          <dt>OPPORTUNITIES</dt>
          <dd>Senior & Staff roles · Consulting projects</dd>
        </div>
      </dl>
      <section className="consulting-services" aria-labelledby="role-fit-title">
        <p className="profile-eyebrow">MATCH THE ROLE TO THE EXPERIENCE</p>
        <h2 id="role-fit-title">The work behind the job titles.</h2>
        <p>
          These areas describe how my experience can fit your team. The{' '}
          <a className="profile-text-link" href="/resume">
            full résumé
          </a>{' '}
          lists my employment titles, dates and responsibilities.
        </p>
        <nav className="resume-jump-links" aria-label="Engineering roles">
          {roles.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.role}
            </a>
          ))}
        </nav>
        {roles.map((item, index) => (
          <article
            className="consulting-service hiring-role"
            id={item.id}
            key={item.id}
          >
            <div>
              <span className="expertise-number">
                {String(index + 1).padStart(2, '0')} / ROLE FIT
              </span>
              <h3>{item.role}</h3>
              <p className="consulting-problem">{item.scope}</p>
            </div>
            <div>
              <p>{item.evidence}</p>
              <p className="expertise-tools">{item.tools}</p>
              <a className="profile-text-link" href={item.href}>
                {item.link} ↗
              </a>
            </div>
          </article>
        ))}
      </section>
      <section className="consulting-process" aria-labelledby="interview-title">
        <p className="profile-eyebrow">FOR THE TECHNICAL CONVERSATION</p>
        <h2 id="interview-title">Go deeper than the stack.</h2>
        <p>
          These are useful starting points for a technical interview based on
          the work above.
        </p>
        <ol>
          <li>
            <span>RELIABILITY</span>
            <h3>Incident detection and recovery</h3>
            <p>
              Discuss the observability migration at iFood, what the MTTD result
              covers, and how the SLO, RTO and RPO relate to the internal
              services in the recovery project.
            </p>
          </li>
          <li>
            <span>PLATFORMS</span>
            <h3>Workloads and developer experience</h3>
            <p>
              Explore RabbitMQ-driven autoscaling at PicPay, Kubernetes incident
              support, and the operational responsibilities around CI
              infrastructure for thousands of developers.
            </p>
          </li>
          <li>
            <span>PRODUCTION AI</span>
            <h3>Approvals and execution history</h3>
            <p>
              Walk through agent orchestration, human approval, durable replay
              and audit trails at Kinter, alongside the cloud infrastructure
              that supports the application.
            </p>
          </li>
        </ol>
      </section>
      <section
        className="consulting-contact"
        aria-labelledby="hiring-contact-title"
      >
        <p className="profile-eyebrow">
          SENIOR & STAFF ENGINEERING OPPORTUNITIES
        </p>
        <h2 id="hiring-contact-title">Tell me what your team needs to own.</h2>
        <p>
          I’m interested in roles that combine hands-on infrastructure,
          reliability or platform engineering with technical leadership. Share
          the role, your stack, the team’s challenges and the location or
          time-zone requirements so we can discuss the fit.
        </p>
        <a
          className="linkedin-cta"
          href={linkedInUrl}
          rel="me noopener"
          target="_blank"
        >
          Contact Iago on LinkedIn ↗
        </a>
        <a className="profile-text-link" href="/consulting">
          Need a temporary contract or a defined project? Explore consulting →
        </a>
      </section>
      <footer className="document-footer">
        <a href="/resume">Full résumé and career timeline ↗</a>
        <a href="/#toolkit">All technologies and engineering practices ↗</a>
      </footer>
    </main>
  );
}
