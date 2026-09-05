# SEO implementation and launch notes

Reviewed 5 September 2026. The portfolio targets GitHub Pages at https://iagonc.github.io/. Public indexing and increased traffic have not been established.

## Search strategy

The primary audience is someone assessing Iago's professional fit: branded searches, Site Reliability Engineering, Platform Engineering, observability, AWS/Kubernetes infrastructure and production AI agents. The [keyword research](./seo-keyword-research.md) maps each cluster to résumé evidence and current first-party hiring/adoption signals. Those signals are not Google search volumes. No claims about position, clicks or “most searched” keywords are made.

The page is entirely in English, with Brazil, Latin America (LATAM), UTC−3 and language proficiency stated in the visible professional profile. There is no separate translated page, so no `hreflang` alternates are emitted.

## International recruiting and AI search

The owner requested broader discovery for SRE, Platform Engineer, Infrastructure Engineer, DevOps Engineer, AI Infrastructure Engineer and AI Platform Engineer roles. The visible expertise section maps those labels to responsibilities, named employers and the existing career chapters. It includes AWS and Google Cloud Platform (GCP), with the AWS-to-GCP migration attributed to Prodap.

The recruiter section replaces the Portuguese paragraph. “Senior & Staff opportunities” describes target opportunities; it does not change historical job titles or the Person schema's `jobTitle`. The page states location, time zone and language proficiency without claiming immediate availability, work authorization, visas or a previously held Staff title.

The page title, description, Open Graph/Twitter text and Person description now reflect the same international positioning. `knowsAbout` covers the visible infrastructure, GCP, AI platform and LLMOps topics. The downloadable résumé also includes the LATAM location and a concise professional summary.

Google's [AI search guidance](https://developers.google.com/search/docs/appearance/ai-features) recommends crawlable textual content and structured data consistent with what visitors see. It does not require a special AI schema or file. Google's [generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) also advises against writing variants of content just to target query permutations. This change adds useful role context and internal evidence links; it does not add a keyword meta tag, hidden keyword text or `llms.txt`.

