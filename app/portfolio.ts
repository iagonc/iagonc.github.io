import { linkedInUrl } from './site-config.ts';
import { technicalToolkit } from './technical-toolkit.ts';

// Career facts and outcomes supplied by the portfolio owner, September 2026.
// Compact fields support the handheld; full fields drive the professional resume.
export const experience = [
  {
    id: 'alloy-kinter',
    title: 'Alloy / Kinter',
    date: '2025 — PRESENT',
    period: 'February 2025 – Present',
    role: 'Team Lead / SRE / AI Engineer',
    fullRole:
      'Team Lead / Senior Site Reliability Engineer / Platform & AI Engineer',
    summary:
      'Leading cloud infrastructure and production AI agent engineering.',
    detail:
      'Lead cloud infrastructure and production AI engineering: AWS and EKS operations, GitOps delivery, observability and large-scale logging. Architected and shipped the reconciliation agent engine, with model routing, durable streaming and MCP integrations.',
    highlights: [
      'Manage and scale AWS infrastructure and EKS clusters supporting clients including Amazon, Best Buy and UPS. Participate in a 24/7 on-call rotation for infrastructure including EKS, SQS, Kafka and Redis.',
      'Architected and shipped an AI agent engine for general-ledger reconciliation SaaS. Built multi-agent orchestration with LangChain and LangGraph, human-in-the-loop approval workflows, SSE streaming with durable replay and an expandable execution audit trail, using Go, Python, TypeScript, REST and gRPC.',
      'Designed the observability stack with Datadog, Prometheus and Grafana, including dashboards for infrastructure monitoring, application performance and incident response.',
      'Implemented Kubernetes GitOps workflows with Argo CD, Helm, custom Helm charts and GitLab CI/CD. Led adoption of Terraform, Terragrunt and Atlantis for reproducible cloud environments.',
      'Lead Model Context Protocol (MCP) architecture, integrations and rollout strategy for standardized communication across distributed services and AI tools.',
      'Built a logging pipeline processing millions of events and terabytes of data with Elasticsearch, Grafana and Kibana. Developed Go and Python APIs for paginated log retrieval at scale.',
      'Designed multi-LLM routing on Amazon Bedrock and reduced inference costs through prompt caching and model selection. Work across Amazon Bedrock, Vertex AI, IAM and AWS/GCP cloud security.',
      'Built production agents and agentic workflows with Anthropic Claude through Amazon Bedrock and the Anthropic API, including tool calling, prompt engineering, retrieval-augmented generation (RAG) and MCP integrations.',
    ],
    technologies: [
      'AWS',
      'EKS',
      'Kubernetes',
      'Terraform',
      'Terragrunt',
      'Atlantis',
      'Linux',
      'Go',
      'Python',
      'TypeScript',
      'Datadog',
      'Prometheus',
      'Grafana',
      'Elasticsearch',
      'Kibana',
      'Vault',
      'Consul',
      'Argo CD',
      'Helm',
      'GitLab CI/CD',
      'SQS',
      'Kafka',
      'Redis',
      'LangChain',
      'LangGraph',
      'Amazon Bedrock',
      'Vertex AI',
      'Claude',
      'Anthropic API',
      'MCP',
      'REST',
      'gRPC',
      'SSE',
    ],
    stack: 'AWS · K8S · GO · AI AGENTS',
    demo: false,
  },
  {
    id: 'ifood',
    title: 'iFood',
    date: '2022 — 2025',
    period: 'April 2022 – February 2025',
    role: 'Senior SRE / Cloud Architect',
    fullRole: 'Senior Site Reliability Engineer / DevOps / Cloud Architect',
    summary:
      'Observability, developer platforms and disaster recovery across a large AWS estate.',
    detail:
      'Standardized observability across 50+ AWS accounts and 3,000+ EC2 instances, reducing mean time to detect incidents by 40%. Built infrastructure tooling for 5,000+ developers and designed multi-region recovery for critical internal services.',
    highlights: [
      'Led migration from Grafana, Prometheus and Zabbix to Datadog across 50+ AWS accounts and 3,000+ EC2 instances. Standardized dashboards, application performance monitoring (APM), infrastructure metrics and distributed tracing, reducing mean time to detect (MTTD) by 40%.',
      'Managed infrastructure as code with Terraform, Terragrunt and Atlantis. Developed Python and Go platforms to improve developer experience and operated GitLab CI for 5,000+ developers.',
      'Managed Kubernetes infrastructure integrated with Istio, Consul and Vault in a high-traffic production environment. Participated in the cloud infrastructure on-call rotation, incident response and postmortem analysis.',
      'Refactored self-hosted GitLab, Vault and Consul for multi-region resilience and disaster recovery. Achieved a 99.9% service-level objective, a 10-minute recovery time objective (RTO) and a 15-minute recovery point objective (RPO), with improved documentation, observability and alerting.',
      'Implemented centralized logging with Logz.io for critical applications and supported self-hosted infrastructure tools including Chef, Gradle and Nexus.',
      'Redesigned network segmentation and centralized cloud connectivity with AWS Transit Gateway to improve security and network management.',
      'Automated Linux operations with Python, shell scripting, Go, Chef and Ansible across the multi-account AWS estate.',
    ],
    technologies: [
      'AWS',
      'EC2',
      'Kubernetes',
      'Terraform',
      'Terragrunt',
      'Atlantis',
      'Linux',
      'Python',
      'Go',
      'Shell scripting',
      'Datadog',
      'Logz.io',
      'Prometheus',
      'Grafana',
      'Zabbix',
      'Istio',
      'Vault',
      'Consul',
      'Chef',
      'Ansible',
      'Gradle',
      'Nexus',
      'GitLab CI/CD',
      'AWS Transit Gateway',
    ],
    stack: 'TERRAFORM · DATADOG · PYTHON',
    demo: false,
  },
  {
    id: 'accenture',
    title: 'Accenture',
    date: 'JAN — APR 2022',
    period: 'January 2022 – April 2022',
    role: 'Senior SRE / DevOps Engineer',
    fullRole: 'Senior Site Reliability Engineer / DevOps Engineer',
    summary: 'CI/CD and delivery security for a banking payment processor.',
    detail:
      'Refactored CI/CD for a banking payment processor, improving pipeline performance by 30%. Integrated SAST and DAST, automated operations, and built observability dashboards with Prometheus and Grafana.',
    highlights: [
      'Refactored the CI/CD stack for a banking payment processor, integrating static and dynamic application security testing (SAST and DAST) and improving pipeline performance by 30%.',
      'Implemented CI/CD pipelines with Jenkins and Groovy, focused on continuous testing, and worked with GitLab CI. Built operational automation with Python and shell scripting.',
      'Developed Prometheus and Grafana dashboards for observability of the delivery environment.',
    ],
    technologies: [
      'AWS',
      'Terraform',
      'Jenkins',
      'Groovy',
      'GitLab CI/CD',
      'Python',
      'Shell scripting',
      'Prometheus',
      'Grafana',
      'SAST',
      'DAST',
    ],
    stack: 'JENKINS · GROOVY · AWS',
    demo: false,
  },
  {
    id: 'picpay',
    title: 'PicPay',
    date: '2021 — 2022',
    period: 'October 2021 – January 2022',
    role: 'SRE / DevOps Engineer',
    fullRole: 'Site Reliability Engineer / DevOps Engineer',
    summary: 'Kubernetes operations and event-driven autoscaling for payments.',
    detail:
      'Operated infrastructure spanning 300+ Kubernetes clusters. Implemented KEDA autoscaling for RabbitMQ, reducing incidents related to delayed scaling by 50%, and improved visibility with New Relic.',
    highlights: [
      'Managed infrastructure spanning more than 300 Kubernetes clusters for a Brazilian digital payments platform, using Helm, Docker and Terraform.',
      'Implemented KEDA event-driven autoscaling for RabbitMQ workloads, reducing incidents related to delayed scaling by 50%.',
      'Administered AWS VPC, IAM, Route 53, EC2 and EKS, including Auto Scaling and load balancing for high availability.',
      'Built New Relic monitoring and dashboards for critical applications and Linux infrastructure. Supported incident response through Kubernetes log analysis, EKS troubleshooting and metrics analysis.',
      'Supported development teams in adopting DevOps practices for delivery, automation and infrastructure ownership.',
    ],
    technologies: [
      'Kubernetes',
      'KEDA',
      'RabbitMQ',
      'Helm',
      'Docker',
      'Terraform',
      'AWS',
      'EKS',
      'EC2',
      'VPC',
      'IAM',
      'Route 53',
      'New Relic',
      'Linux',
    ],
    stack: 'KUBERNETES · KEDA · AWS',
    demo: false,
  },
  {
    id: 'prodap',
    title: 'Prodap',
    date: 'MAY — OCT 2021',
    period: 'May 2021 – October 2021',
    role: 'SRE / DevOps Engineer',
    fullRole: 'Site Reliability Engineer / DevOps Engineer',
    summary:
      'Cloud migration from AWS to Google Cloud with automated delivery.',
    detail:
      'Migrated infrastructure from AWS to Google Cloud. Built development, QA and production environments, automated CI/CD, and managed infrastructure using Terraform, Kubernetes and Helm.',
    highlights: [
      'Migrated the startup’s infrastructure from AWS to Google Cloud Platform (GCP), focusing on service continuity during the transition.',
      'Built and improved development, QA and production environments and automated delivery with GitLab CI/CD, Docker, Kubernetes, Helm and Google Cloud tools.',
      'Developed cloud infrastructure with Terraform, Ansible and Ambassador, and automated operations with Python and shell scripting.',
      'Monitored GCP infrastructure with Prometheus, Grafana and Datadog.',
    ],
    technologies: [
      'Google Cloud Platform (GCP)',
      'AWS',
      'GitLab CI/CD',
      'Docker',
      'Kubernetes',
      'Helm',
      'Terraform',
      'Ansible',
      'Ambassador',
      'Python',
      'Shell scripting',
      'Prometheus',
      'Grafana',
      'Datadog',
    ],
    stack: 'GCP · TERRAFORM · GITLAB',
    demo: false,
  },
  {
    id: 'independent',
    title: 'Independent / Freelance',
    date: '2018 — 2021',
    period: 'January 2018 – February 2021',
    role: 'DevOps / Cloud Architect',
    fullRole: 'DevOps Consultant / Cloud Architect',
    summary:
      'Cloud architecture, delivery pipelines and infrastructure consulting.',
    detail:
      'Consulted on AWS architecture, infrastructure as code, CI/CD, cloud security and cost optimization. Developed Prometheus and Grafana observability and optimized Kubernetes environments.',
    highlights: [
      'Advised startups on AWS cloud architecture, Terraform infrastructure as code and CI/CD improvements across delivery tools.',
      'Improved AWS security and cloud costs for startup clients.',
      'Developed monitoring with Prometheus and Grafana and optimized Kubernetes infrastructure using Helm and Docker.',
    ],
    technologies: [
      'AWS',
      'Kubernetes',
      'Helm',
      'Docker',
      'Terraform',
      'CI/CD',
      'Prometheus',
      'Grafana',
    ],
    stack: 'LINUX · AWS · AUTOMATION',
    demo: false,
  },
  {
    id: 'city-hall',
    title: 'City Hall',
    date: '2019 — 2020',
    period: 'August 2019 – January 2020',
    role: 'SRE / DevOps Engineer',
    fullRole: 'Site Reliability Engineer / DevOps Engineer',
    summary:
      'Infrastructure and technical support for municipal cultural institutions.',
    detail:
      'Maintained Linux, Python, shell scripts and Docker infrastructure across on-premises and cloud environments. Supported municipal cultural institutions and built GitLab CI/CD pipelines.',
    highlights: [
      'Maintained application code and infrastructure with Linux, shell scripting, Python and Docker across on-premises and cloud environments.',
      'Provided infrastructure support and troubleshooting for municipal cultural institutions.',
      'Built GitLab CI/CD pipelines and worked with AWS, Kubernetes, Helm and Terraform.',
    ],
    technologies: [
      'Linux',
      'Python',
      'Shell scripting',
      'Docker',
      'GitLab CI/CD',
      'AWS',
      'Kubernetes',
      'Helm',
      'Terraform',
    ],
    stack: 'LINUX · PYTHON · GITLAB',
    demo: false,
  },
];

