import { mkdir, writeFile } from 'node:fs/promises';
import { resumeText } from '../app/portfolio.ts';
import { publicSiteUrl } from '../app/site-config.ts';
import { caseStudies } from '../app/case-studies.ts';

const site = new URL(publicSiteUrl);
if (site.protocol !== 'https:' || site.pathname !== '/') {
  throw new Error('The public site must use an HTTPS root origin.');
}
const publicDir = new URL('../public/', import.meta.url);
const pages = [
  '',
  'resume',
  'consulting',
  ...caseStudies.map(({ slug }) => `work/${slug}`),
];
await mkdir(publicDir, { recursive: true });
await Promise.all([
  writeFile(new URL('resume.txt', publicDir), resumeText),
  writeFile(
    new URL('robots.txt', publicDir),
    `User-agent: *\nAllow: /\nDisallow: /resume.txt\nSitemap: ${new URL('sitemap.xml', site)}\n`,
  ),
  writeFile(
    new URL('sitemap.xml', publicDir),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((path) => `<url><loc>${new URL(path, site)}</loc></url>`).join('')}</urlset>\n`,
  ),
]);
console.log(`Generated resume, robots and sitemap for ${site}`);
