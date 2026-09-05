import assert from 'node:assert/strict';
import { test } from 'node:test';

const origin = process.env.PORTFOLIO_TEST_URL || 'http://localhost:3001';
const linkedIn = 'https://www.linkedin.com/in/iago-n-caldeira/';
const publicUrl = 'https://iagonc.github.io/';
const response = await fetch(origin);
const html = await response.text();
const visibleHtml = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
const visibleText = visibleHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

test('professional experience is delivered as HTML without running the console', () => {
  assert.equal(response.status, 200);
  for (const value of [
    'Iago Neves Caldeira',
    'Senior Site Reliability Engineer',
    'LangGraph',
    'Kubernetes',
    'PicPay',
    'iFood',
    'Alloy / Kinter',
    'Accenture',
    'Prodap',
  ])
    assert.ok(
      visibleHtml.includes(value),
      `Missing server-rendered content: ${value}`,
    );
  assert.equal((visibleHtml.match(/<h1\b/g) || []).length, 1);
  assert.doesNotMatch(visibleHtml, /iago@example\.com/);
});

test('search metadata and structured identity use the real LinkedIn profile', () => {
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title);
  for (const term of [
    'Iago Caldeira',
    'Senior SRE',
    'Platform',
    'AI Engineer',
    'LATAM',
  ])
    assert.ok(title.includes(term), `Missing positioning in title: ${term}`);
  const description = html.match(
    /<meta name="description" content="([^"]+)"/,
  )?.[1];
  assert.ok(description);
  for (const term of ['LATAM', 'AWS', 'GCP', 'AI infrastructure'])
    assert.ok(
      description.includes(term),
      `Missing positioning in description: ${term}`,
    );
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.match(html, /<meta property="og:type" content="profile"/);
  const scripts = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ];
  assert.equal(scripts.length, 1);
  const profile = JSON.parse(scripts[0][1]);
  assert.equal(profile['@type'], 'ProfilePage');
  assert.equal(profile.mainEntity['@type'], 'Person');
  assert.equal(profile.mainEntity.name, 'Iago Neves Caldeira');
  assert.deepEqual(profile.mainEntity.sameAs, [
    linkedIn,
    'https://github.com/iagonc',
  ]);
  assert.equal(profile.mainEntity.jobTitle, 'Senior Site Reliability Engineer');
  assert.ok(profile.mainEntity.knowsAbout.includes('AI Platform Engineering'));
  assert.ok(
    profile.mainEntity.knowsAbout.includes('Google Cloud Platform (GCP)'),
  );
  assert.ok(!profile.mainEntity.knowsAbout.includes('OpenTelemetry'));
  assert.equal(profile.url, publicUrl);
  assert.equal(profile.mainEntity.url, publicUrl);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  assert.ok(canonical);
  assert.equal(new URL(canonical[1]).href, publicUrl);
  const openGraphUrl = html.match(/<meta property="og:url" content="([^"]+)"/);
  assert.ok(openGraphUrl);
  assert.equal(new URL(openGraphUrl[1]).href, publicUrl);
});

test('international recruiting content is readable in English without JavaScript', () => {
  assert.match(html, /<html\b[^>]*lang="en"/);
  assert.doesNotMatch(
    visibleHtml,
    /lang="pt-BR"|EM PORTUGUÊS|Sou Iago|Veja meu perfil/,
  );
  for (const term of [
    'Latin America (LATAM)',
    'Platform Engineering',
    'Platform Engineer',
    'Infrastructure Engineer',
    'DevOps Engineer',
    'AI Infrastructure Engineer',
    'AI Platform Engineer',
    'Senior &amp; Staff opportunities',
    'GCP',
  ])
    assert.ok(
      visibleText.includes(term),
      `Missing readable recruiter context: ${term}`,
    );
  assert.match(visibleHtml, /id="opportunities"/);
  assert.match(visibleText, /Portuguese \(native\).*English \(advanced\)/);
  // Desired levels belong in opportunity context, not invented employment history.
  const roles = [...visibleHtml.matchAll(/class="career-role">([^<]+)</g)].map(
    ([, role]) => role,
  );
  assert.equal(roles.length, 7);
  assert.ok(roles.every((role) => !role.includes('Staff')));
});

