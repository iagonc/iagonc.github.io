# Search positioning research — Iago Caldeira

Reviewed 5 September 2026. Goal: help relevant visitors discover the portfolio and continue to Iago's verified LinkedIn profile. This is a keyword prioritization hypothesis grounded in résumé evidence and current industry/hiring signals, **not measured Google search volume or a ranking forecast**.

## Recommended positioning

Lead with **Iago Caldeira — Senior Site Reliability Engineer (SRE), Platform & AI Engineer**. Use the full name, Iago Neves Caldeira, naturally in the professional introduction. Keep observability prominent because the résumé contains unusually concrete operating scale. Explain AI work as production agent engineering: approvals, replay, auditability and infrastructure, rather than a broad list of fashionable AI labels.

Current title: `Iago Caldeira | Senior SRE, Platform & AI Engineer in LATAM`.

Suggested short introduction: “I’m Iago Neves Caldeira, a Senior Site Reliability Engineer based in Belo Horizonte, Brazil. I build reliable AWS and Kubernetes platforms, observability systems and production AI agents with human approval workflows.” This is editorial positioning inferred from the supplied résumé, not an independent employment verification.

## Keyword priorities and proof

| Priority / intent | Candidate language | Evidence in supplied résumé | Useful visible content |
| --- | --- | --- | --- |
| First: identify the person | Iago Caldeira; Iago Neves Caldeira; Iago Caldeira SRE; Iago Caldeira LinkedIn | Exact name and SRE roles | Name, concise introduction and a direct LinkedIn profile link |
| First: evaluate professional fit | Senior Site Reliability Engineer; Senior SRE; Platform Engineer; Observability Engineer | Repeated roles at Alloy/Kinter, iFood, Accenture, PicPay and Prodap | Job history with dates, responsibilities and specific operating scale |
| First: verify technical experience | AWS; Kubernetes; Amazon EKS; Terraform; infrastructure as code; GitOps; Argo CD | AWS/EKS, Terraform/Terragrunt/Atlantis and GitOps work | Infrastructure/platform section with a relevant case study |
| First: evaluate reliability depth | Observability; Datadog; Prometheus; Grafana; incident response; distributed tracing; SLOs; disaster recovery | iFood observability across 50+ AWS accounts / 3,000+ EC2 instances; multi-region recovery | Explain the observability migration, reliability problem and scope |
| Second: production AI specialization | AI Engineer; AI agent engineering; agentic workflows; LangGraph; LangChain; AWS Bedrock; human-in-the-loop; MCP | Alloy/Kinter agent engine, human approvals, durable SSE replay, audit trails, model routing and MCP | Production AI case study; clearly separate its factual description from the game simulation |
| Second: implementation skills | Go / Golang; Python; TypeScript; CI/CD; Helm; Terraform / Terragrunt | Repeated implementation details in the résumé | Technology names inside the relevant work descriptions, not an isolated word wall |
| Supporting: location / language | LATAM; Latin America; Brazil; Belo Horizonte; UTC−3 | Résumé location; native Portuguese and advanced English | English profile and recruiter brief, with location, time zone and language proficiency |
| Owner-requested: broader role fit | Infrastructure Engineer; DevOps Engineer; AI Infrastructure Engineer; AI Platform Engineer | Existing cloud migration, delivery, platform and production agent work | Role labels paired with concrete responsibilities and career links |
| Owner-requested: seniority | Senior; Staff opportunities | Existing senior roles and technical leadership; no Staff employment title established | State target opportunities in the recruiter brief; preserve historical and structured job titles |
| Conditional: adjacent AI categories | LLMOps; MLOps; AIOps; AI infrastructure | MLOps/AIOps appear in résumé headline; strongest detailed proof concerns agents and managed LLM use | Prefer the concrete capabilities above. Do not imply model training, GPU fleet ownership or full ML lifecycle expertise without additional evidence |

The queries are candidate intents for later measurement, not evidence that people currently search those exact strings. The résumé and `app/portfolio.ts` are the source of the personal claims; fictional projects in that file are not professional delivery evidence.

## Current external evidence

1. **AI engineering has a recent hiring growth signal.** LinkedIn's August 2026 report places AI Engineer among the five fastest-growing occupations overall, with US hiring up 64% year over year for April–June 2026. Its hiring-rate measure relies on members' job-start profile updates. That supports making genuine AI engineering experience discoverable; it does not establish Google demand, Brazilian demand or the user's job availability. [LinkedIn Economic Graph, August 2026, pages 3 and 6](https://delivery-p143253-e1476319.adobeaemcloud.com/adobe/assets/urn:aaid:aem:ef153078-1061-4817-82e7-a1c027d7a7d7/original/as/AI-Labor-Market-Update-August-2026-v2.pdf).

