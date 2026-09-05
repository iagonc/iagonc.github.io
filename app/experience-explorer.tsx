'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Expand } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const stories = {
  picpay: {
    name: 'PicPay',
    category: 'FINTECH / BRAZIL',
    title: 'Everyday money. Serious infrastructure.',
    description:
      'PicPay brings payments, credit and financial services into a mobile app for people and businesses in Brazil.',
    imageNote: 'Official App Store screenshots',
    imageSource:
      'https://apps.apple.com/br/app/picpay-conta-cart%C3%A3o-e-pix/id561524792',
    imageSourceLabel: 'PicPay on the App Store',
    images: [
      {
        src: '/images/experience/picpay-screen-1.webp',
        width: 600,
        height: 1299,
        label: 'Account overview',
        alt: 'Official PicPay App Store screenshot showing the account balance and banking home screen.',
      },
      {
        src: '/images/experience/picpay-screen-2.webp',
        width: 600,
        height: 1299,
        label: 'Pix payments',
        alt: 'Official PicPay App Store screenshot showing Pix transfers, QR code payments and contacts.',
      },
      {
        src: '/images/experience/picpay-screen-3.webp',
        width: 600,
        height: 1299,
        label: 'Savings goals',
        alt: 'Official PicPay App Store screenshot showing Cofrinhos savings goals and balances.',
      },
    ],
    source: 'https://investor.picpay.com/about-us/',
    sourceLabel: 'PicPay Investor Relations · June 2026',
    snapshot: '70M total accounts · company snapshot, June 2026',
    coverage: [
      {
        publisher: 'PICPAY INVESTOR RELATIONS',
        date: 'June 2026 snapshot',
        title: '70 million accounts across Brazil',
        description:
          'PicPay’s investor overview reports its account base and the expansion from a digital wallet into a broader financial platform.',
        url: 'https://investor.picpay.com/about-us/',
      },
      {
        publisher: 'AWS CUSTOMER STORY',
        date: '2022–2024 modernization',
        title: 'Over 50% lower monthly costs with EKS and Karpenter',
        description:
          'AWS describes PicPay’s infrastructure modernization, use of Spot Instances and reduction in operational support tickets.',
        url: 'https://aws.amazon.com/solutions/case-studies/picpay-eks-case-study/',
      },
      {
        publisher: 'PICPAY PRESS ROOM',
        date: 'Q1 2026 snapshot',
        title: 'R$134 billion in total payment volume',
        description:
          'PicPay reports 24% year-over-year growth in total payment volume for the first quarter of 2026.',
        url: 'https://picpay.com/en-us/sala-de-imprensa',
      },
    ],
    scales: [
      {
        label: 'Company context',
        value: '70M',
        unit: 'total accounts',
        period: 'COMPANY SNAPSHOT / JUNE 2026',
        description:
          'The account base reported by PicPay Investor Relations in June 2026. This company snapshot is later than my 2021–2022 role.',
        dots: 70,
        legend: 'Each dot represents 1 million accounts.',
      },
      {
        label: 'My engineering scope',
        value: '300+',
        unit: 'Kubernetes clusters',
        period: 'MY CAREER SCOPE / 2021–2022',
        description:
          'Infrastructure I helped operate, with queue-driven autoscaling, production incident response and New Relic observability.',
        dots: 300,
        legend: 'Each dot represents one cluster; + indicates more.',
      },
    ],
    flow: [
      {
        label: 'Read demand',
        tool: 'RabbitMQ',
        detail:
          'Use queue backlog as a workload signal. Pending work informs when processing capacity needs to grow.',
      },
      {
        label: 'Scale workers',
        tool: 'KEDA + Kubernetes',
        detail:
          'I implemented event-driven autoscaling with KEDA for RabbitMQ workloads, connecting processing capacity to queue demand.',
      },
      {
        label: 'Operate reliably',
        tool: 'New Relic + incident response',
        detail:
          'I improved production visibility and supported incident response across infrastructure spanning 300+ Kubernetes clusters.',
      },
    ],
  },
  ifood: {
    name: 'iFood',
    category: 'FOOD DELIVERY / BRAZIL',
    title: 'Behind every order, a whole ecosystem.',
    description:
      'iFood connects customers, merchants and couriers through a delivery and commerce platform across Brazil.',
    imageNote: 'Official App Store screenshots',
    imageSource:
      'https://apps.apple.com/br/app/ifood-pedir-delivery-em-casa/id483017239',
    imageSourceLabel: 'iFood on the App Store',
    images: [
      {
        src: '/images/experience/ifood-screen-1.png',
        width: 392,
        height: 696,
        label: 'Restaurants',
        alt: 'Official iFood App Store screenshot showing restaurant discovery and food categories.',
      },
      {
        src: '/images/experience/ifood-screen-2.png',
        width: 392,
        height: 696,
        label: 'Search & filters',
        alt: 'Official iFood App Store screenshot showing sorting and filters for price, ratings and delivery time.',
      },
      {
        src: '/images/experience/ifood-screen-3.png',
        width: 392,
        height: 696,
        label: 'Groceries',
        alt: 'Official iFood App Store screenshot showing the grocery marketplace and supermarket categories.',
      },
    ],
    source:
      'https://institucional.ifood.com.br/releases/ifood-bate-novo-recorde-no-mes-de-novembro-com-180-milhoes-de-pedidos-totais/',
    sourceLabel: 'iFood company announcement · December 2025',
    snapshot: '180M ecosystem orders · November 2025 record',
    coverage: [
      {
        publisher: 'IFOOD NEWSROOM',
        date: 'December 8, 2025',
        title: '180 million orders in a single month',
        description:
          'The November 2025 record covers the whole iFood ecosystem, including messaging channels, with R$15 billion in partner sales.',
        url: 'https://institucional.ifood.com.br/releases/ifood-bate-novo-recorde-no-mes-de-novembro-com-180-milhoes-de-pedidos-totais/',
      },
      {
        publisher: 'AWS CUSTOMER STORY',
        date: 'AI & developer productivity',
        title: 'Personalization at scale with AWS AI',
        description:
          'AWS explains how iFood uses Amazon Bedrock and SageMaker for customer personalization and internal developer productivity.',
        url: 'https://aws.amazon.com/solutions/case-studies/ifood-bedrock/',
      },
      {
        publisher: 'IFOOD NEWSROOM',
        date: 'March 20, 2026',
        title: '12 million orders supported by its commerce AI model',
        description:
          'iFood reported this February 2026 milestone for its Large Commerce Model, developed with Prosus.',
        url: 'https://institucional.ifood.com.br/releases/ifood-12-milhoes-pedidos/',
      },
    ],
    scales: [
      {
        label: 'Company context',
        value: '180M',
        unit: 'orders across the ecosystem in one month',
        period: 'COMPANY RECORD / NOVEMBER 2025',
        description:
          'The November 2025 record spans iFood’s integrated ecosystem, including orders through messaging channels. The company reported R$15 billion in partner sales that month.',
        dots: 180,
        legend:
          'Each dot represents 1 million ecosystem orders in November 2025.',
      },
      {
        label: 'My engineering scope',
        value: '50+',
        unit: 'AWS accounts · 3,000+ EC2 instances',
        period: 'MY CAREER SCOPE / 2022–2025',
        description:
          'The footprint of my observability work: consistent monitoring, Datadog adoption and infrastructure tooling for engineering teams.',
        dots: 50,
        legend: 'Each dot represents one AWS account; + indicates more.',
      },
    ],
    flow: [
      {
        label: 'Collect signals',
        tool: 'AWS + Datadog',
        detail:
          'I worked on monitoring across 50+ AWS accounts and 3,000+ EC2 instances, bringing a large infrastructure estate into view.',
      },
      {
        label: 'Standardize',
        tool: 'Terraform + Python',
        detail:
          'I standardized observability and built infrastructure tooling that supported thousands of developers.',
      },
      {
        label: 'Recover services',
        tool: 'SLOs + recovery planning',
        detail:
          'My work included multi-region disaster recovery design for critical internal services, connecting visibility with recovery planning.',
      },
    ],
  },
  kinter: {
    name: 'Alloy / Kinter',
    category: 'AI ACCOUNTING / ENTERPRISE SOFTWARE',
    title: 'AI does the prep. People make the call.',
    description:
      'Kinter builds AI accountants that prepare reconciliations, accruals and journal entries, with human approval before posting to the ERP.',
    imageNote: 'Public product demos',
    imageSource: 'https://kinter.ai/',
    imageSourceLabel: 'Kinter product website',
    images: [
      {
        src: '/images/experience/kinter.png',
        width: 1280,
        height: 710,
        label: 'Review & approve',
        alt: 'Kinter’s public demo: a suggested journal entry with Accept Match and Reject Match controls.',
      },
      {
        src: '/images/experience/kinter-schedule.png',
        width: 1280,
        height: 710,
        label: 'Accounting schedules',
        alt: 'Kinter’s public demo showing a recurring journal entry and an amortization schedule.',
      },
    ],
    source: 'https://www.ycombinator.com/companies/kinter',
    sourceLabel: 'Kinter on Y Combinator · checked September 2026',
    snapshot: 'Reconciliations → review → approved journal entries',
    coverage: [
      {
        publisher: 'Y COMBINATOR',
        date: 'Company profile & launch',
        title: 'From Alloy integrations to AI accounting',
        description:
          'The founder describes the pivot to proactive accounting agents, ERP integrations, human approvals and audit trails.',
        url: 'https://www.ycombinator.com/companies/kinter',
      },
      {
        publisher: 'ANDREESSEN HOROWITZ',
        date: 'February 22, 2022 · Alloy history',
        title: 'a16z leads Alloy Automation’s Series A',
        description:
          'The investor’s announcement describes Alloy’s integration platform, before its later pivot to Kinter.',
        url: 'https://a16z.com/announcement/investing-in-alloy-automation/',
      },
      {
        publisher: 'KINTER / GREGG MOJICA',
        date: 'June 19, 2026',
        title: 'Why Kinter is building AI accountants',
        description:
          'The founder explains the move from integration infrastructure to agents that perform accounting work.',
        url: 'https://kinter.ai/blog/kill-the-co-pilot',
      },
    ],
    scales: [
      {
        label: 'Company context',
        value: '30',
        unit: 'team members listed by Y Combinator',
        period: 'PUBLIC DIRECTORY / CHECKED SEPTEMBER 2026',
        description:
          'Y Combinator lists Kinter as a San Francisco company founded in 2019, from its Winter 2020 batch. The founder describes the pivot from Alloy Automation to AI accounting.',
        dots: 30,
        legend:
          'Each dot represents one team member in the YC directory listing.',
      },
      {
        label: 'My engineering scope',
        value: 'HITL',
        unit: 'human-in-the-loop execution',
        period: 'MY CAREER SCOPE / 2025–PRESENT',
        description:
          'I architected an agent engine for general-ledger reconciliation with human approvals, durable SSE replay and execution audit trails.',
        dots: 3,
        legend:
          'Three controls: human approval, durable replay and audit trails.',
      },
    ],
    flow: [
      {
        label: 'Prepare a proposal',
        tool: 'LangGraph + Amazon Bedrock',
        detail:
          'My agent engineering work covers general-ledger reconciliation, model routing and prompt caching. The workflow prepares a proposal for review.',
      },
      {
        label: 'Ask a human',
        tool: 'Human-in-the-loop approval',
        detail:
          'Human approval is an explicit step in the agent workflow, keeping a person in control of the proposed action.',
      },
      {
        label: 'Preserve the record',
        tool: 'Durable SSE + audit trails',
        detail:
          'Durable event replay and execution audit trails make agent runs observable and preserve their history.',
      },
    ],
  },
};

