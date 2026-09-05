import { linkedInUrl } from './site-config.ts';

export const experience = [
  {
    title: 'Alloy / Kinter',
    date: '2025 — PRESENT',
    role: 'Team Lead / SRE / AI Engineer',
    summary:
      'From cloud foundations to production AI agents. Building the systems behind the intelligence.',
    detail:
      'Lead AWS infrastructure, Kubernetes and observability. Architect AI agent workflows with human approvals, durable streaming and audit trails. Build with Go, Python, TypeScript, LangGraph and AWS Bedrock.',
    stack: 'AWS · K8S · GO · AI AGENTS',
    demo: false,
  },
  {
    title: 'iFood',
    date: '2022 — 2025',
    role: 'Senior SRE / Cloud Architect',
    summary:
      'Reliable infrastructure at a scale of millions. Better visibility, safer delivery, faster recovery.',
    detail:
      'Standardized observability across 50+ AWS accounts and 3,000+ EC2 instances. Built infrastructure tooling for thousands of developers and designed multi-region recovery for critical internal services.',
    stack: 'TERRAFORM · DATADOG · PYTHON',
    demo: false,
  },
  {
    title: 'Accenture',
    date: 'JAN — APR 2022',
    role: 'Senior SRE / DevOps Engineer',
    summary:
      'Safer, faster CI/CD for a banking payment processor. Security built into the delivery pipeline.',
    detail:
      'Refactored CI/CD for a banking payment processor. Integrated SAST and DAST, automated operations, and built observability dashboards with Prometheus and Grafana.',
    stack: 'JENKINS · GROOVY · AWS',
    demo: false,
  },
  {
    title: 'PicPay',
    date: '2021 — 2022',
    role: 'SRE / DevOps Engineer',
    summary:
      'Keeping payments moving. Kubernetes operations and event-driven autoscaling.',
    detail:
      'Operated infrastructure spanning 300+ Kubernetes clusters. Implemented KEDA autoscaling for RabbitMQ, improved visibility with New Relic, and supported production incident response.',
    stack: 'KUBERNETES · KEDA · AWS',
    demo: false,
  },
  {
    title: 'Prodap',
    date: 'MAY — OCT 2021',
    role: 'SRE / DevOps Engineer',
    summary:
      'A new home in the cloud. Moving infrastructure from AWS to GCP with automated delivery.',
    detail:
      'Migrated infrastructure from AWS to Google Cloud. Built development, QA and production environments, automated CI/CD, and managed infrastructure using Terraform, Kubernetes and Helm.',
    stack: 'GCP · TERRAFORM · GITLAB',
    demo: false,
  },
  {
    title: 'Independent',
    date: '2018 — 2021',
    role: 'DevOps / Cloud Architect',
    summary:
      'The first levels. Helping teams ship, improve cloud costs, and see what their systems are doing.',
    detail:
      'Consulted on AWS architecture, infrastructure as code, CI/CD and observability. Also supported Linux infrastructure and delivery pipelines for municipal cultural institutions in 2019–2020.',
    stack: 'LINUX · AWS · AUTOMATION',
    demo: false,
  },
];
export const projects = [
  {
    title: 'Signal Tower',
    date: 'SIDE QUEST 01',
    role: 'Fictional project concept',
    summary:
      'An observability cockpit that turns noisy signals into clear incident timelines.',
    detail:
      'A fictional observability cockpit combining service health, distributed traces and incident timelines in one place.',
    stack: 'OTEL · GRAFANA · GO',
    demo: true,
  },
  {
    title: 'Cloud Atlas',
    date: 'SIDE QUEST 02',
    role: 'Fictional project concept',
    summary:
      'A self-service launchpad for repeatable infrastructure, with sensible guardrails built in.',
    detail:
      'A fictional developer platform for provisioning repeatable cloud environments with policy checks and cost estimates.',
    stack: 'TERRAFORM · K8S · PYTHON',
    demo: true,
  },
  {
    title: 'Agent Workshop',
    date: 'SIDE QUEST 03',
    role: 'Fictional project concept',
    summary:
      'A small laboratory for AI agents, human approvals, and workflows you can actually inspect.',
    detail:
      'A fictional agent workbench for inspecting tool calls, approving actions and replaying durable workflows.',
    stack: 'LANGGRAPH · BEDROCK · TS',
    demo: true,
  },
];
export const profile = [
  {
    label: 'HELLO, WORLD.',
    title: 'I’M IAGO.',
    text: 'I make complex systems reliable, observable, and a little easier to work with. SRE by trade. Builder by instinct.',
    footer: 'BUILDING SINCE 2018',
  },
  {
    label: 'THE MAIN QUEST',
    title: 'SYSTEMS + PEOPLE.',
    text: 'Cloud platforms. Developer experience. Production AI. I like connecting the pieces — and helping teams own what they build.',
    footer: 'SRE / PLATFORM / AI',
  },
  {
    label: 'HOME BASE',
    title: 'BELO HORIZONTE.',
    text: 'Brazil-based. Native Portuguese. Advanced English. Information Systems at IFMG. Curious by default.',
    footer: 'BRAZIL / UTC−3',
  },
];
export const toolkit = [
  {
    title: 'CLOUD & PLATFORM',
    items: [
      'AWS / Google Cloud',
      'Kubernetes / Helm',
      'Terraform / Terragrunt',
      'ArgoCD / GitLab CI',
      'Linux / Vault / Consul',
    ],
  },
  {
    title: 'OBSERVABILITY',
    items: [
      'Datadog / New Relic',
      'Prometheus / Grafana',
      'Elasticsearch / Logz.io',
      'Incident response',
      'SLOs / Recovery design',
    ],
  },
  {
    title: 'CODE & AI',
    items: [
      'Go / Python / TypeScript',
      'LangChain / LangGraph',
      'AWS Bedrock / Vertex AI',
      'MCP / REST / gRPC',
      'Human-in-the-loop agents',
    ],
  },
];
export const resumeText = `IAGO NEVES CALDEIRA\nSenior Site Reliability Engineer / Platform Engineer / AI Engineer\nBelo Horizonte, Brazil · Latin America (LATAM) · UTC−3\nLinkedIn: ${linkedInUrl}\n\nPROFILE\nSenior SRE, Platform Engineer and AI Engineer. AWS and Google Cloud Platform (GCP), Kubernetes, DevOps, observability and production AI infrastructure.\n\nEXPERIENCE\n\n${experience.map((job) => `${job.title} | ${job.date}\n${job.role}\n${job.detail}`).join('\n\n')}\n\nTOOLKIT\n\n${toolkit.map((group) => `${group.title}: ${group.items.join(', ')}`).join('\n')}\n\nEDUCATION\nInformation Systems, IFMG (studies listed in supplied resume)\n\nLANGUAGES\nPortuguese: native / English: advanced\n\nFICTIONAL PROJECT EXAMPLES\n${projects.map((project) => `${project.title}: ${project.detail}`).join('\n')}\n`;