export const professionalSummary =
  'Senior Site Reliability Engineer, Observability Engineer and Platform Engineer based in Belo Horizonte, Brazil, Latin America (LATAM). Engineering experience since 2018 across fintech, food delivery and enterprise software, with technical leadership at Alloy / Kinter. I build AWS and Google Cloud infrastructure, developer platforms and production AI systems with Go, Python and TypeScript. My work spans DevOps, cloud architecture, cloud security, MLOps, AIOps and LLMOps, including Kubernetes operations, incident response and AI agent orchestration.';

export const education = {
  institution: 'Instituto Federal de Minas Gerais (IFMG)',
  program: 'Information Systems',
  period: '2018 – Present',
  status: 'Bachelor’s studies in progress',
  detail:
    'Coursework in programming, databases, web development, software engineering, artificial intelligence and algorithm design. Team projects and programming competitions using C++.',
};

// Names provided by the owner; no unconfirmed level, validity date or ID is added.
export const credentials = [
  'HashiCorp Certified: Terraform Associate',
  'AWS Solutions Architect',
  'AWS Certified Cloud Practitioner',
  'Architecting on AWS — Amazon Web Services training',
  'University of Cambridge — Council of Europe Level B1',
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
export const resumeText = `IAGO NEVES CALDEIRA
Senior Site Reliability Engineer (SRE) / Observability Engineer / Platform Engineer
DevOps / Cloud Architecture / AI Infrastructure / MLOps / AIOps
Belo Horizonte, Minas Gerais, Brazil · Latin America (LATAM) · UTC−3
LinkedIn: ${linkedInUrl}
Portfolio: https://iagonc.github.io/
Full resume: https://iagonc.github.io/resume

PROFILE
${professionalSummary}

WORK EXPERIENCE

${experience.map((job) => `${job.title} | ${job.period}\n${job.fullRole}\n${job.highlights.map((point) => `- ${point}`).join('\n')}\nTechnologies: ${job.technologies.join(', ')}`).join('\n\n')}

TECHNICAL TOOLKIT

${technicalToolkit.map((group) => `${group.title}: ${group.items.join(', ')}`).join('\n')}

EDUCATION
${education.institution} — ${education.program}
${education.period} | ${education.status}
${education.detail}

CERTIFICATIONS & PROFESSIONAL TRAINING
${credentials.map((credential) => `- ${credential}`).join('\n')}

LANGUAGES
Portuguese: native / English: advanced
`;
