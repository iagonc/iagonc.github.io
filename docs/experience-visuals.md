# Experience visuals

The PicPay, iFood and Alloy / Kinter chapters each include a Product / Scale / My contribution explorer. Product screenshots, descriptions, credits and a three-entry reading list are server-rendered. The other panels are present in HTML and become visible through their tabs. Each instance owns its tab, scope and workflow selection independently.

Tabs support Left/Right, Home and End. Each gallery image opens in the existing dialog component, which supports Escape and returns focus to its trigger. Galleries use native horizontal scrolling and scroll snapping; keyboard focus brings each image into view. Scope and workflow controls are native buttons in labelled fieldsets. Status details use polite live regions; decorative dots are hidden from assistive technology. Motion respects reduced-motion preferences.

## Public sources

Checked September 5, 2026. Company figures describe the dated public snapshot; engineering figures come from the supplied professional experience. They are labelled separately in the interface.

- PicPay: [Investor Relations](https://investor.picpay.com/about-us/) reports 70M total accounts in June 2026. The [AWS EKS/Karpenter case](https://aws.amazon.com/solutions/case-studies/picpay-eks-case-study/) describes the 2022–2024 modernization and over 50% lower monthly costs. The [press room](https://picpay.com/en-us/sala-de-imprensa) reports R$134B total payment volume for Q1 2026. These are company results, separate from the 2021–2022 career chapter and its 300+ cluster operating scope. Account count is not active-user count.
- iFood: the [December 2025 announcement](https://institucional.ifood.com.br/releases/ifood-bate-novo-recorde-no-mes-de-novembro-com-180-milhoes-de-pedidos-totais/) reports 180M total ecosystem orders in November 2025, including messaging channels. This must not be relabelled as app-only orders or directly compared with the older 120M app metric. The [AWS AI story](https://aws.amazon.com/solutions/case-studies/ifood-bedrock/) covers Bedrock, SageMaker and developer productivity; its publication date is not listed. The [March 2026 announcement](https://institucional.ifood.com.br/releases/ifood-12-milhoes-pedidos/) reports 12M February orders supported by its commerce model. These company results are separate from the personal 50+ AWS accounts / 3,000+ EC2 scope.
- Kinter: the [YC directory and launch](https://www.ycombinator.com/companies/kinter) lists a 30-person team, Winter 2020 batch and the founder’s account of the pivot from Alloy. The UI labels team size as a directory listing, not an independently verified headcount. [a16z’s February 2022 announcement](https://a16z.com/announcement/investing-in-alloy-automation/) concerns Alloy’s Series A, before the Kinter pivot. The [June 2026 founder essay](https://kinter.ai/blog/kill-the-co-pilot) explains the AI accounting direction. No verified AWS case for Kinter was found in this search; similarly named KTern.AI/KINTO results refer to other companies and are excluded.

## Local assets and attribution

These public materials were published by the companies to illustrate their products. The interface links to the original publication; it does not imply ownership or company endorsement. No private application, customer data or internal diagram was accessed. Screenshots contain the original Brazilian app copy; surrounding portfolio copy remains in English.

- `picpay-screen-{1,2,3}.webp`: account overview, Pix and Cofrinhos screens from [PicPay’s App Store listing](https://apps.apple.com/br/app/picpay-conta-cart%C3%A3o-e-pix/id561524792), 600 × 1299. Original Apple CDN WebP responses; no raster edits.
- `ifood-screen-{1,2,3}.png`: restaurants, search filters and groceries from [iFood’s App Store listing](https://apps.apple.com/br/app/ifood-pedir-delivery-em-casa/id483017239), 392 × 696. Original Apple CDN PNG responses; no raster edits.
- `kinter.png` and `kinter-schedule.png`: browser captures at 13 and 16 seconds from the public journal-entry and schedule demos on [Kinter’s website](https://kinter.ai/), 1280 × 710. Explicitly labelled public product demos.

All files live under `public/images/experience/`. Exact asset URLs, dimensions and capture times are recorded in `docs/experience-image-sources.json`. The earlier `picpay.webp` and `ifood.jpg` files are retained but no longer referenced by the page.

Images are served locally with explicit dimensions, lazy loading and no image optimization endpoint (`Image unoptimized`), keeping this feature compatible with static hosting. No third-party request is required to render an explorer. Links open the source only when selected. Workflow diagrams are illustrative sequences derived from the existing career text; they do not claim to reproduce an internal production topology.
