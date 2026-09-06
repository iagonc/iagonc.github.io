const covers = {
  resume: {
    tab: 'PERSONNEL',
    code: 'IC / 001',
    title: 'The player file.',
    subtitle: 'CAREER RECORD · 2018—PRESENT',
    href: '#work-history',
    action: 'OPEN WORK HISTORY',
    seal: 'ENGINEER / BUILDER',
  },
  consulting: {
    tab: 'PROJECTS',
    code: 'IC / 002',
    title: 'Built to operate.',
    subtitle: 'SCOPING · DELIVERY · HANDOVER',
    href: '#services-title',
    action: 'EXPLORE THE SERVICES',
    seal: 'PLAN / BUILD / VERIFY',
  },
  hiring: {
    tab: 'FIELD NOTES',
    code: 'IC / 003',
    title: 'A closer look.',
    subtitle: 'INFRASTRUCTURE · PLATFORMS · AI',
    href: '#role-fit-title',
    action: 'EXPLORE THE EXPERIENCE',
    seal: 'SYSTEMS / PEOPLE',
  },
};

export default function ArchiveCover({
  variant,
}: {
  variant: keyof typeof covers;
}) {
  const cover = covers[variant];
  return (
    <a
      className={`archive-cover archive-${variant}`}
      href={cover.href}
      aria-label={cover.action}
    >
      <span className="archive-sheet sheet-back" aria-hidden="true" />
      <span className="archive-sheet sheet-middle" aria-hidden="true" />
      <div className="archive-front">
        <span className="archive-tab">{cover.tab}</span>
        <div className="archive-label">
          <span>IAGO CALDEIRA</span>
          <span>{cover.code}</span>
        </div>
        <span className="archive-monogram" aria-hidden="true">
          ic<span>✳</span>
        </span>
        <strong>{cover.title}</strong>
        <span className="archive-subtitle">{cover.subtitle}</span>
        <div className="archive-stamp" aria-hidden="true">
          {cover.seal}
          <span>BRAZIL / LATAM</span>
        </div>
        <span className="archive-open">
          {cover.action}
          <span aria-hidden="true">↘</span>
        </span>
      </div>
    </a>
  );
}
