import { ArrowDownRight } from 'lucide-react';

const artwork = {
  picpay: {
    name: 'PicPay',
    line: 'Ready for the rush.',
    tag: 'CLOUD / PLATFORM',
    number: '01',
  },
  ifood: {
    name: 'iFood',
    line: 'Find the signal.',
    tag: 'SIGNALS / SYSTEMS',
    number: '02',
  },
  kinter: {
    name: 'Alloy / Kinter',
    line: 'Keep humans in the loop.',
    tag: 'AGENTS / INTELLIGENCE',
    number: '03',
  },
};

export default function ChapterBanner({
  company,
}: {
  company: keyof typeof artwork;
}) {
  const art = artwork[company];
  return (
    <a
      className={`chapter-banner banner-${company}`}
      href={`#${company}-explorer`}
      aria-label={`Explore ${art.name}: product, scale and my contribution`}
    >
      <span className="banner-grid" aria-hidden="true" />
      <div className="banner-copy">
        <span className="banner-kicker">
          CHAPTER {art.number} / {art.tag}
        </span>
        <strong>{art.name}</strong>
        <span className="banner-line">{art.line}</span>
        <span className="banner-open">
          STEP INSIDE <ArrowDownRight size={17} />
        </span>
      </div>
      <div className="banner-art" aria-hidden="true">
        {company === 'picpay' && (
          <div className="cluster-sculpture">
            {Array.from({ length: 9 }, (_, i) => (
              <div className={`sculpture-cube cube-${i}`} key={i}>
                <i />
                <i />
                <i />
              </div>
            ))}
            <span className="cluster-orbit" />
          </div>
        )}
        {company === 'ifood' && (
          <div className="signal-sculpture">
            {Array.from({ length: 9 }, (_, i) => (
              <i
                key={i}
                style={{
                  width: `${70 + i * 26}px`,
                  height: `${70 + i * 26}px`,
                  animationDelay: `${i * -0.3}s`,
                }}
              />
            ))}
            <svg viewBox="0 0 360 180">
              <path d="M0 90 H78 L98 90 L115 58 L137 130 L158 22 L183 157 L202 66 L222 90 H360" />
            </svg>
          </div>
        )}
        {company === 'kinter' && (
          <div className="agent-sculpture">
            {Array.from({ length: 5 }, (_, i) => (
              <i
                key={i}
                style={{ transform: `rotateY(${i * 36}deg) rotateX(25deg)` }}
              />
            ))}
            <span className="agent-core">IC</span>
            <span className="agent-satellite satellite-one" />
            <span className="agent-satellite satellite-two" />
          </div>
        )}
      </div>
      <span className="banner-bottom" aria-hidden="true">
        PRODUCT / SCALE / CONTRIBUTION<span>↗ {art.number}</span>
      </span>
    </a>
  );
}
