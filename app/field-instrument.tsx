'use client';

import { useId, useState } from 'react';

const instruments = {
  picpay: {
    serial: 'PP—01',
    name: 'Capacity monitor',
    labels: ['Queue', 'Scale', 'Process'],
    notes: [
      'Pending work provides the demand signal.',
      'KEDA connects queue demand to capacity.',
      'Kubernetes workers process the workload.',
    ],
  },
  ifood: {
    serial: 'IF—02',
    name: 'Signal finder',
    labels: ['Observe', 'Detect', 'Recover'],
    notes: [
      'Bring metrics, logs and traces into view.',
      'Connect the signal to the incident.',
      'Use the recovery plan to guide the response.',
    ],
  },
  kinter: {
    serial: 'AK—03',
    name: 'Systems console',
    labels: ['Platform', 'Telemetry', 'Agents'],
    notes: [
      'AWS and EKS, reproducible environments and GitOps delivery.',
      'Infrastructure signals, application monitoring and log retrieval.',
      'Agent orchestration, model routing and tool integrations.',
    ],
  },
};

export default function FieldInstrument({
  company,
  sequence,
}: {
  company: keyof typeof instruments;
  sequence: string[];
}) {
  const [step, setStep] = useState(0);
  const id = useId();
  const instrument = instruments[company];
  return (
    <figure className={`field-instrument instrument-${company}`}>
      <div className="instrument-registration" aria-hidden="true">
        <span>FIG. {instrument.serial}</span>
        <span>ENGINEERING STUDIES</span>
      </div>
      <div className="field-instrument-shell">
        <div className="instrument-faceplate">
          <span>
            <i /> IAGO / FIELD INSTRUMENTS
          </span>
          <span>{instrument.serial}</span>
        </div>
        <div className="instrument-display" data-step={step}>
          <div className="instrument-display-title">
            <span>{instrument.name}</span>
            <span>0{step + 1} / 03</span>
          </div>
          <svg
            className="instrument-diagram"
            fill="currentColor"
            key={step}
            viewBox="0 0 360 220"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id={`${id}-grid`}
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20 0H0V20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth=".5"
                  opacity=".18"
                />
              </pattern>
            </defs>
            <rect width="360" height="220" fill={`url(#${id}-grid)`} />
            {company === 'picpay' && (
              <>
                <path className="instrument-wire" d="M45 158V178H315V158" />
                {Array.from({ length: 3 }, (_, column) => (
                  <g key={column}>
                    {Array.from({ length: 5 }, (_, row) => (
                      <rect
                        key={row}
                        className="instrument-cell"
                        x={42 + column * 112}
                        y={135 - row * 23}
                        width="52"
                        height="17"
                        rx="1"
                        opacity={
                          row < [2, 4, 5][step] - (column === 1 ? 1 : 0)
                            ? 1
                            : 0.13
                        }
                        style={{
                          animationDelay: `${(column * 5 + row) * 45}ms`,
                        }}
                      />
                    ))}
                    <text x={68 + column * 112} y="202" textAnchor="middle">
                      {['WORK', 'SCALE', 'WORKERS'][column]}
                    </text>
                  </g>
                ))}
                <path
                  className="instrument-trace"
                  pathLength="1"
                  d="M18 158H103L121 118H218L239 66H342"
                />
              </>
            )}
            {company === 'ifood' && (
              <>
                <path
                  className="instrument-ghost"
                  d="M10 116L24 84L40 145L56 72L71 108L89 91L102 142L121 68L137 110L153 80L165 132L180 94L196 122L211 66L228 126L244 82L258 113L275 78L292 141L311 88L328 116H350"
                />
                <path
                  className="instrument-trace"
                  pathLength="1"
                  d={
                    step === 0
                      ? 'M10 110H52L65 99L76 124L89 95L105 112H130L145 83L157 138L174 64L192 159L210 76L225 112H252L268 98L282 122L298 108H350'
                      : step === 1
                        ? 'M10 110H116L133 110L150 65L170 163L190 35L211 171L232 86L248 110H350'
                        : 'M10 110H65L88 101L110 116L134 105L158 113L181 108H350'
                  }
                />
                <line
                  className="instrument-cursor"
                  x1={step === 2 ? 275 : 190}
                  x2={step === 2 ? 275 : 190}
                  y1="20"
                  y2="183"
                />
                <text x="12" y="207">
                  METRICS / LOGS / TRACES
                </text>
                <text x="348" y="207" textAnchor="end">
                  {['SCAN', 'FOCUS', 'RECOVER'][step]}
                </text>
              </>
            )}
            {company === 'kinter' && (
              <>
                <path
                  className="instrument-wire"
                  d="M33 43V173H68M292 43H326V173H292"
                />
                <path
                  className="instrument-trace"
                  pathLength="1"
                  d="M33 173V43H68M292 43H326V173H292"
                />
                {[
                  'AWS / EKS / GITOPS',
                  'METRICS / LOGS / TRACES',
                  'AGENTS / MODELS / MCP',
                ].map((label, index) => (
                  <g key={label}>
                    <rect
                      x="68"
                      y={21 + index * 65}
                      width="224"
                      height="44"
                      rx="2"
                      fill={
                        step === index
                          ? 'currentColor'
                          : 'var(--instrument-paper)'
                      }
                      stroke="currentColor"
                    />
                    <circle
                      cx="33"
                      cy={43 + index * 65}
                      r={step === index ? 5 : 3}
                    />
                    <text
                      x="180"
                      y={47 + index * 65}
                      textAnchor="middle"
                      fill={
                        step === index
                          ? 'var(--instrument-paper)'
                          : 'currentColor'
                      }
                    >
                      {label}
                    </text>
                  </g>
                ))}
                <text x="180" y="214" textAnchor="middle">
                  {
                    [
                      'PROVISION / DEPLOY / OPERATE',
                      'COLLECT / QUERY / INVESTIGATE',
                      'ORCHESTRATE / ROUTE / INTEGRATE',
                    ][step]
                  }
                </text>
              </>
            )}
          </svg>
          <div
            className="instrument-readout"
            aria-live="polite"
            id={`${id}-readout`}
          >
            <span>↳</span> {sequence[step]}
          </div>
        </div>
        <fieldset
          className="instrument-controls"
          aria-label={`${instrument.name} sequence`}
        >
          {instrument.labels.map((label, index) => (
            <button
              type="button"
              key={label}
              aria-pressed={step === index}
              aria-controls={`${id}-readout`}
              onClick={() => setStep(index)}
            >
              <span>0{index + 1}</span>
              {label}
              <i aria-hidden="true" />
            </button>
          ))}
        </fieldset>
        <div className="instrument-base" aria-hidden="true">
          <span>SELECT A STAGE ↑</span>
          <span className="instrument-vents">||||||||||||</span>
        </div>
      </div>
      <figcaption>
        <span>ILLUSTRATIVE SEQUENCE</span>
        <p>{instrument.notes[step]}</p>
      </figcaption>
    </figure>
  );
}