[OpenAI's crawler documentation](https://developers.openai.com/api/docs/bots) identifies `OAI-SearchBot` as the crawler for ChatGPT search and distinguishes it from training and user-triggered access. The existing wildcard `Allow: /` permits search crawling; this change does not alter training preferences. Public hosting must still permit crawler access. The build now generates `/robots.txt`, `/sitemap.xml` and `/resume.txt` as static assets; no route handlers are required on GitHub Pages.

Local HTML, browser and build checks establish content availability and application behavior. They do not establish public indexing, inclusion in an AI answer, ranking improvements or recruiter traffic. Those outcomes need measurement after public launch.

## What changed and why

- The homepage is a server component. The interactive console lives in `app/console-portfolio.tsx`, while `app/professional-profile.tsx` renders the name, full role, real work, expertise and career history on the initial response. Visitors do not have to operate the game to read this content. Server rendering reduces dependency on JavaScript processing for crawlers. [Google: JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
- The document title identifies Iago and expands Site Reliability Engineer, while the description covers platform, AI, location and professional work. These are suggestions to search engines, not control over the final search snippet. [Google: title links](https://developers.google.com/search/docs/appearance/title-link), [Google: snippets](https://developers.google.com/search/docs/appearance/snippet).
- LinkedIn CTAs are direct `<a href>` links to `https://www.linkedin.com/in/iago-n-caldeira/`, confirmed by the owner after discovery. The header, profile, console contact screen and résumé download all use that URL. No redirect, invented vanity address, `nofollow`, tracking script or placeholder email is used. Internal links point to existing sections. [Google: crawlable links and anchor text](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
- `ProfilePage` JSON-LD identifies the page's `Person` and connects the identity to LinkedIn through `sameAs`. It contains no invented follower counts, credentials, awards or profile picture. This communicates identity; it does not promise a rich result or ranking improvement. [Google: profile structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page).
- Keywords appear in useful descriptions of actual work. There is no meta-keywords tag, word wall, doorway page or fabricated project presented as a career achievement. [Google's SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) says Google does not use meta keywords and discourages keyword stuffing.
- `robots.txt` allows crawling of the homepage and excludes `/resume.txt`. GitHub Pages cannot supply the former custom `X-Robots-Tag: noindex` header on the text download. The download attribute preserves the browser action, and the sitemap contains the homepage, complete résumé and three case studies. A robots exclusion prevents crawling, not necessarily indexing of a discovered URL. [Google: robots meta tags and HTTP headers](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).
- The console uses `data-nosnippet` to keep game controls and simulated readings out of Google text snippets while leaving the professional content available for them. This does not block indexing of the game section. [Google: section-level snippet controls](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

## Public hosting

`publicSiteUrl` is `https://iagonc.github.io/`. Canonical, Open Graph and structured-data URLs use that origin. The generated robots file advertises its sitemap, which contains the canonical homepage, complete résumé and three case studies. No fragment anchors, download URLs or fabricated `lastmod` timestamps are included. [Google: canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [Google: building sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

`next.config.ts` enables static export. The GitHub Actions workflow publishes only `dist/client` after build and HTTP checks. Public site metadata includes a 1200 × 630 image derived from the actual portfolio for Open Graph and Twitter large-image previews. No domain purchase, LinkedIn edit or Search Console submission is part of this deployment.

## Validation and measurement

`tests/seo-http.test.mjs` checks the actual HTTP response without executing browser JavaScript: readable career content, metadata, JSON-LD identity, LinkedIn anchors, internal anchors, robots/sitemap configuration, résumé response and a genuine 404 for unknown paths. Run it against the running dev server, or set `PORTFOLIO_TEST_URL` to a public/staging origin for an authorized read-only check. This is a local technical check, not Google's Rich Results Test or proof of indexing.

After an authorized public launch:

1. Verify HTTPS, the final canonical origin, robots, sitemap, 404 behavior and mobile rendering on the public URL.
2. Verify ownership in Search Console, submit the sitemap, and inspect the homepage. Run Google's Rich Results Test and PageSpeed Insights on that public URL.
3. Link the portfolio from the owner's LinkedIn Contact Info or Featured section only if separately authorized. It gives profile visitors another way to discover the work; it does not guarantee rankings.
4. Review Search Console queries, impressions, clicks and CTR by country/device after indexing. Compare branded queries with SRE, platform, observability and AI infrastructure terms before choosing more content. [Search Console: performance report](https://support.google.com/webmasters/answer/7576553).
5. Search Console measures Google-to-portfolio clicks. Measuring portfolio-to-LinkedIn clicks requires an outbound analytics event if the owner chooses to add analytics; LinkedIn profile views alone do not prove attribution. No analytics or recurring monitoring was installed in this change.

## Full résumé and engineering pages

The expanded résumé supplied by the owner on 5 September 2026 adds seven separate roles, 33 responsibility/outcome statements and 83 technologies/practices. `app/portfolio.ts` stores the shared career facts; `app/resume-content.tsx` renders the full experience for the dialog and `/resume`. The text export includes all roles, education, certifications/training and languages. Fictional game concepts remain in the console only. No certificate level, expiration or completed degree is inferred from ambiguous source entries.

Three pages describe distinct work at iFood, PicPay and Alloy / Kinter. Each has its own title, description, canonical URL, Article author and internal links. Engineering metrics come from the owner’s résumé and are scoped to the relevant work. Public company figures retain their separate dates and sources in the explorer. The homepage, résumé, consulting page, hiring brief and three case studies appear in the sitemap and expose meaningful HTML without JavaScript. URLs use the exporter’s default no-trailing-slash form.

The `/infrastructure-engineer` brief gives hiring teams role-specific evidence, links to the corresponding career sections, technical interview topics and contact paths. It keeps the shared Person identity and actual Senior Site Reliability Engineer title. Senior and Staff opportunity labels describe the owner's target roles. The homepage's title and description emphasize infrastructure, SRE, DevOps, platform engineering and observability alongside AI. The public repository README links to the professional pages.

The battery decoration no longer exposes an invalid ARIA name, and small field-note text uses darker colors. Native anchors provide navigation between static pages: browser QA reproduced a `next/link` client navigation failure in this export, so the lint rule that requires that component is disabled. No server fallback or SPA catch-all is introduced; unknown URLs remain 404.

Search Console ownership, index submission, impressions and AI citations remain separate from this implementation. No page claims guaranteed rankings.
