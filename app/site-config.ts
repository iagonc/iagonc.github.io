import { technicalToolkit } from './technical-toolkit.ts';

export const linkedInUrl = 'https://www.linkedin.com/in/iago-n-caldeira/';

export const publicSiteUrl = 'https://iagonc.github.io/';
export const siteTitle =
  'Iago Caldeira | Senior SRE, Platform & AI Engineer in LATAM';
export const siteDescription =
  'Iago Caldeira, Senior SRE and Platform Engineer in Brazil, LATAM. AWS, GCP, Kubernetes, DevOps and AI infrastructure. Explore my work and connect on LinkedIn.';
export const profileStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  ...(publicSiteUrl ? { url: publicSiteUrl } : {}),
  name: siteTitle,
  description: siteDescription,
  inLanguage: 'en',
  mainEntity: {
    '@type': 'Person',
    name: 'Iago Neves Caldeira',
    alternateName: 'Iago Caldeira',
    jobTitle: 'Senior Site Reliability Engineer',
    description:
      'Senior SRE, Platform Engineer and AI Engineer in Belo Horizonte, Brazil, Latin America (LATAM). Experience in AWS, Google Cloud (GCP), Kubernetes, observability, DevOps and production AI agent platforms.',
    sameAs: [linkedInUrl],
    ...(publicSiteUrl ? { url: publicSiteUrl } : {}),
    homeLocation: { '@type': 'Place', name: 'Belo Horizonte, Brazil' },
    knowsLanguage: ['Portuguese', 'English'],
    knowsAbout: [
      ...new Set([
        'Site Reliability Engineering',
        'Platform Engineering',
        'Infrastructure Engineering',
        'Cloud Infrastructure',
        'Observability',
        'DevOps',
        'AWS',
        'Google Cloud Platform (GCP)',
        'Kubernetes',
        'Terraform',
        'GitOps',
        'Datadog',
        'AI Infrastructure',
        'AI Platform Engineering',
        'LLMOps',
        'AI Agents',
        'LangGraph',
        'Amazon Bedrock',
        'Model Context Protocol',
        'Human-in-the-loop workflows',
        ...technicalToolkit.flatMap((group) => group.items),
      ]),
    ],
  },
};
