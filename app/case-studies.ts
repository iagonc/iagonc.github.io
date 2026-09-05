export const caseStudies = [
  {
    slug: 'ifood-observability',
    company: 'iFood',
    visual: 'ifood' as const,
    jobId: 'ifood',
    discipline: 'OBSERVABILITY / PLATFORM ENGINEERING',
    title: 'Observability across 50+ AWS accounts at iFood',
    headline: 'Finding the signal. Planning the recovery.',
    description:
      'Iago Caldeira’s SRE work at iFood: Datadog adoption across 50+ AWS accounts, 40% lower MTTD, developer tooling and multi-region disaster recovery.',
    period: 'April 2022 – February 2025',
    role: 'Senior Site Reliability Engineer / DevOps / Cloud Architect',
    lead: 'I worked across observability, developer infrastructure and disaster recovery at iFood. The estate included more than 50 AWS accounts and 3,000 EC2 instances, with GitLab CI supporting over 5,000 developers.',
    metrics: [
      { value: '40%', label: 'reduction in mean time to detect incidents' },
      { value: '50+', label: 'AWS accounts in the observability scope' },
      {
        value: '10 min',
        label: 'recovery time objective for internal services',
      },
    ],
    sections: [
      {
        title: 'A shared view of production',
        text: 'I led the migration from Grafana, Prometheus and Zabbix to Datadog. The work covered standardized dashboards, application performance monitoring, infrastructure metrics and distributed tracing. The observability migration reduced mean time to detect incidents by 40% and gave engineering teams a consistent approach to monitoring and incident response. I also implemented centralized Logz.io logging for critical applications.',
      },
      {
        title: 'Infrastructure for the people shipping software',
        text: 'I managed infrastructure as code with Terraform, Terragrunt and Atlantis and developed internal platforms in Python and Go. I operated GitLab CI for more than 5,000 developers and automated Linux operations with shell scripting, Chef and Ansible. I also managed Kubernetes environments integrated with Istio, Consul and Vault and joined the cloud infrastructure on-call rotation, including incident response and postmortems.',
      },
      {
        title: 'Recovery was part of the architecture',
        text: 'I refactored self-hosted GitLab, Vault and Consul for multi-region operation, resilience and disaster recovery. This work achieved a 99.9% SLO, a 10-minute recovery time objective and a 15-minute recovery point objective. I improved configuration, documentation, observability and alerting alongside the architecture. Those recovery objectives apply to the internal services covered by this project.',
      },
      {
        title: 'Cloud connectivity and security',
        text: 'I redesigned network segmentation and centralized connectivity using AWS Transit Gateway. This connected the network management work with the broader multi-account platform: infrastructure automation, operational visibility and cloud security were all part of my engineering scope.',
      },
    ],
    flow: [
      'Standardize telemetry',
      'Detect & investigate',
      'Respond & recover',
    ],
    focus:
      'Datadog · APM · Distributed tracing · Terraform · AWS Transit Gateway · SLO / RTO / RPO',
  },
  {
    slug: 'picpay-kubernetes',
    company: 'PicPay',
    visual: 'picpay' as const,
    jobId: 'picpay',
    discipline: 'KUBERNETES / SITE RELIABILITY ENGINEERING',
    title: 'Kubernetes and KEDA autoscaling at PicPay',
    headline: 'Capacity that follows the queue.',
    description:
      'Iago Caldeira’s SRE work at PicPay: 300+ Kubernetes clusters, RabbitMQ autoscaling with KEDA and a 50% reduction in incidents related to delayed scaling.',
    period: 'October 2021 – January 2022',
    role: 'Site Reliability Engineer / DevOps Engineer',
    lead: 'At PicPay, I helped operate infrastructure spanning more than 300 Kubernetes clusters. My work combined event-driven autoscaling, AWS operations, observability and incident response for a digital payments platform in Brazil.',
    metrics: [
      {
        value: '300+',
        label: 'Kubernetes clusters in the infrastructure scope',
      },
      { value: '50%', label: 'fewer incidents related to delayed scaling' },
      { value: 'KEDA', label: 'event-driven autoscaling for RabbitMQ' },
    ],
    sections: [
      {
        title: 'Scaling around pending work',
        text: 'I implemented KEDA for RabbitMQ workloads so Kubernetes processing capacity could respond to queue demand. This reduced incidents related to delayed scaling by 50%. The 50% result applies to incidents related to delayed scaling within this work’s scope.',
      },
      {
        title: 'Operating the Kubernetes estate',
        text: 'My responsibilities covered Kubernetes infrastructure using Helm, Docker and Terraform, alongside AWS VPC, IAM, Route 53, EC2 and EKS. I worked with Auto Scaling and load balancing to support availability. The scope required both infrastructure changes and day-to-day operation of the services running on it.',
      },
      {
        title: 'Visibility during production incidents',
        text: 'I enhanced monitoring with New Relic and built dashboards for critical applications and Linux infrastructure. During incidents, I supported Kubernetes log analysis, EKS troubleshooting and metrics evaluation. This connected capacity changes with the operational signals that engineers needed to understand service behavior.',
      },
      {
        title: 'Working with development teams',
        text: 'I supported developers in adopting DevOps practices for automation, collaboration and infrastructure management. My role combined cluster operations and delivery tooling with production incident support. The work reinforced my practice of connecting platform operations, application visibility and developer ownership.',
      },
    ],
    flow: ['RabbitMQ demand', 'KEDA autoscaling', 'Kubernetes workers'],
    focus:
      'Kubernetes · KEDA · RabbitMQ · AWS EKS · Helm · Terraform · New Relic',
  },
  {
    slug: 'kinter-ai-infrastructure',
    company: 'Alloy / Kinter',
    visual: 'kinter' as const,
    jobId: 'alloy-kinter',
    discipline: 'AI INFRASTRUCTURE / TECHNICAL LEADERSHIP',
    title: 'Production AI agents and cloud infrastructure at Kinter',
    headline: 'Agents that people can supervise.',
    description:
      'Iago Caldeira’s AI platform work at Alloy / Kinter: LangGraph agents, human approvals, durable SSE replay, Claude, Amazon Bedrock, MCP and observability.',
    period: 'February 2025 – Present',
    role: 'Team Lead / Senior SRE / Platform & AI Engineer',
    lead: 'I lead cloud infrastructure and AI agent engineering at Alloy / Kinter. I architected and shipped an agent engine for general-ledger reconciliation, bringing orchestration, human approvals, durable streaming and an execution audit trail into one production workflow.',
    metrics: [
      { value: 'HITL', label: 'human-in-the-loop approval workflows' },
      { value: 'SSE', label: 'streaming with durable replay' },
      { value: 'MCP', label: 'standardized model and tool integrations' },
    ],
    sections: [
      {
        title: 'An agent engine around the financial workflow',
        text: 'I built multi-agent orchestration with LangChain and LangGraph, using Go, Python and TypeScript with REST and gRPC integrations. The engine includes human-in-the-loop approval workflows, SSE streaming with durable replay and an expandable execution audit trail. These capabilities let people supervise actions, follow execution and inspect its history.',
      },
      {
        title: 'Model integrations and inference costs',
        text: 'I built production agents with Anthropic Claude through Amazon Bedrock and the Anthropic API. The work includes tool and function calling, prompt engineering, retrieval-augmented generation and MCP integrations. I designed multi-LLM routing to select models by use case and reduced inference costs through prompt caching and other optimizations. My cloud AI work also includes Vertex AI.',
      },
      {
        title: 'The platform supporting the agents',
        text: 'I manage and scale AWS infrastructure and EKS clusters and participate in a 24/7 on-call rotation covering infrastructure including SQS, Kafka and Redis. I implemented GitOps with Argo CD, Helm and custom charts, and led adoption of Terraform, Terragrunt and Atlantis. Cloud architecture, IAM and AWS/GCP security sit alongside the AI application work in my engineering scope.',
      },
      {
        title: 'Observability from infrastructure to execution',
        text: 'I designed monitoring with Datadog, Prometheus and Grafana for infrastructure health, application performance and incident response. I also built a logging pipeline processing millions of events and terabytes of data, using Elasticsearch and Kibana, and developed Go and Python APIs for paginated log retrieval. I lead MCP architecture, adoption and rollout strategy across integrations.',
      },
    ],
    flow: ['Orchestrate & stream', 'Human approval', 'Execute & audit'],
    focus:
      'LangGraph · LangChain · Claude · Amazon Bedrock · MCP · RAG · Go · Python · TypeScript',
  },
];