test('LinkedIn and section navigation are real crawlable anchors', () => {
  const anchors = [...visibleHtml.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)];
  assert.ok(anchors.filter(([, href]) => href === linkedIn).length >= 4);
  for (const [tag, href] of anchors) {
    if (href === linkedIn) assert.doesNotMatch(tag, /nofollow/);
    if (href.startsWith('#'))
      assert.ok(
        visibleHtml.includes(`id="${href.slice(1)}"`),
        `Missing anchor target: ${href}`,
      );
  }
});

test('the full toolkit is readable without JavaScript and matches schema and resume', async () => {
  assert.equal((visibleHtml.match(/class="toolkit-group"/g) || []).length, 6);
  assert.match(visibleHtml, /href="#toolkit"/);
  const inventory = visibleHtml
    .split('id="toolkit"')[1]
    ?.split('id="experience"')[0];
  assert.ok(inventory);
  assert.doesNotMatch(inventory, /\shidden(?:\s|=|>)|data-nosnippet/);
  const identity = JSON.parse(
    html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
  );
  const resume = await (await fetch(`${origin}/resume.txt`)).text();
  for (const term of [
    'Terragrunt',
    'Atlantis',
    'Argo CD (ArgoCD)',
    'KEDA',
    'GitLab CI/CD',
    'Jenkins',
    'Logz.io',
    'HashiCorp Vault',
    'HashiCorp Consul',
    'Go (Golang)',
    'Groovy',
    'gRPC',
    'RabbitMQ',
    'Vertex AI',
    'Model Context Protocol (MCP)',
    'Prompt caching',
    'Anthropic Claude',
    'Retrieval-augmented generation (RAG)',
    'AWS Transit Gateway',
    'Ansible',
    'Docker',
    'Apache Kafka',
    'MLOps',
    'AIOps',
  ]) {
    assert.ok(inventory.includes(term), `Missing visible skill: ${term}`);
    assert.ok(
      identity.mainEntity.knowsAbout.includes(term),
      `Missing schema skill: ${term}`,
    );
    assert.ok(resume.includes(term), `Missing resume skill: ${term}`);
  }
});

