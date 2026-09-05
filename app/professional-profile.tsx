import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { experience } from './portfolio';
import { githubUrl, linkedInUrl } from './site-config';
import ExperienceExplorer from './experience-explorer';
import { technicalToolkit } from './technical-toolkit';

const chapters = [
  {
    id: 'platform-engineering',
    href: '/work/picpay-kubernetes',
    number: '01',
    company: 'PICPAY',
    visual: 'picpay' as const,
    date: '2021–2022',
    title: 'Kubernetes, ready for the rush.',
    discipline: 'Site Reliability Engineering · Cloud infrastructure',
    metric: '300+',
    unit: 'Kubernetes clusters',
    problem:
      'Payment infrastructure needs to keep up with changing demand. Queue-driven workloads need capacity when the work arrives.',
    work: 'At PicPay, I operated infrastructure spanning 300+ Kubernetes clusters and implemented KEDA event-driven autoscaling for RabbitMQ. I supported production incident response and improved visibility with New Relic.',
    takeaway:
      'Connect workload signals, autoscaling and observability so teams can understand how their services behave under load.',
    stack: ['Kubernetes', 'KEDA', 'RabbitMQ', 'AWS', 'New Relic'],
  },
  {
    id: 'observability',
    href: '/work/ifood-observability',
    number: '02',
    company: 'IFOOD',
    visual: 'ifood' as const,
    date: '2022–2025',
    title: 'A clearer signal at scale.',
    discipline: 'Observability Engineering · Platform Engineering',
    metric: '50+',
    unit: 'AWS accounts',
    problem:
      'When infrastructure spans many accounts and teams, consistent monitoring makes it easier to see what is happening and respond to incidents.',
    work: 'At iFood, I standardized observability across 50+ AWS accounts and 3,000+ EC2 instances. My work included Datadog adoption, infrastructure tooling for thousands of developers and multi-region recovery design for critical internal services.',
    takeaway:
      'Bring monitoring, infrastructure as code and recovery planning together to make a large platform easier to operate.',
    stack: ['Datadog', 'Terraform', 'AWS', 'Python', 'SLOs'],
  },
  {
    id: 'ai-infrastructure',
    href: '/work/kinter-ai-infrastructure',
    number: '03',
    company: 'ALLOY / KINTER',
    visual: 'kinter' as const,
    date: '2025–PRESENT',
    title: 'AI agents with a human in the loop.',
    discipline: 'AI Infrastructure · Production AI agents',
    metric: 'HITL',
    unit: 'human approval workflows',
    problem:
      'An agent that takes action needs more than a model response. It needs explicit approvals, recoverable execution and a record of what happened.',
    work: 'At Alloy / Kinter, I lead cloud infrastructure and AI agent engineering. I architected an agent engine for general-ledger reconciliation using LangChain and LangGraph, with human-in-the-loop approvals, durable SSE replay and execution audit trails. My work also includes Amazon Bedrock model routing, prompt caching and Model Context Protocol (MCP) integrations.',
    takeaway:
      'Apply reliability engineering to agentic AI: make the workflow observable, keep humans in control and preserve execution history.',
    stack: ['LangGraph', 'Amazon Bedrock', 'MCP', 'Go', 'Python', 'TypeScript'],
  },
];

