import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { experience } from './portfolio';
import { githubUrl, linkedInUrl } from './site-config';
import ExperienceExplorer from './experience-explorer';
import { technicalToolkit } from './technical-toolkit';
import FieldInstrument from './field-instrument';
import { caseStudies } from './case-studies';
import ScrollExperience from './scroll-experience';

const chapters = ['picpay', 'ifood', 'kinter'].map((company) =>
  caseStudies.find((study) => study.visual === company)!,
);

export default function ProfessionalProfile() {
  return (
    <main id="profile" className="professional-profile" tabIndex={-1}>
      <ScrollExperience />
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
            Infrastructure · Platform Engineering · Observability · Production
            AI
          </p>
          <p className="profile-lead">
            I’m Iago Neves Caldeira, a Senior Site Reliability Engineer (SRE)
            based in Belo Horizonte, Brazil, in Latin America (LATAM). My work
            spans infrastructure engineering, developer platforms, observability
            and production AI.
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
            <p className="profile-eyebrow">
              SELECTED EXPERIENCE / 2021–PRESENT
            </p>
            <h2 id="work-title">The work behind the systems.</h2>
          </div>
          <p>
            Three companies. The platforms I operated, the systems I built and
            the teams I supported.
          </p>
        </div>
        <nav className="chapter-directory" aria-label="Company chapters">
          {chapters.map((chapter, index) => (
            <a href={`#${chapter.chapterId}`} key={chapter.jobId}>
              <span>0{index + 1}</span>
              <strong>{chapter.company}</strong>
              <ArrowDown size={17} aria-hidden="true" />
            </a>
          ))}
        </nav>
        {chapters.map((chapter, index) => (
          <article
            id={chapter.chapterId}
            className={`career-chapter career-${chapter.visual}`}
            key={chapter.jobId}
            aria-labelledby={`${chapter.jobId}-chapter-title`}
          >
            <div className="career-registration" aria-hidden="true">
              <span>FIELD NOTES / 0{index + 1}</span>
              <span>{chapter.company.toUpperCase()}</span>
              <span>ENGINEERING IN PRACTICE</span>
            </div>
            <header className="career-cover">
              <div className="career-heading">
                <p className="profile-eyebrow">{chapter.discipline}</p>
                <div className="career-company">
                  <h3 id={`${chapter.jobId}-chapter-title`}>
                    {chapter.company}
                  </h3>
                  <span>{chapter.period}</span>
                </div>
                <p className="career-headline">{chapter.headline}</p>
                <p className="career-byline">{chapter.role}</p>
                <p className="career-lead">{chapter.lead}</p>
                <a className="career-read" href={`#${chapter.jobId}-scope`}>
                  EXPLORE MY WORK <ArrowDown size={17} aria-hidden="true" />
                </a>
              </div>
              <FieldInstrument
                company={chapter.visual}
                sequence={chapter.flow}
              />
            </header>
            <dl
              className="impact-strip career-impact"
              aria-label={`${chapter.company}: my engineering scope and outcomes`}
            >
              {chapter.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt>{metric.label}</dt>
                  <dd>{metric.value}</dd>
                </div>
              ))}
            </dl>
            <div className="career-scope" id={`${chapter.jobId}-scope`}>
              <aside className="career-scope-index">
                <p className="profile-eyebrow">MY SCOPE</p>
                <p className="career-scope-title">
                  Across the
                  <br />
                  whole system.
                </p>
                <p>Architecture, implementation and production operations.</p>
                <a className="profile-text-link" href={`/work/${chapter.slug}`}>
                  Read the full field notes{' '}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a
                  className="profile-text-link"
                  href={`/resume#${chapter.jobId}`}
                >
                  Résumé & technologies{' '}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </aside>
              <div className="career-scope-grid">
                {chapter.sections.map((section, sectionIndex) => (
                  <section className="career-scope-item" key={section.title}>
                    <p className="career-scope-label">
                      <span>0{sectionIndex + 1}</span>
                      {section.area}
                    </p>
                    <h4>{section.title}</h4>
                    <p>{section.overview}</p>
                  </section>
                ))}
              </div>
            </div>
            <p className="career-toolkit">
              <span>IN THE TOOLKIT</span>
              {chapter.focus}
            </p>
            <details className="career-context">
              <summary>
                <span>INSIDE {chapter.company.toUpperCase()}</span>
                <span>Product screens & company context</span>
                <span className="career-context-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <ExperienceExplorer company={chapter.visual} />
            </details>
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
                <details className="career-responsibilities">
                  <summary>
                    Full scope{' '}
                    <span>{job.highlights.length} responsibilities</span>
                  </summary>
                  <ul>
                    {job.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </details>
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
            Hiring for infrastructure, SRE or platform engineering?
          </h2>
          <p>
            My experience fits Infrastructure Engineer, Site Reliability
            Engineer, DevOps Engineer, Platform Engineer and Observability
            Engineer roles. Explore the responsibilities, technologies and
            results behind each area, including AWS/GCP infrastructure and
            production AI platforms.
          </p>
          <a className="profile-text-link" href="/infrastructure-engineer">
            Read the brief for hiring teams{' '}
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
        <a href="/infrastructure-engineer">For hiring teams</a>
        <a href="/consulting">Consulting</a>
        <a href={githubUrl} target="_blank" rel="me noopener">
          GitHub ↗
        </a>
        <a href="#console">Back to the console ↑</a>
      </footer>
    </main>
  );
}