const views = ['Product', 'Scale', 'My contribution'] as const;

export default function ExperienceExplorer({
  company,
  headingLevel = 4,
}: {
  company: keyof typeof stories;
  headingLevel?: 3 | 4;
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h4';
  const story = stories[company];
  const [view, setView] = useState(0);
  const [scope, setScope] = useState(0);
  const [step, setStep] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const metric = story.scales[scope];

  function navigateTabs(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % views.length
        : event.key === 'ArrowLeft'
          ? (index + views.length - 1) % views.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? views.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    setView(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      className={`experience-explorer explorer-${company}`}
      aria-label={`Explore ${story.name}`}
    >
      <div className="explorer-header">
        <span className="explorer-label">
          INSIDE {story.name.toUpperCase()}
        </span>
        <div
          className="explorer-tabs"
          role="tablist"
          aria-label={`${story.name} views`}
        >
          {views.map((label, index) => (
            <button
              key={label}
              type="button"
              role="tab"
              id={`${company}-tab-${index}`}
              aria-selected={view === index}
              aria-controls={`${company}-panel-${index}`}
              tabIndex={view === index ? 0 : -1}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              onClick={() => setView(index)}
              onKeyDown={(event) => navigateTabs(event, index)}
            >
              <span aria-hidden="true">0{index + 1}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div
        role="tabpanel"
        id={`${company}-panel-0`}
        aria-labelledby={`${company}-tab-0`}
        hidden={view !== 0}
        tabIndex={0}
      >
        <div className="explorer-product">
          <div className="explorer-gallery">
            <p className="explorer-label">
              {company === 'kinter' ? 'INSIDE THE PRODUCT' : 'INSIDE THE APP'} /{' '}
              {story.images.length} SCREENS
            </p>
            <ul
              className="explorer-gallery-strip"
              aria-label={`${story.name} product screenshots`}
            >
              {story.images.map((screen, index) => (
                <li className="explorer-gallery-item" key={screen.src}>
                  <Dialog>
                    <DialogTrigger
                      className="explorer-image"
                      aria-label={`Enlarge ${story.name}: ${screen.label}`}
                    >
                      <Image
                        unoptimized
                        src={screen.src}
                        alt={screen.alt}
                        width={screen.width}
                        height={screen.height}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="explorer-expand">
                        <Expand size={15} aria-hidden="true" />
                      </span>
                    </DialogTrigger>
                    <DialogContent className="experience-lightbox">
                      <DialogTitle>
                        {story.name} — {screen.label}
                      </DialogTitle>
                      <Image
                        unoptimized
                        src={screen.src}
                        alt={screen.alt}
                        width={screen.width}
                        height={screen.height}
                      />
                      <DialogDescription>
                        {story.imageNote}.{' '}
                        <a
                          href={story.imageSource}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {story.imageSourceLabel}
                        </a>
                        .
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                  <p className="explorer-screen-caption">
                    <span>0{index + 1}</span>
                    {screen.label}
                  </p>
                </li>
              ))}
            </ul>
            <p className="explorer-gallery-note">
              Select a screen to enlarge. Swipe or scroll to explore.
            </p>
          </div>
          <div className="explorer-product-copy">
            <p className="explorer-label">{story.category}</p>
            <Heading>{story.title}</Heading>
            <p>{story.description}</p>
            <p className="explorer-snapshot">{story.snapshot}</p>
          </div>
        </div>
      </div>
      <div
        role="tabpanel"
        id={`${company}-panel-1`}
        aria-labelledby={`${company}-tab-1`}
        hidden={view !== 1}
        tabIndex={0}
      >
        <div className="explorer-scale">
          <fieldset
            className="explorer-scope"
            aria-label={`${story.name} scale perspective`}
          >
            {story.scales.map((item, index) => (
              <button
                key={item.label}
                type="button"
                aria-pressed={scope === index}
                onClick={() => setScope(index)}
              >
                {item.label}
              </button>
            ))}
          </fieldset>
          <div
            className="explorer-scale-body"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="explorer-scale-copy" key={scope}>
              <p className="explorer-label">{metric.period}</p>
              <strong className="explorer-number">{metric.value}</strong>
              <Heading>{metric.unit}</Heading>
              <p>{metric.description}</p>
              <small>
                {scope === 0 ? (
                  <a
                    href={story.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source: {story.sourceLabel}
                  </a>
                ) : (
                  'Source: my professional experience, described in this chapter.'
                )}
              </small>
            </div>
            <figure className="explorer-dot-figure">
              <div
                className={`explorer-dots${metric.dots <= 8 ? ' explorer-dots-few' : ''}`}
                aria-hidden="true"
                key={metric.dots}
              >
                {Array.from({ length: metric.dots }, (_, index) => (
                  <span key={index} />
                ))}
              </div>
              <figcaption>{metric.legend}</figcaption>
            </figure>
          </div>
        </div>
      </div>
      <div
        role="tabpanel"
        id={`${company}-panel-2`}
        aria-labelledby={`${company}-tab-2`}
        hidden={view !== 2}
        tabIndex={0}
      >
        <div className="explorer-flow">
          <p className="explorer-label">MY CONTRIBUTION / SELECT A STEP</p>
          <fieldset
            className="explorer-steps"
            aria-label={`${story.name} engineering workflow`}
          >
            {story.flow.map((item, index) => (
              <button
                key={item.label}
                type="button"
                aria-pressed={step === index}
                onClick={() => setStep(index)}
              >
                <span className="explorer-step-number">0{index + 1}</span>
                <strong>{item.label}</strong>
                <span>{item.tool}</span>
              </button>
            ))}
          </fieldset>
          <div
            className="explorer-step-detail"
            aria-live="polite"
            aria-atomic="true"
          >
            <span aria-hidden="true">0{step + 1} /</span>
            <p key={step}>{story.flow[step].detail}</p>
          </div>
          <p className="explorer-flow-note">
            Illustrative sequence based on my work. Select each step to explore.
          </p>
        </div>
      </div>
      <section
        className="explorer-coverage"
        aria-labelledby={`${company}-coverage-title`}
      >
        <div className="explorer-coverage-heading">
          <Heading id={`${company}-coverage-title`}>
            In the news & engineering.
          </Heading>
          <span className="explorer-label">COMPANY CONTEXT</span>
        </div>
        <p className="explorer-coverage-note">
          Published company results and background. My contribution is described
          in this chapter.
        </p>
        <ul>
          {story.coverage.map((article) => (
            <li key={article.url}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <span className="explorer-publication">
                  <strong>{article.publisher}</strong>
                  <span>{article.date}</span>
                </span>
                <span className="explorer-article">
                  <strong>{article.title}</strong>
                  <span>{article.description}</span>
                </span>
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>
      <footer className="explorer-credit">
        <span>{story.imageNote} · checked September 2026</span>
        <a href={story.imageSource} target="_blank" rel="noopener noreferrer">
          {story.imageSourceLabel}
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </footer>
    </section>
  );
}
