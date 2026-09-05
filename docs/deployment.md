# GitHub Pages deployment

## Configuration

- Repository: `iagonc/iagonc.github.io` (public).
- Public root: https://iagonc.github.io/.
- Publishing source: GitHub Actions (`build_type: workflow`).
- Workflow: `.github/workflows/pages.yml`.
- Node: 24; dependencies locked in `package-lock.json`.
- Build: `npm run build`; upload directory: `dist/client`.
- Deploy only from `main`, after build and HTTP checks succeed.
- Deployment authentication uses the workflow's short-lived token and OIDC; no stored deployment secret is needed.

The personal-site repository serves at the domain root, so existing `/images`, `/fonts` and anchor links work without a repository prefix. A move to a project URL such as `/portfolio/` would require an asset/base-path review. For a custom domain, first configure ownership and DNS in Pages, then update `app/site-config.ts`, update the canonical-origin assertions in `tests/seo-http.test.mjs`, rebuild and verify HTTPS/canonical/sitemap together.

## Static assets

`predev` and `prebuild` generate `public/resume.txt`, `public/robots.txt` and `public/sitemap.xml` from the same content and public-origin configuration used by the page. Generated copies are ignored by Git. `public/.nojekyll` accompanies the export. The old runtime-only handlers and hosting bindings have been removed.

`npm start` uses a separate Vite preview config to serve the exported files without application-server middleware. Unknown paths remain 404s. The framework exports a `404.html` for GitHub Pages.

The social preview `public/og-image.png` is a 1200 × 630 browser capture of the existing header, copy and console, with a compact export layout. It is a static image; update it if the identity or console design changes.

## Release checks

The workflow runs application/deployment lint, seven game state-machine checks, the export, TypeScript and HTTP checks against the output directory. It checks readable HTML, company imagery and citations, metadata, script/style/font paths, downloadable résumé, robots, sitemap and 404 status before uploading.

Manual browser coverage for the first release includes all eight screenshot dialogs, focus restoration, keyboard tabs, three company/scope views, workflow steps, 320/390/800 px layouts, reduced motion, console controls and no-JavaScript availability. Run public HTTP checks with:

```sh
PORTFOLIO_TEST_URL=https://iagonc.github.io npm run test:http
```

A green build, a completed Pages deployment and a working public URL are separate checks. Verify the public page after the deployment job completes.

## Updating and recovery

Edit content locally, verify it, then push the intended commit to `main`. The workflow publishes successful changes automatically. PRs validate without deploying.

To recover from a bad release, revert the responsible commit and push the revert to `main`; the same workflow redeploys the previous behavior. Avoid history rewrites. Older commits remain available in Git. Deployment artifacts have GitHub's normal retention period.

No analytics, paid services or recurring jobs are configured. GitHub Pages hosts static files only; adding an authenticated backend would require a separate service.
