export const caseStudies = [
  {
    slug: 'ifood-observability',
    company: 'iFood',
    visual: 'ifood' as const,
    jobId: 'ifood',
    chapterId: 'observability',
    discipline: 'SRE / DEVELOPER PLATFORMS / CLOUD ARCHITECTURE',
    title: 'Observability, developer platforms and cloud resilience at iFood',
    headline: 'The platform behind the people shipping.',
    description:
      'Iago Caldeira’s SRE work at iFood: Datadog adoption across 50+ AWS accounts, 40% lower MTTD, developer tooling and multi-region disaster recovery.',
    period: 'April 2022 – February 2025',
    role: 'Senior Site Reliability Engineer / DevOps / Cloud Architect',
    lead: 'I led observability adoption, built developer infrastructure and redesigned critical services for recovery. My scope at iFood spanned 50+ AWS accounts and 3,000+ EC2 instances: Kubernetes, delivery platforms, network architecture and the day-to-day work of keeping production running.',
    metrics: [
      { value: '40%', label: 'reduction in mean time to detect incidents' },
      {
        value: '5,000+',
        label: 'developers supported by the GitLab CI platform I operated',
      },
      {
        value: '10 min',
        label: 'recovery time objective for internal services',
      },
    ],
    sections: [
      {
        title: 'A shared view of production',
        area: 'OBSERVABILITY',
        overview:
          'Led the migration to Datadog across 50+ AWS accounts and 3,000+ EC2 instances, reducing MTTD by 40%. Standardized APM, distributed tracing and dashboards, and implemented centralized Logz.io logging for critical applications.',
        text: 'I led the migration from Grafana, Prometheus and Zabbix to Datadog. The work covered standardized dashboards, application performance monitoring, infrastructure metrics and distributed tracing. The observability migration reduced mean time to detect incidents by 40% and gave engineering teams a consistent approach to monitoring and incident response. I also implemented centralized Logz.io logging for critical applications.',
      },
      {
        title: 'Infrastructure for the people shipping software',
        area: 'DEVELOPER PLATFORMS',
        overview:
          'Operated GitLab CI for 5,000+ developers, built internal platforms in Python and Go, and managed Terraform, Terragrunt and Atlantis. Automated Linux operations with Chef and Ansible and maintained self-hosted Gradle and Nexus services.',
        text: 'I managed infrastructure as code with Terraform, Terragrunt and Atlantis and developed internal platforms in Python and Go. I operated GitLab CI for more than 5,000 developers and automated Linux operations with shell scripting, Chef and Ansible. I maintained self-hosted Gradle and Nexus services. I also managed Kubernetes environments integrated with Istio, Consul and Vault and joined the cloud infrastructure on-call rotation, including incident response and postmortems.',
      },
      {
        title: 'Recovery was part of the architecture',
        area: 'RESILIENCE & OPERATIONS',
        overview:
          'Refactored GitLab, Vault and Consul for multi-region disaster recovery: 99.9% SLO, 10-minute RTO and 15-minute RPO for these internal services. Operated production Kubernetes with Istio and supported on-call response and postmortems.',
        text: 'I refactored self-hosted GitLab, Vault and Consul for multi-region operation, resilience and disaster recovery. This work achieved a 99.9% SLO, a 10-minute recovery time objective and a 15-minute recovery point objective. I improved configuration, documentation, observability and alerting alongside the architecture. Those recovery objectives apply to the internal services covered by this project.',
      },
      {
        title: 'Cloud connectivity and security',
        area: 'NETWORK ARCHITECTURE',
        overview:
          'Redesigned network segmentation and centralized cloud connectivity with AWS Transit Gateway. Combined multi-account infrastructure automation with the configuration, documentation, monitoring and alerting needed to operate the platform.',
        text: 'I redesigned network segmentation and centralized connectivity using AWS Transit Gateway. This connected the network management work with the broader multi-account platform: infrastructure automation, operational visibility and cloud security were all part of my engineering scope.',
      },
    ],
    flow: [
      'Standardize telemetry',
      'Detect & investigate',
      'Respond & recover',
    ],
    focus:
      'Datadog · Kubernetes · Terraform · GitLab CI · Python · Go · Vault · Consul · AWS Transit Gateway',
  },
  {
    slug: 'picpay-kubernetes',
    company: 'PicPay',
    visual: 'picpay' as const,
    jobId: 'picpay',
    chapterId: 'platform-engineering',
    discipline: 'KUBERNETES / SITE RELIABILITY ENGINEERING',
    title: 'Kubernetes and KEDA autoscaling at PicPay',
    headline: 'From cloud foundations to the production floor.',
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
        area: 'EVENT-DRIVEN CAPACITY',
        overview:
          'Implemented KEDA autoscaling for RabbitMQ workloads, connecting Kubernetes capacity to queue demand. Reduced incidents related to delayed scaling by 50%.',
        text: 'I implemented KEDA for RabbitMQ workloads so Kubernetes processing capacity could respond to queue demand. This reduced incidents related to delayed scaling by 50%. The 50% result applies to incidents related to delayed scaling within this work’s scope.',
      },
      {
        title: 'Operating the Kubernetes estate',
        area: 'CLOUD & KUBERNETES',
        overview:
          'Managed infrastructure spanning 300+ Kubernetes clusters with Helm, Docker and Terraform. Worked across AWS VPC, IAM, Route 53, EC2 and EKS, including Auto Scaling and load balancing for availability.',
        text: 'My responsibilities covered Kubernetes infrastructure using Helm, Docker and Terraform, alongside AWS VPC, IAM, Route 53, EC2 and EKS. I worked with Auto Scaling and load balancing to support availability. The scope required both infrastructure changes and day-to-day operation of the services running on it.',
      },
      {
        title: 'Visibility during production incidents',
        area: 'OBSERVABILITY & ON-CALL',
        overview:
          'Improved New Relic monitoring and dashboards for critical applications and Linux infrastructure. Supported incident response through Kubernetes log analysis, EKS troubleshooting and metrics evaluation.',
        text: 'I enhanced monitoring with New Relic and built dashboards for critical applications and Linux infrastructure. During incidents, I supported Kubernetes log analysis, EKS troubleshooting and metrics evaluation. This connected capacity changes with the operational signals that engineers needed to understand service behavior.',
      },
      {
        title: 'Working with development teams',
        area: 'DELIVERY & DEVELOPER SUPPORT',
        overview:
          'Helped developers adopt DevOps practices across delivery, automation and infrastructure management. Connected day-to-day platform operation with the teams building and shipping services.',
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
    chapterId: 'ai-infrastructure',
    discipline: 'CLOUD / PLATFORM ENGINEERING / PRODUCTION AI',
    title: 'Production AI agents and cloud infrastructure at Kinter',
    headline: 'Cloud foundations. Production intelligence.',
    description:
      'Iago Caldeira’s engineering leadership at Alloy / Kinter: AWS and EKS, GitOps, observability and large-scale logging, production AI agents, Bedrock and MCP.',
    period: 'February 2025 – Present',
    role: 'Team Lead / Senior SRE / Platform & AI Engineer',
    lead: 'I lead cloud infrastructure and production AI engineering at Alloy / Kinter. My work spans AWS and EKS operations, GitOps, observability, large-scale logging and an agent engine I architected and shipped for general-ledger reconciliation. I work across the platform, the application and the systems connecting them.',
    metrics: [
      {
        value: '24/7',
        label: 'on-call rotation covering EKS, SQS, Kafka and Redis',
      },
      {
        value: 'TB',
        label:
          'terabytes of data and millions of events in the logging pipeline I built',
      },
      {
        value: 'LLMs',
        label: 'multi-model routing and inference cost optimization',
      },
    ],
    sections: [
      {
        title: 'Cloud infrastructure and delivery',
        area: 'PLATFORM & TECHNICAL LEADERSHIP',
        overview:
          'Manage AWS and EKS infrastructure supporting clients including Amazon, Best Buy and UPS, with 24/7 on-call across EKS, SQS, Kafka and Redis. Implemented Argo CD and Helm GitOps and led Terraform, Terragrunt and Atlantis adoption.',
        text: 'I manage and scale AWS infrastructure and EKS clusters supporting clients including Amazon, Best Buy and UPS. I participate in a 24/7 on-call rotation covering EKS, SQS, Kafka and Redis. I implemented GitOps with Argo CD, Helm, custom charts and GitLab CI/CD, and led adoption of Terraform, Terragrunt and Atlantis. Cloud architecture, IAM and AWS/GCP security sit alongside the AI application work in my engineering scope.',
      },
      {
        title: 'Observability and a logging pipeline at scale',
        area: 'TELEMETRY & DATA SYSTEMS',
        overview:
          'Designed Datadog, Prometheus and Grafana monitoring for infrastructure, APM and incidents. Built an Elasticsearch-based pipeline processing millions of events and terabytes of data, plus Go and Python APIs for paginated log retrieval.',
        text: 'I designed monitoring with Datadog, Prometheus and Grafana for infrastructure health, application performance and incident response. I also built a logging pipeline processing millions of events and terabytes of data, using Elasticsearch, Grafana and Kibana, and developed Go and Python APIs for paginated log retrieval.',
      },
      {
        title: 'An agent engine, from architecture to production',
        area: 'APPLICATION & AI ENGINEERING',
        overview:
          'Architected and shipped the general-ledger reconciliation agent engine with LangChain and LangGraph. Built orchestration, human approvals, durable SSE replay and audit trails in Go, Python and TypeScript, integrating services through REST and gRPC.',
        text: 'I built multi-agent orchestration with LangChain and LangGraph, using Go, Python and TypeScript with REST and gRPC integrations. The engine includes human-in-the-loop approval workflows, SSE streaming with durable replay and an expandable execution audit trail. I built production agents with Anthropic Claude through Amazon Bedrock and the Anthropic API, including tool calling, prompt engineering and retrieval-augmented generation.',
      },
      {
        title: 'Model routing, integrations and cost',
        area: 'LLM OPERATIONS & MCP',
        overview:
          'Designed multi-LLM routing on Amazon Bedrock and reduced inference costs through prompt caching and model selection. Lead MCP architecture, integrations and rollout strategy, with work across Claude, RAG, Vertex AI and cloud security.',
        text: 'I designed multi-LLM routing to select models by use case and reduced inference costs through prompt caching and model selection. I lead Model Context Protocol (MCP) architecture, integrations and rollout strategy across distributed services and AI tools. My work includes Claude through Amazon Bedrock and the Anthropic API, tool calling, RAG, Vertex AI, IAM and AWS/GCP cloud security.',
      },
    ],
    flow: [
      'Provision & operate',
      'Observe & investigate',
      'Orchestrate & integrate',
    ],
    focus:
      'AWS · EKS · Argo CD · Terraform · Datadog · Elasticsearch · LangGraph · Bedrock · MCP · Go · Python · TypeScript',
  },
];