2. **Platform engineering is established organizational practice.** DORA's page updated 12 January 2026 summarizes its 2025 findings: 90% of surveyed organizations use an internal developer platform and 76% have dedicated platform teams. Its definition emphasizes self-service, repeatable workflows and developer experience. This supports a platform narrative around Iago's internal tooling and infrastructure automation. Survey adoption is not search volume. [Google Cloud DORA: Platform engineering](https://dora.dev/capabilities/platform-engineering/).

3. **Kubernetes and observability remain relevant alongside AI.** CNCF's survey announcement dated 20 January 2026 reports production Kubernetes usage among 82% of container users, up from 66% in 2023. It reports Kubernetes inference usage among 66% of organizations that host generative AI models, and highlights observability activity. These are scoped cloud-native survey populations, not all businesses. Iago's own EKS and cluster experience supports Kubernetes terminology; the AI-inference survey must not be used to invent GPU/inference fleet work. [CNCF 2025 Annual Cloud Native Survey announcement](https://www.cncf.io/announcements/2026/01/20/kubernetes-established-as-the-de-facto-operating-system-for-ai-as-production-use-hits-82-in-2025-cncf-annual-cloud-native-survey/).

4. **Current employer language overlaps the résumé.** Okta's Staff SRE posting, accessible on the review date, includes Go/Python, Terraform, Kubernetes/EKS/GKE, GitOps/ArgoCD, Datadog, observability, self-service platforms and incident response. This is one employer's terminology, not a market-wide frequency measurement or a recommendation to claim Staff-level employment. [Okta Staff Site Reliability Engineer, requisition 8087718](https://www.okta.com/company/careers/engineering/staff-site-reliability-engineer-8087718/).

5. **Observability is a distinct hiring specialization.** Ripple's accessible Site Reliability Engineer, Observability posting explicitly pairs those role names with Terraform, New Relic, tracing, SLOs and incident management. Its Azure/Windows requirements differ from Iago's strongest evidence; borrow only the accurate vocabulary, not the entire requirements list. [Ripple Site Reliability Engineer, Observability, requisition 7947800](https://ripple.com/careers/all-jobs/job/7947800/).

## Content that earns the LinkedIn click

Use the portfolio's three existing mission themes as entry points into readable factual work summaries:

- **Kubernetes reliability at PicPay:** 300+ clusters and KEDA event-driven autoscaling for RabbitMQ, as stated in the résumé. Explain the operating problem and work performed. Keep synthetic game numbers explicitly illustrative.
- **Observability at iFood:** standardized monitoring across 50+ AWS accounts and 3,000+ EC2 instances; describe Datadog, tracing, dashboards and incident visibility. If publishing the résumé's 40% MTTD reduction, present it as that specific project outcome, not a universal result.
- **Production AI at Alloy/Kinter:** LangGraph/LangChain workflows, human approval, durable replay and audit trails. Explain the production constraints and implementation instead of claiming generic “AI transformation.”

Place a descriptive “View Iago on LinkedIn” link beside the professional introduction and after these case summaries. A visitor should be able to assess role, location, relevant work and technologies without playing the game. Preserve the game as the memorable interactive layer.

## Evidence limits and exclusions

- No Google Trends dataset, Keyword Planner account, Search Console property or measured keyword-volume source was available in this research. Do not label this list “the most searched keywords” or assign fabricated traffic/competition numbers.
- First-party job listings are a small, purposive vocabulary sample and can close or change. The report dates and population qualifiers matter; current hiring signals do not establish individual ranking potential.
- OpenTelemetry appears in the fictional “Signal Tower” concept, but not in the supplied résumé's actual work history. Do not promote it as verified hands-on professional experience without confirmation. The same caution applies to tools absent from the résumé, such as Backstage and GPU-serving stacks.
- Avoid asserting a completed degree, current verified certifications, remote-work eligibility or current hiring availability from ambiguous résumé wording.
- Verify the LinkedIn URL before adding it to visible links or structured data. Do not invent a vanity URL. Public indexing and traffic measurement require a deployed, crawlable URL; localhost cannot establish search visibility.

After public launch, the useful validation is actual search queries and clicks in Search Console, plus attributable outbound LinkedIn clicks if measurement is explicitly configured. Review which role/skill queries attract qualified visitors and revise the corresponding factual content; the current recommendations remain hypotheses until that evidence exists.

## AI discovery follow-up

The owner requested an English-only page and broader international role positioning on 5 September 2026. This is a content direction, not new keyword-volume evidence. Implementation now places the requested terms in visible professional content and mirrors supported topics in metadata and Person structured data.

Current implementation guidance comes from [Google's AI features documentation](https://developers.google.com/search/docs/appearance/ai-features), its [generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), and [OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots). Use the same readable profile for visitors and crawlers. Preserve the distinction between search access and model-training preferences. The hiring reports above are background research from the earlier review, not a newly refreshed market survey.