export default function ProfessionalProfile() {
  return (
    <main id="profile" className="professional-profile" tabIndex={-1}>
      <div className="profile-section-label">
        <span>PLAYER FILE / 01</span>
        <span>THE PERSON BEHIND THE PIXELS</span>
      </div>
      <section className="profile-introduction" aria-labelledby="profile-title">
        <div>
          <p className="profile-eyebrow">
            <MapPin size={13} aria-hidden="true" /> BRAZIL / LATIN AMERICA /
            UTC−3
          </p>
          <h1 id="profile-title">
            Iago Caldeira<span>Senior Site Reliability Engineer (SRE)</span>
          </h1>
          <p className="profile-specialisms">
            Platform Engineering · Cloud Infrastructure · Production AI
          </p>
          <p className="profile-lead">
            I’m Iago Neves Caldeira, a Senior SRE, Platform Engineer and AI
            Engineer based in Belo Horizonte, Brazil, in Latin America (LATAM).
          </p>
          <p className="profile-body">
            I build infrastructure on Amazon Web Services (AWS) and Google Cloud
            Platform (GCP), operate Kubernetes platforms, and bring AI agents
            into production. Since 2018, I’ve worked across fintech, food
            delivery and enterprise software, combining hands-on engineering
            with technical leadership.
          </p>
          <div className="profile-actions">
            <a
              className="linkedin-cta"
              href={linkedInUrl}
              target="_blank"
              rel="me noopener"
            >
              <span className="linkedin-word-icon" aria-hidden="true">
                in
              </span>{' '}
              Connect on LinkedIn <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="profile-text-link" href="#experience">
              Explore my experience <ArrowDown size={15} aria-hidden="true" />
            </a>
            <a className="profile-text-link" href="/resume">
              Read the full résumé <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <aside
          className="player-card"
          aria-label="Professional profile at a glance"
        >
          <div className="player-card-top">
            <span className="player-card-mark" aria-hidden="true">
              IC
            </span>
            <span>
              PLAYER 01
              <br />
              ENGINEER / BUILDER
            </span>
          </div>
          <dl>
            <div>
              <dt>CORE CLASS</dt>
              <dd>Senior SRE & Platform Engineer</dd>
            </div>
            <div>
              <dt>SPECIAL ABILITY</dt>
              <dd>Observability & AI infrastructure</dd>
            </div>
            <div>
              <dt>TOOLKIT AT A GLANCE</dt>
              <dd className="player-toolkit">
                <span>AWS · GCP · Kubernetes · Terraform</span>
                <span>Datadog · Prometheus · Grafana</span>
                <span>Go · Python · TypeScript</span>
                <span>LangGraph · Bedrock · MCP</span>
                <a className="profile-text-link" href="#toolkit">
                  Explore the full toolkit{' '}
                  <ArrowDown size={13} aria-hidden="true" />
                </a>
              </dd>
            </div>
            <div>
              <dt>HOME BASE</dt>
              <dd>Brazil · LATAM · UTC−3</dd>
            </div>
            <div>
              <dt>LANGUAGES</dt>
              <dd>Portuguese (native) · English (advanced)</dd>
            </div>
          </dl>
          <a href={linkedInUrl} target="_blank" rel="me noopener">
            View Iago’s LinkedIn profile{' '}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </aside>
      </section>
      <dl
        className="impact-strip homepage-impact"
        aria-label="Selected engineering outcomes"
      >
        <div>
          <dt>Lower mean time to detect incidents · iFood</dt>
          <dd>40%</dd>
        </div>
        <div>
          <dt>Fewer delayed-scaling incidents · PicPay</dt>
          <dd>50%</dd>
        </div>
        <div>
          <dt>Developer platform scope · iFood</dt>
          <dd>5,000+</dd>
        </div>
      </dl>
      <section
        id="selected-work"
        className="work-chapters"
        aria-labelledby="work-title"
      >
        <div className="profile-section-heading">
          <div>
            <p className="profile-eyebrow">THREE CHAPTERS. REAL WORK.</p>
            <h2 id="work-title">Beyond the screen.</h2>
          </div>
          <p>The experience behind the playable missions.</p>
        </div>
        {chapters.map((chapter) => (
          <article id={chapter.id} className="work-chapter" key={chapter.id}>
            <div className="chapter-index">
              <span>{chapter.number}</span>
              <div>
                {chapter.company}
                <small>{chapter.date}</small>
              </div>
            </div>
            <div className="chapter-story">
              <p className="chapter-discipline">{chapter.discipline}</p>
              <h3>{chapter.title}</h3>
              <p>{chapter.problem}</p>
              <p>{chapter.work}</p>
              <p className="chapter-takeaway">
                <strong>The engineering idea</strong>
                {chapter.takeaway}
              </p>
              <ul
                className="chapter-stack"
                aria-label={`${chapter.company} technologies`}
              >
                {chapter.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                className="profile-text-link case-study-link"
                href={chapter.href}
              >
                Read the{' '}
                {chapter.company === 'ALLOY / KINTER'
                  ? 'AI infrastructure'
                  : chapter.company === 'IFOOD'
                    ? 'observability'
                    : 'Kubernetes'}{' '}
                case study <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="chapter-metric">
              <strong>{chapter.metric}</strong>
              <span>{chapter.unit}</span>
              <span className="chapter-metric-caption">{chapter.company}</span>
            </div>
            <ExperienceExplorer company={chapter.visual} />
          </article>
        ))}
        <p className="work-footnote">
          These chapters describe my professional experience. The console
          missions are illustrative simulations.
        </p>
      </section>
      <section
        id="expertise"
        className="expertise-section"
        aria-labelledby="expertise-title"
      >
        <div className="profile-section-heading">
          <div>
            <p className="profile-eyebrow">AREAS OF PRACTICE</p>
            <h2 id="expertise-title">Infrastructure. Platforms. Applied AI.</h2>
          </div>
          <p>Four areas of practice, grounded in real engineering work.</p>
        </div>
        <div className="expertise-grid">
          <section>
            <span className="expertise-number">01 / RELIABILITY</span>
            <h3>Site Reliability Engineering</h3>
            <p className="expertise-role">
              Senior SRE / Site Reliability Engineer
            </p>
            <p>
              As a Site Reliability Engineer, I work on incident response,
              service-level objectives (SLOs), observability and disaster
              recovery. At iFood, I standardized monitoring across 50+ AWS
              accounts and 3,000+ EC2 instances and designed multi-region
              recovery for critical internal services.
            </p>
            <p className="expertise-tools">
              Datadog · Prometheus · Grafana · New Relic · Elasticsearch
            </p>
            <a className="profile-text-link" href="#observability">
              See the iFood chapter{' '}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </section>
          <section>
            <span className="expertise-number">02 / PLATFORM</span>
            <h3>Platform Engineering</h3>
            <p className="expertise-role">
              Platform Engineer / Infrastructure Engineer
            </p>
            <p>
              I build cloud platforms and internal tooling that help developers
              ship and operate services. My platform engineering work spans
              Amazon EKS, Kubernetes, infrastructure as code and GitOps. At
              PicPay, I operated infrastructure spanning 300+ clusters and
              implemented KEDA autoscaling for RabbitMQ workloads.
            </p>
            <p className="expertise-tools">
              AWS · Kubernetes · Terraform · Terragrunt · Argo CD · Helm
            </p>
            <a className="profile-text-link" href="#platform-engineering">
              See the PicPay chapter{' '}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </section>
          <section>
            <span className="expertise-number">03 / CLOUD & DELIVERY</span>
            <h3>DevOps & Cloud Infrastructure</h3>
            <p className="expertise-role">DevOps Engineer / Cloud Engineer</p>
            <p>
              As a DevOps Engineer, I automate CI/CD, provision environments and
              integrate security checks into delivery. At Prodap, I migrated
              infrastructure from AWS to Google Cloud (GCP). At Accenture, I
              refactored pipelines for a banking payment processor and
              integrated SAST and DAST.
            </p>
            <p className="expertise-tools">
              AWS · GCP · GitLab CI · Jenkins · Terraform · Linux · Python
            </p>
            <a className="profile-text-link" href="#experience">
              Explore the delivery work{' '}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </section>
          <section>
            <span className="expertise-number">04 / INTELLIGENCE</span>
            <h3>AI Infrastructure & Platforms</h3>
            <p className="expertise-role">
              AI Infrastructure Engineer / AI Platform Engineer
            </p>
            <p>
              I build the infrastructure and workflows around production AI
              agents. At Alloy / Kinter, I architected a LangGraph agent engine
              with human approvals, durable SSE replay and execution audit
              trails. My AI platform work includes Amazon Bedrock model routing,
              prompt caching and MCP integrations: the operational side of
              LLMOps.
            </p>
            <p className="expertise-tools">
              Amazon Bedrock · LangGraph · LangChain · Go · Python · TypeScript
            </p>
            <a className="profile-text-link" href="#ai-infrastructure">
              See the AI engineering chapter{' '}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </section>
        </div>
      </section>
      <section
        id="toolkit"
        className="technical-toolkit"
        aria-labelledby="toolkit-title"
      >
        <div className="profile-section-heading">
          <div>
            <p className="profile-eyebrow">THE FULL INVENTORY</p>
            <h2 id="toolkit-title">The tools behind the work.</h2>
          </div>
          <p>
            Cloud, delivery, reliability, security, code and AI.
            <br />
            Technologies and practices from my engineering experience.
          </p>
        </div>
        <div className="toolkit-grid">
          {technicalToolkit.map((group, index) => (
            <section className="toolkit-group" key={group.title}>
              <span className="expertise-number">
                {String(index + 1).padStart(2, '0')} / TOOLKIT
              </span>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul aria-label={`${group.title} technologies and practices`}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="profile-text-link" href={group.href}>
                {group.linkLabel} <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </section>
          ))}
        </div>
      </section>
      <section
        id="experience"
        className="career-section"
        aria-labelledby="career-title"
      >
        <div className="profile-section-heading">
          <div>
            <p className="profile-eyebrow">THE QUEST LOG</p>
            <h2 id="career-title">Experience, in order.</h2>
          </div>
          <a
            className="profile-text-link"
            href="/resume.txt"
            download="Iago-Caldeira-Resume.txt"
          >
            Download résumé <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="career-list">
          {experience.map((job) => (
            <article className="career-entry" key={job.title}>
              <span className="career-date">{job.date}</span>
              <div>
                <h3>{job.title}</h3>
                <p className="career-role">{job.role}</p>
                <p>{job.detail}</p>
                <a className="profile-text-link" href={`/resume#${job.id}`}>
                  Read all responsibilities{' '}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        id="consulting"
        className="consulting-callout"
        aria-labelledby="consulting-title"
      >
        <div>
          <p className="profile-eyebrow">
            PROJECT-BASED / FIXED-TERM CONTRACTS
          </p>
          <h2 id="consulting-title">
            A specific challenge.
            <br />
            An engineer to see it through.
          </h2>
          <p>
            I also take on consulting projects and temporary contracts in SRE,
            DevOps, cloud infrastructure, platform engineering and production
            AI. From an architecture assessment to implementation and handover,
            we can define the scope around what your team needs to ship or
            improve.
          </p>
          <a className="linkedin-cta" href="/consulting">
            Explore consulting services{' '}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <ul aria-label="Consulting areas">
          <li>
            <span>01</span> SRE & observability
          </li>
          <li>
            <span>02</span> AWS, GCP & Kubernetes
          </li>
          <li>
            <span>03</span> DevOps & developer platforms
          </li>
          <li>
            <span>04</span> AI infrastructure & LLMOps
          </li>
        </ul>
      </section>
      <section
        id="opportunities"
        className="recruiter-section"
        aria-labelledby="opportunities-title"
      >
        <div className="recruiter-intro">
          <p className="profile-eyebrow">FOR RECRUITERS & ENGINEERING TEAMS</p>
          <h2 id="opportunities-title">
            Based in LATAM.
            <br />
            Focused on production.
          </h2>
          <p>
            Looking for an engineer in Latin America who can work across
            reliability, cloud platforms and AI infrastructure? My experience
            connects those areas, from Kubernetes operations to observability
            standards and production agent workflows.
          </p>
          <a className="profile-text-link" href="#expertise">
            Match the role to my work{' '}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="recruiter-brief">
          <p className="brief-label">THE ROLE CONVERSATION</p>
          <h3>Senior & Staff opportunities</h3>
          <p>
            I’m interested in roles that combine hands-on engineering with
            technical leadership. My experience includes leading infrastructure
            and AI engineering, building tooling for thousands of developers,
            and setting observability standards across teams.
          </p>
          <dl>
            <div>
              <dt>LOCATION</dt>
              <dd>Belo Horizonte, Brazil · LATAM</dd>
            </div>
            <div>
              <dt>TIME ZONE</dt>
              <dd>UTC−3 / Americas</dd>
            </div>
            <div>
              <dt>LANGUAGES</dt>
              <dd>Portuguese (native) · English (advanced)</dd>
            </div>
          </dl>
        </div>
      </section>
      <section
        id="connect"
        className="connect-section"
        aria-labelledby="connect-title"
      >
        <span className="connect-pixel" aria-hidden="true">
          ↗
        </span>
        <div>
          <p className="profile-eyebrow">THE NEXT CHAPTER</p>
          <h2 id="connect-title">Let’s talk about your team.</h2>
          <p>
            Share the role, the engineering challenge and the team’s context.
            Let’s discuss where my SRE, platform and AI infrastructure
            experience can help.
          </p>
          <a
            className="linkedin-cta"
            href={linkedInUrl}
            target="_blank"
            rel="me noopener"
          >
            <span className="linkedin-word-icon" aria-hidden="true">
              in
            </span>{' '}
            Find me on LinkedIn <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
      <footer className="profile-footer">
        <span>IAGO NEVES CALDEIRA · BRAZIL / LATAM · UTC−3</span>
        <a href="/resume">Full résumé</a>
        <a href="/consulting">Consulting</a>
        <a href={githubUrl} target="_blank" rel="me noopener">
          GitHub ↗
        </a>
        <a href="#console">Back to the console ↑</a>
      </footer>
    </main>
  );
}
