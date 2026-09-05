# Iago pocket

A tactile, monochrome handheld portfolio for Iago Caldeira. Built with React, TypeScript and CSS on the generated Vinext starter. No game-console trademarks, external font requests, trackers, or user data storage.

## Run locally

Requires Node 24+.

```sh
npm ci
npm run dev -- --port 3001
```

Open the URL printed by the development server. Use `http://localhost:3001/` with the command above.

## Controls

- Arrow keys or D-pad: select a section / change pages.
- A or X: open / next page / open LinkedIn from the contact screen.
- B, Z or Escape: return to the menu.
- Enter or Start: open selection / return to the menu.
- S or Select: cycle the menu.
- Power switch: turn off / boot the console.
- Speaker icon: enable or mute optional 8-bit sounds.

All controls also work with mouse and touch. The classic résumé dialog supports direct reading and a text download. Motion respects `prefers-reduced-motion`.

## Playable work

The first screen is a cartridge selector. Insert one with A / Start or use the cartridge buttons on desktop. During a mission, the D-pad chooses an action and A performs it. B ejects the cartridge; from the selector, B opens the original résumé menu.

- **Cloud keeper:** provision four pods before routing the load. Inspired by Kubernetes operations and event-driven autoscaling at PicPay.
- **Signal hunter:** inspect an API, worker and database, then remediate the diagnosed bottleneck. Inspired by observability work at iFood.
- **Agent forge:** read a document, draft a plan, approve or revise it, execute, and write an audit trail. Inspired by the AI agent engine at Alloy / Kinter.

Each mission has an animated diagram, contextual field notes, and a collectible badge. Progress lasts for the current page session; ejecting or toggling power resets the active simulation but retains badges. Reloading starts a fresh session. The scenarios and simulated values are explicitly illustrative. Career facts are identified separately.

Mission data and state transitions live in `app/arcade-model.ts`, UI in `app/arcade.tsx`, and styling in `app/arcade.css`. No external services are contacted by the missions.

## Content

Edit `app/portfolio.ts` for profile, jobs, skills and sample projects. Work experience is summarized from the supplied résumé. The three side-quest projects are explicitly fictional. Contact links use the verified LinkedIn URL in `app/site-config.ts`; phone and email details are not included. The résumé download is generated from the same data.

`app/page.tsx` renders the console and a readable professional profile. The profile, three career chapters, expertise and job history are present in the initial HTML. Edit that content in `app/professional-profile.tsx` and its styles in `app/profile.css`. Console keyboard shortcuts stop handling keys when the console is off screen, so visitors can read and scroll normally.

Each featured chapter includes a Product / Scale / My contribution explorer with official app screenshots, accessible image dialogs, sourced company context and a clickable engineering sequence. Three public articles per company cover business scale, cloud case studies or company history. PicPay and iFood use developer-published App Store screenshots; Kinter uses public demo frames. Edit these in `app/experience-explorer.tsx` and `app/experience-explorer.css`. Asset provenance, dates and scope boundaries are recorded in `docs/experience-visuals.md` and `docs/experience-image-sources.json`.

## Search and LinkedIn

The `#toolkit` section displays 50 technologies and engineering practices in six groups. `app/technical-toolkit.ts` supplies the visible inventory, the full résumé dialog, the text download and the Person schema. The player card links to this inventory and summarizes cloud, observability, programming and AI tools. The handheld's short toolkit pages stay compact for its small screen. Skill names come from the existing résumé/toolkit, career chapters and the résumé evidence recorded in `docs/seo-keyword-research.md`; fictional concepts are excluded.

The site includes descriptive metadata, Open Graph/Twitter text, ProfilePage/Person JSON-LD and direct LinkedIn links. See `docs/seo-keyword-research.md` for the sourced keyword research and `docs/seo-implementation.md` for technical decisions, public-launch steps and measurement limits.

All public copy is in English. The professional profile identifies Brazil / Latin America (LATAM), UTC−3, language proficiency, and experience relevant to SRE, Platform, Infrastructure, DevOps and AI Platform / Infrastructure Engineer roles. Four expertise areas link to actual career examples. “Senior & Staff opportunities” appears in the recruiter brief as desired opportunity levels; historical job titles and the structured Person job title remain unchanged. Location does not imply work authorization or immediate availability.

The public origin is **https://iagonc.github.io/**. Canonical, Open Graph, structured data and sitemap URLs derive from `app/site-config.ts`. The sharing preview is a 1200 × 630 capture of the actual console in a compact composition. Before dev/build, `scripts/generate-static-assets.mjs` generates the résumé, robots and sitemap as static files. The résumé uses the browser's download attribute; GitHub Pages cannot add the former custom `X-Robots-Tag` header. Robots excludes `/resume.txt` from crawling and the sitemap lists only the homepage; this is not a guarantee that the download URL cannot be indexed.

Edit `app/globals.css` for the shell, LCD, controls and responsive layout. The locally bundled VT323 font is licensed under the SIL Open Font License in `public/fonts/OFL.txt`.

## Deploy

Public site: [iagonc.github.io](https://iagonc.github.io/).

The public `iagonc/iagonc.github.io` repository publishes to GitHub Pages. Each push to `main` runs application lint, game logic tests, a static build, TypeScript checking and HTTP checks of the exported files. Only a successful build can deploy. Pull requests run the same checks without publishing.

The build exports to `dist/client`. GitHub serves the HTML, JavaScript, CSS and images; no Node server, Worker, database, API key or paid cloud resource is needed. The free `github.io` address uses HTTPS. Repository visibility must remain compatible with the account's Pages plan.

To preview the deployable files locally:

```sh
npm run build
npm start
```

See [deployment notes](docs/deployment.md) for configuration and recovery.

## Verification

```sh
npm run lint
npm test
npm run build
npm run typecheck
# With npm start running:
PORTFOLIO_TEST_URL=http://localhost:4173 npm run test:http
```

HTTP checks cover content without JavaScript, identity and canonical metadata, company sources, all entry-point assets, the sharing image, résumé, robots, sitemap and real 404 responses. Lint targets the application and deployment/test code; unused UI components supplied by the starter are outside this check.

Before release, browser verification also covers the three company explorers, eight image dialogs, keyboard navigation, mobile layouts at 320/390/800 px, reduced motion, no-JavaScript content and console controls. These browser checks were performed locally; the workflow's automated checks are listed above.