test('robots and sitemap advertise the canonical public homepage', async () => {
  const robots = await fetch(`${origin}/robots.txt`);
  assert.equal(robots.status, 200);
  const body = await robots.text();
  assert.match(body, /User-agent: \*\nAllow: \//);
  assert.ok(body.includes(`Sitemap: ${publicUrl}sitemap.xml`));
  assert.match(body, /Disallow: \/resume.txt/);
  assert.doesNotMatch(body, /localhost|example\./);
  const sitemap = await fetch(`${origin}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get('content-type'), /xml/);
  const xml = await sitemap.text();
  assert.ok(xml.includes(`<loc>${publicUrl}</loc>`));
  assert.equal((xml.match(/<loc>/g) || []).length, 5);
  assert.doesNotMatch(xml, /localhost|example\.|linkedin\.com/);
});

test('static resume is available through a real download link', async () => {
  assert.match(
    visibleHtml,
    /href="\/resume.txt" download="Iago-Caldeira-Resume.txt"/,
  );
  const download = await fetch(`${origin}/resume.txt`);
  assert.equal(download.status, 200);
  assert.match(download.headers.get('content-type'), /text\/plain/);
  const content = await download.text();
  assert.ok(content.includes(linkedIn));
  assert.doesNotMatch(content, /iago@example\.com/);
});

test('missing pages return a genuine 404, not an indexable success response', async () => {
  const missing = await fetch(`${origin}/missing-profile-seo-check`);
  assert.equal(missing.status, 404);
  await missing.arrayBuffer();
});

test('sharing metadata points to a full-size public preview image', async () => {
  assert.ok(
    html.includes(
      `<meta property="og:image" content="${publicUrl}og-image.png"`,
    ),
  );
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
  const preview = await fetch(`${origin}/og-image.png`);
  assert.equal(preview.status, 200);
  assert.match(preview.headers.get('content-type'), /image\/png/);
  const bytes = Buffer.from(await preview.arrayBuffer());
  assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
  assert.equal(bytes.readUInt32BE(16), 1200);
  assert.equal(bytes.readUInt32BE(20), 630);
});

test('the static entry point resolves its scripts, stylesheets, font and icon', async () => {
  const paths = new Set(['/fonts/vt323.ttf', '/favicon.svg']);
  for (const [, path] of html.matchAll(/(?:src|href)="(\/[^"#]*)"/g)) {
    if (!path.startsWith('//')) paths.add(path);
  }
  for (const path of paths) {
    const asset = await fetch(new URL(path, origin));
    assert.equal(asset.status, 200, `Missing published asset: ${path}`);
    assert.ok(
      (await asset.arrayBuffer()).byteLength > 0,
      `Empty published asset: ${path}`,
    );
  }
});

test('real product screenshots and source context are available without JavaScript', async () => {
  for (const asset of [
    'picpay-screen-1.webp',
    'picpay-screen-2.webp',
    'picpay-screen-3.webp',
    'ifood-screen-1.png',
    'ifood-screen-2.png',
    'ifood-screen-3.png',
    'kinter.png',
    'kinter-schedule.png',
  ]) {
    const path = `/images/experience/${asset}`;
    assert.ok(visibleHtml.includes(`src="${path}"`));
    const image = await fetch(`${origin}${path}`);
    assert.equal(image.status, 200);
    assert.match(image.headers.get('content-type'), /^image\//);
    assert.ok((await image.arrayBuffer()).byteLength > 1000);
  }
  assert.match(visibleText, /70M total accounts.*company snapshot, June 2026/);
  assert.match(visibleText, /180M ecosystem orders.*November 2025 record/);
  assert.match(visibleText, /Official App Store screenshots/);
  assert.match(visibleText, /Public product demo/);
  assert.doesNotMatch(
    visibleHtml,
    /src="\/images\/experience\/(picpay\.webp|ifood\.jpg)"/,
  );
  assert.doesNotMatch(visibleHtml, /src="\/_next\/image[^"<]*experience/);
});

test('company coverage has crawlable primary sources and identifies company results', () => {
  assert.equal(
    (visibleHtml.match(/class="explorer-coverage"/g) || []).length,
    3,
  );
  for (const source of [
    'https://apps.apple.com/br/app/picpay-conta-cart%C3%A3o-e-pix/id561524792',
    'https://apps.apple.com/br/app/ifood-pedir-delivery-em-casa/id483017239',
    'https://aws.amazon.com/solutions/case-studies/picpay-eks-case-study/',
    'https://aws.amazon.com/solutions/case-studies/ifood-bedrock/',
    'https://www.ycombinator.com/companies/kinter',
    'https://a16z.com/announcement/investing-in-alloy-automation/',
    'https://kinter.ai/blog/kill-the-co-pilot',
    'https://investor.picpay.com/about-us/',
    'https://picpay.com/en-us/sala-de-imprensa',
    'https://institucional.ifood.com.br/releases/ifood-12-milhoes-pedidos/',
    'https://institucional.ifood.com.br/releases/ifood-bate-novo-recorde-no-mes-de-novembro-com-180-milhoes-de-pedidos-totais/',
  ])
    assert.ok(
      visibleHtml.includes(`href="${source}"`),
      `Missing source: ${source}`,
    );
  assert.match(visibleText, /Published company results and background/);
  assert.match(visibleText, /30.*team members listed by Y Combinator/);
  assert.match(
    visibleText,
    /Over 50% lower monthly costs with EKS and Karpenter/,
  );
  assert.match(
    visibleText,
    /November 2025 record covers the whole iFood ecosystem/,
  );
  assert.match(visibleText, /2022.*Alloy history/);
});

test('the complete resume preserves career depth in readable HTML and text', async () => {
  const page = await fetch(`${origin}/resume`);
  assert.equal(page.status, 200);
  const content = await page.text();
  const readable = content
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  const text = readable.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const download = await (await fetch(`${origin}/resume.txt`)).text();
  for (const term of [
    'February 2025',
    'April 2022',
    'January 2022',
    'October 2021',
    'May 2021',
    'January 2018',
    'August 2019',
    'City Hall',
    '40%',
    '50%',
    '30%',
    '99.9%',
    '10-minute',
    '15-minute',
    '5,000+',
    'Anthropic API',
    'Terraform Associate',
    'Cambridge',
    'Information Systems',
  ]) {
    assert.ok(text.includes(term), `Missing complete resume HTML: ${term}`);
    assert.ok(download.includes(term), `Missing complete text resume: ${term}`);
  }
  assert.equal((readable.match(/class="resume-job"/g) || []).length, 7);
  assert.equal((readable.match(/<h1\b/g) || []).length, 1);
  assert.doesNotMatch(
    text,
    /Fictional|fictional|Signal Tower|Cloud Atlas|Agent Workshop|studies listed in supplied resume/,
  );
  assert.doesNotMatch(
    download,
    /Fictional|fictional|Signal Tower|Cloud Atlas|Agent Workshop/,
  );
  assert.match(readable, /Print \/ save PDF/);
  assert.match(visibleHtml, /href="\/resume"/);
  const canonical = content.match(/<link rel="canonical" href="([^"]+)"/);
  assert.equal(canonical?.[1], `${publicUrl}resume`);
  assert.ok(
    content.includes(`<meta property="og:url" content="${publicUrl}resume"`),
  );
});

test('case studies have crawlable content, independent metadata and sitemap entries', async () => {
  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
  const titles = new Set();
  /** @type {Array<[string, string[]]>} */
  const cases = [
    [
      'ifood-observability',
      ['40%', '50+', '10-minute', '15-minute', 'Transit Gateway'],
    ],
    ['picpay-kubernetes', ['300+', '50%', 'KEDA', 'RabbitMQ', 'New Relic']],
    [
      'kinter-ai-infrastructure',
      ['LangGraph', 'durable replay', 'Claude', 'MCP', 'Anthropic API'],
    ],
  ];
  for (const [slug, terms] of cases) {
    const path = `/work/${slug}`;
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 200, path);
    const content = await response.text();
    const readable = content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    assert.equal((readable.match(/<h1\b/g) || []).length, 1, path);
    for (const term of terms)
      assert.ok(readable.includes(term), `${path}: missing ${term}`);
    for (const anchor of readable.matchAll(/href="#([^"]+)"/g))
      assert.ok(
        readable.includes(`id="${anchor[1]}"`),
        `${path}: broken section link`,
      );
    assert.ok(
      visibleHtml.includes(`href="${path}"`),
      `${path}: missing homepage link`,
    );
    assert.ok(sitemap.includes(`<loc>${publicUrl}work/${slug}</loc>`), path);
    const canonical = content.match(/<link rel="canonical" href="([^"]+)"/);
    assert.equal(canonical?.[1], `${publicUrl}work/${slug}`, path);
    assert.ok(
      content.includes(
        `<meta property="og:url" content="${publicUrl}work/${slug}"`,
      ),
    );
    assert.match(content, /<meta property="og:type" content="article"/);
    const title = content.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title?.includes('Iago Caldeira'));
    titles.add(title);
    const article = JSON.parse(
      content.match(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
      )[1],
    );
    assert.equal(article['@type'], 'Article');
    assert.equal(article.author['@id'], `${publicUrl}#person`);
    assert.equal(article.mainEntityOfPage, `${publicUrl}work/${slug}`);
    assert.match(readable, /href="\/resume#/);
  }
  assert.equal(titles.size, 3);
  assert.ok(sitemap.includes(`<loc>${publicUrl}resume</loc>`));
  const missing = await fetch(`${origin}/work/missing-case-study`);
  assert.equal(missing.status, 404);
  await missing.arrayBuffer();
});

test('the decorative battery does not expose an invalid accessible name', () => {
  assert.match(visibleHtml, /class="lcd-battery" aria-hidden="true"/);
});
