import { technicalToolkit } from './technical-toolkit.ts';

export const linkedInUrl = 'https://www.linkedin.com/in/iago-n-caldeira/';
export const githubUrl = 'https://github.com/iagonc';

export const publicSiteUrl = 'https://iagonc.github.io/';
export const siteTitle =
  'Iago Caldeira | Senior SRE & Infrastructure Engineer in LATAM';
export const siteDescription =
  'Iago Caldeira, Senior SRE and Infrastructure Engineer in Brazil, LATAM. AWS, GCP, Kubernetes, DevOps, platform engineering, observability and AI infrastructure.';
export const profileStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  ...(publicSiteUrl ? { url: publicSiteUrl } : {}),
  name: siteTitle,
  description: siteDescription,
  inLanguage: 'en',
  mainEntity: {
    '@type': 'Person',
    '@id': `${publicSiteUrl}#person`,
    name: 'Iago Neves Caldeira',
    alternateName: 'Iago Caldeira',
    jobTitle: 'Senior Site Reliability Engineer',
    description:
      'Senior Site Reliability Engineer in Belo Horizonte, Brazil, Latin America (LATAM). Infrastructure engineering, platform engineering, DevOps and observability experience across AWS, Google Cloud (GCP) and Kubernetes, including production AI agent platforms.',
    sameAs: [linkedInUrl, githubUrl],
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
